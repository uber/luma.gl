// Imports tests for all modules that depend on webgl

import '@luma.gl/debug';

// Cherry-pick webgl-dependent core directories
import './modules/core/webgl1';
import './modules/core/webgl-utils';
import './modules/core/webgl-context';
import './modules/core/webgl';
import './modules/core/core';

// GPGPU is a set of shadertool modules, no WebGL dependencies
import './modules/gpgpu';
