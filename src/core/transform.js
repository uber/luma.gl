import GL from '../constants';
import Model from './model';
import Buffer from '../webgl/buffer';
import TransformFeedback from '../webgl/transform-feedback';
import {isWebGL2, assertWebGL2Context, getShaderVersion} from '../webgl-utils';
import assert from '../utils/assert';
import {log} from '../utils';

const FS100 = 'void main() {}';
const FS300 = `#version 300 es\n${FS100}`;

export default class Transform {

  static isSupported(gl) {
    // For now WebGL2 only
    return isWebGL2(gl);
  }

  constructor(gl, opts = {}) {
    assertWebGL2Context(gl);

    this.gl = gl;
    this.model = null;
    this._swapBuffers = false;
    this.currentIndex = 0;
    this.sourceBuffers = new Array(2);
    this.feedbackBuffers = new Array(2);
    this.transformFeedbacks = new Array(2);
    this._buffersCreated = {};
    this._swapBuffersDirty = true;

    this._initialize(opts);
    Object.seal(this);
  }

  // Delete owned resources.
  delete() {
    Object.values(this._buffersCreated).map(buffer => buffer.delete());
    this.model.delete();
  }

  get elementCount() {
    return this.model.getVertexCount();
  }

  // Return Buffer object for given varying name.
  getBuffer(varyingName = null) {
    assert(varyingName && this.feedbackBuffers[this.currentIndex][varyingName]);
    return this.feedbackBuffers[this.currentIndex][varyingName];
  }

  // Run one transform feedback loop.
  run({uniforms = {}, unbindModels = []} = {}) {
    this.model.setAttributes(this.sourceBuffers[this.currentIndex]);
    this.model.transform({
      transformFeedback: this.transformFeedbacks[this.currentIndex],
      parameters: {[GL.RASTERIZER_DISCARD]: true},
      uniforms,
      unbindModels
    });
  }

  // Swap source and destination buffers.
  swapBuffers() {
    assert(this._swapBuffers);
    const nextIndex = (this.currentIndex + 1) % 2;
    // Setup swapbuffers first time swapBuffers are called.
    if (this._swapBuffersDirty) {
      this._setupSwapBuffers();
    }
    this.currentIndex = nextIndex;
  }

  // Update some or all buffer bindings.
  update({sourceBuffers = null, feedbackBuffers = null, elementCount = this.elementCount}) {
    if (!sourceBuffers && !feedbackBuffers) {
      log.warn('Transform : no buffers updated')();
      return this;
    }

    this.model.setVertexCount(elementCount);

    for (const bufferName in feedbackBuffers) {
      assert(feedbackBuffers[bufferName] instanceof Buffer);
    }

    const {currentIndex} = this;
    Object.assign(this.sourceBuffers[currentIndex], sourceBuffers);
    Object.assign(this.feedbackBuffers[currentIndex], feedbackBuffers);
    this._createFeedbackBuffers({feedbackBuffers});
    this.transformFeedbacks[currentIndex].setBuffers(this.feedbackBuffers[currentIndex]);

    // Buffer have changed, need to re-setup swap buffers.
    this._swapBuffersDirty = true;
    return this;
  }

  // Private

  _initialize({
    // Program parameters
    id = 'transform',
    vs,
    varyings,
    drawMode = GL.POINTS,
    elementCount,

    // buffers
    sourceBuffers,
    feedbackBuffers = null,
    feedbackMap = null,

    // deprecated
    destinationBuffers = null,
    sourceDestinationMap = null
  }) {
    if (destinationBuffers) {
      log.deprecated('destinationBuffers', 'feedbackBuffers')();
      feedbackBuffers = feedbackBuffers || destinationBuffers;
    }
    if (sourceDestinationMap) {
      log.deprecated('sourceDestinationMap', 'feedbackMap')();
      feedbackMap = feedbackMap || sourceDestinationMap;
    }

    assert(sourceBuffers && vs && elementCount >= 0);
    // If feedbackBuffers are not provided, sourceDestinationMap must be provided
    // to create destinaitonBuffers with layout of corresponding source buffer.
    assert(feedbackBuffers || feedbackMap, ' Transform needs feedbackBuffers or feedbackMap');
    for (const bufferName in feedbackBuffers || {}) {
      assert(feedbackBuffers[bufferName] instanceof Buffer);
    }

    // If varyings are not provided feedbackMap must be provided to deduce varyings
    assert(Array.isArray(varyings) || feedbackMap);
    let varyingsArray = varyings;
    if (!Array.isArray(varyings)) {
      varyingsArray = Object.values(feedbackMap);
    }

    this.feedbackMap = feedbackMap;
    this._swapBuffers = this._canSwapBuffers({feedbackMap, sourceBuffers});

    this._setupBuffers({sourceBuffers, feedbackBuffers});
    this._buildModel({id, vs, varyings: varyingsArray, drawMode, elementCount});
  }

