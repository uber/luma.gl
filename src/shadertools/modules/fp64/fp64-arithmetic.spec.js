// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// Actual tests for different arithmetic functions

/* eslint-disable camelcase, prefer-template, max-len */
/* global window, document, */
import test from 'tape-catch';
import {testcase} from './fp64-test-utils';

test('fp64#sum_fp64', t => {
  testcase(gl, {glslFunc: 'sum_fp64', binary: true, op: (a, b) => a + b, t});
});

test('fp64#sub_fp64', t => {
  testcase(gl, {glslFunc: 'sub_fp64', binary: true, op: (a, b) => a - b, t});
});

test('fp64#mul_fp64', t => {
  testcase(gl, {glslFunc: 'mul_fp64', binary: true, op: (a, b) => a * b, limit: 128, t});
});

test('fp64#div_fp64', t => {
  testcase(gl, {glslFunc: 'div_fp64', binary: true, op: (a, b) => a / b, limit: 128, t});
});

test('fp64#sqrt_fp64', t => {
  testcase(gl, {glslFunc: 'sqrt_fp64', op: (a) => Math.sqrt(a), limit: 128, t});
});

/*
addSpan('------------------------', di);
for (let idx0 = 0; idx0 < ITERATIONS; idx0++) {
  testcase({gl, func: test_float_exp, title: 'Float exp test', t});
}

addSpan('------------------------', di);
for (let idx0 = 0; idx0 < ITERATIONS; idx0++) {
  testcase({gl, func: test_float_log, title: 'Float log test', t});
}

addSpan('------------------------', di);
for (let idx0 = 0; idx0 < ITERATIONS; idx0++) {
  testcase({gl, func: test_float_sin, title: 'Float sin test', t});
}

addSpan('------------------------', di);
for (let idx0 = 0; idx0 < ITERATIONS; idx0++) {
  testcase({gl, func: test_float_cos, title: 'Float cos test', t});
}

addSpan('------------------------', di);
for (let idx0 = 0; idx0 < ITERATIONS; idx0++) {
  testcase({gl, func: test_float_tan, title: 'Float tan test', t});
}

addSpan('------------------------', di);
for (let idx0 = 0; idx0 < ITERATIONS; idx0++) {
  testcase({gl, func: test_float_radians, title: 'Float radians test', t});
}
*/
