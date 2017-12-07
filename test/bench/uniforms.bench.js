// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {createGLContext, Program} from 'luma.gl';
const gl = createGLContext();

const VS = `
uniform vec3 positions;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(positions, 1.0);
}
`;

const FS = `
void main(void) {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

const program = new Program(gl, {vs: VS, fs: FS});

const projectionMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const projectionMatrixTyped = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
const positions = [0, 0, 1];
const positionsTyped = new Float32Array([0, 0, 1]);

export default function uniformsBench(suite) {
  return suite

    .group('SET UNIFORMS')

    .add('Set vec3 uniform from Float32Array', () => {
      program.setUniforms({positions: positionsTyped});
    })
    .add('Set vec3 uniform from cloned Float32Array', () => {
      program.setUniforms({positions: new Float32Array(positionsTyped)});
    })
    .add('Set vec3 uniform from array', () => {
      program.setUniforms({positions});
    })
    .add('Set vec3 uniform from new Float32Array', () => {
      program.setUniforms({positions: new Float32Array(positions)});
    })

    .add('Set mat4 uniform from Float32Array', () => {
      program.setUniforms({uPMatrix: projectionMatrixTyped});
    })
    .add('Set mat4 uniform from cloned Float32Array', () => {
      program.setUniforms({uPMatrix: new Float32Array(projectionMatrixTyped)});
    })
    .add('Set mat4 uniform from array', () => {
      program.setUniforms({uPMatrix: projectionMatrix});
    })
    .add('Set mat4 uniform from new Float32Array', () => {
      program.setUniforms({uPMatrix: new Float32Array(projectionMatrix)});
    })
    ;
}
