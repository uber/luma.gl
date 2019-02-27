import {AnimationLoop, ClipSpace} from 'luma.gl';

const INFO_HTML = `
<p>
<code>Mandelbrot</code> set zoom implemented as a GLSL fragment shader.
<p>
Uses a luma.gl <code>ClipSpace</code> Model to set up a screen spaced model
in which the <code>fragment shader</code> can render.
`;

// CONTEXT 1 - 32 bit mandelbrot

const MANDELBROT_FRAGMENT_SHADER = `\
#define SHADER_NAME mandelbrot32

precision highp float;

// Based on a renderman shader by Michael Rivero
const int maxIterations = 1;
varying vec2 coordinate;

void main (void)
{
  vec2 pos = coordinate;
  float real = pos.x;
  float imag = pos.y;
  float Creal = real;
  float Cimag = imag;

  int divergeIteration = 0;
  for (int i = 0; i < 100; i++)
  {
    // z = z^2 + c
    float tempreal = real;
    float tempimag = imag;
    real = (tempreal * tempreal) - (tempimag * tempimag);
    imag = 2. * tempreal * tempimag;
    real += Creal;
    imag += Cimag;
    float r2 = (real * real) + (imag * imag);
    if (divergeIteration == 0 && r2 >= 4.) {
      divergeIteration = i;
    }
  }
  // Base the color on the number of iterations
  vec4 color;
  if (divergeIteration < 9) {
    color = vec4 (0., 0., 0., 1.0); // black
  }
  else
  {
    float tmpval = fract((float(divergeIteration) / 100.));
    color = vec4 (tmpval, 0, tmpval, 1.0);
    // color = vec4 (coordinate.r, coordinate.g, 0., 1.0);
  }
  gl_FragColor = color;
}
`;

const ZOOM_THRESHOLD = 1e5;
const ZOOM_CENTER_X = -0.0150086889504513;
const ZOOM_CENTER_Y = 0.78186693904085048;

const BASE_CORNERS = [
  [-2.2, -1.2],
  [0.7, -1.2],
  [-2.2, 1.2],
  [0.7, 1.2]
];

let centerOffsetX = 0;
let centerOffsetY = 0;
let zoom = 1;

// Calculate new zoomed extents
function getZoomedCorners(zoomFactor = 1.01) {
  zoom *= zoomFactor;
  if (zoom > ZOOM_THRESHOLD) {
    zoom = 1;
  }

  const corners = [];
  for (const baseCorner of BASE_CORNERS) {
    corners.push(baseCorner[0] / zoom + centerOffsetX, baseCorner[1] / zoom + centerOffsetY);
  }

  if (centerOffsetX !== ZOOM_CENTER_X) {
    centerOffsetX += (ZOOM_CENTER_X - centerOffsetX) / 20;
  }
  if (centerOffsetY !== ZOOM_CENTER_Y) {
    centerOffsetY += (ZOOM_CENTER_Y - centerOffsetY) / 20;
  }

  return corners;
}

const animationLoop = new AnimationLoop({
  onInitialize: ({gl, _animationLoop}) => ({
    clipSpace: new ClipSpace(gl, {fs: MANDELBROT_FRAGMENT_SHADER}),
    timerElement: new TimerElement(_animationLoop)
  }),

  onRender: ({gl, canvas, tick, clipSpace, timerElement}) => {
    timerElement.update();
    gl.viewport(0, 0, Math.max(canvas.width, canvas.height), Math.max(canvas.width, canvas.height));

    // Feed in new extents every draw
    const corners = getZoomedCorners();
    clipSpace.draw({
      attributes: {
        aCoordinate: {value: new Float32Array(corners), size: 2}
      }
    });
  }
});

class TimerElement {
  constructor(timer, framesToUpdate = 60) {
    this.timer = timer;
    this.timerElement = document.createElement('div');
    this.timerElement.innerHTML = `
    <div>
      CPU Time: <span id="cpu-time">0<span>
    </div>
    <div>
      GPU Time: <span id="gpu-time">0<span>
    </div>
    `;
    this.timerElement.style.position = 'absolute';
    this.timerElement.style.top = '20px';
    this.timerElement.style.left = '20px';
    this.timerElement.style.backgroundColor = 'white';
    this.timerElement.style.padding = '0.5em';

    document.body.appendChild(this.timerElement);
    this.cpuElement = document.getElementById('cpu-time');
    this.gpuElement = document.getElementById('gpu-time');
    this.cpuTime = 0;
    this.gpuTime = 0;
    this.frameCount = 0;
    this.framesToUpdate = framesToUpdate;
  }

  update() {
    this.cpuTime += this.timer.cpuTime;
    this.gpuTime += this.timer.gpuTime;
    ++this.frameCount;

    if (this.frameCount === this.framesToUpdate) {
      this.cpuElement.innerText = (this.cpuTime / this.frameCount).toFixed(2) + "ms";
      this.gpuElement.innerText = (this.gpuTime / this.frameCount).toFixed(2) + "ms";
      this.cpuTime = 0;
      this.gpuTime = 0;
      this.frameCount = 0;
    }
  }
}

animationLoop.getInfo = () => INFO_HTML;

export default animationLoop;

/* global window */
if (typeof window !== 'undefined' && !window.website) {
  animationLoop.start();
}