  // setup source and destination buffers
  _setupBuffers({sourceBuffers = null, feedbackBuffers = null}) {
    this.sourceBuffers[0] = Object.assign({}, sourceBuffers);
    this.feedbackBuffers[0] = Object.assign({}, feedbackBuffers);
    this._createFeedbackBuffers({feedbackBuffers});
    this.sourceBuffers[1] = {};
    this.feedbackBuffers[1] = {};
  }

  // auto create any feedback buffers
  _createFeedbackBuffers({feedbackBuffers}) {
    if (!this.feedbackMap) {
      // feedbackMap required to auto create buffers.
      return;
    }
    const current = this.currentIndex;
    for (const sourceBufferName in this.feedbackMap) {
      const feedbackBufferName = this.feedbackMap[sourceBufferName];
      if (!feedbackBuffers || !feedbackBuffers[feedbackBufferName]) {
        // Create new buffer with same layout and settings as source buffer
        const sourceBuffer = this.sourceBuffers[current][sourceBufferName];
        const {bytes, type, usage, layout} = sourceBuffer;
        const buffer = new Buffer(this.gl, {bytes, type, usage, layout});

        if (this._buffersCreated[feedbackBufferName]) {
          this._buffersCreated[feedbackBufferName].delete();
          this._buffersCreated[feedbackBufferName] = buffer;
        }
        this.feedbackBuffers[current][feedbackBufferName] = buffer;
      }
    }
  }

  // setup buffers for swapping.
  _setupSwapBuffers() {
    if (!this.feedbackMap) {
      // feedbackMap required set up swap buffers.
      return;
    }
    const current = this.currentIndex;
    const next = (current + 1) % 2;

    for (const sourceBufferName in this.feedbackMap) {
      const feedbackBufferName = this.feedbackMap[sourceBufferName];

      this.sourceBuffers[next][sourceBufferName] =
        this.feedbackBuffers[current][feedbackBufferName];
      this.feedbackBuffers[next][feedbackBufferName] =
        this.sourceBuffers[current][sourceBufferName];

      // make sure the new destination buffer is a Buffer object
      assert(this.feedbackBuffers[next][feedbackBufferName] instanceof Buffer);
    }

    // When triggered by `update()` TranformFeedback objects are already set up,
    // if so update buffers
    if (this.transformFeedbacks[next]) {
      this.transformFeedbacks[next].setBuffers(this.feedbackBuffers[next]);
    }
    this._swapBuffersDirty = false;
  }

  // build Model and TransformFeedback objects
  _buildModel({id, vs, varyings, drawMode, elementCount}) {
    // use a minimal fragment shader with matching version of vertex shader.
    const fs = getShaderVersion(vs) === 300 ? FS300 : FS100;

    this.model = new Model(this.gl, {
      id,
      vs,
      fs,
      varyings,
      drawMode,
      vertexCount: elementCount
    });

    this.transformFeedbacks[0] = new TransformFeedback(this.gl, {
      program: this.model.program,
      buffers: this.feedbackBuffers[0]
    });

    if (this._swapBuffers) {
      this.transformFeedbacks[1] = new TransformFeedback(this.gl, {
        program: this.model.program,
        buffers: this.feedbackBuffers[1]
      });
    }
  }

  // Returns true if buffers can be swappable, false otherwise.
  _canSwapBuffers({feedbackMap, sourceBuffers}) {
    if (!feedbackMap) {
      return false;
    }
    const sourceBufferNames = Object.keys(feedbackMap);
    if (sourceBufferNames.some(name => !(sourceBuffers[name] instanceof Buffer))) {
      return false;
    }
    return true;
  }
}
