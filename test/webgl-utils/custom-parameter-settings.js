import {GL} from 'luma.gl';

// eslint-disable-next-line
export const GL_PARAMETER_SETTINGS_ONE = {
  [GL.BLEND]: true,
  [GL.BLEND_COLOR]: new Float32Array([0.5, 0.5, 0.5, 0]),
  [GL.BLEND_EQUATION_RGB]: GL.FUNC_SUBTRACT,
  [GL.BLEND_EQUATION_ALPHA]: GL.MIN,
  [GL.BLEND_SRC_RGB]: GL.SRC_COLOR,
  [GL.BLEND_DST_RGB]: GL.DST_COLOR,
  [GL.BLEND_SRC_ALPHA]: GL.SRC_ALPHA,
  [GL.BLEND_DST_ALPHA]: GL.DST_ALPHA,
  [GL.COLOR_CLEAR_VALUE]: new Float32Array([0.5, 0.5, 0.5, 0]), // TBD
  [GL.COLOR_WRITEMASK]: [false, false, false, true],
  [GL.CULL_FACE]: true,
  [GL.CULL_FACE_MODE]: GL.FRONT,
  [GL.DEPTH_TEST]: true,
  [GL.DEPTH_CLEAR_VALUE]: 0,
  [GL.DEPTH_FUNC]: GL.NEVER,
  [GL.DEPTH_RANGE]: new Float32Array([0.5, 1]), // TBD
  [GL.DEPTH_WRITEMASK]: false,
  [GL.DITHER]: false,
  [GL.FRONT_FACE]: GL.CW,
  [GL.GENERATE_MIPMAP_HINT]: GL.FASTEST,
  [GL.LINE_WIDTH]: 2,
  [GL.POLYGON_OFFSET_FILL]: true,
  [GL.POLYGON_OFFSET_FACTOR]: 1,
  [GL.POLYGON_OFFSET_UNITS]: 1,
  [GL.SAMPLE_COVERAGE_VALUE]: 0,
  [GL.SAMPLE_COVERAGE_INVERT]: true,
  [GL.SCISSOR_TEST]: true,
  // Note: Dynamic value. If scissor test enabled we expect users to set correct scissor box
  [GL.SCISSOR_BOX]: new Int32Array([0, 0, 100, 100]),
  [GL.STENCIL_TEST]: true,
  [GL.STENCIL_CLEAR_VALUE]: 0.5,
  [GL.STENCIL_WRITEMASK]: 0xCCCCCCCC,
  [GL.STENCIL_BACK_WRITEMASK]: 0xDDDDDDDD,
  [GL.STENCIL_FUNC]: GL.NEVER,
  [GL.STENCIL_REF]: 0.5,
  [GL.STENCIL_VALUE_MASK]: 0xBBBBBBBB,
  [GL.STENCIL_BACK_FUNC]: GL.LEQUAL,
  [GL.STENCIL_BACK_REF]: 0.5,
  [GL.STENCIL_BACK_VALUE_MASK]: 0x11111111,
  [GL.STENCIL_FAIL]: GL.REPLACE,
  [GL.STENCIL_PASS_DEPTH_FAIL]: GL.INCR,
  [GL.STENCIL_PASS_DEPTH_PASS]: GL.DECR,
  [GL.STENCIL_BACK_FAIL]: GL.REPLACE,
  [GL.STENCIL_BACK_PASS_DEPTH_FAIL]: GL.INCR,
  [GL.STENCIL_BACK_PASS_DEPTH_PASS]: GL.DECR,
  // Dynamic value: We use [0, 0, 1024, 1024] as default, but usually this is updated in each frame.
  [GL.VIEWPORT]: new Int32Array([0, 0, 100, 100]),
  // WEBGL1 PIXEL PACK/UNPACK MODES
  [GL.PACK_ALIGNMENT]: 8,
  [GL.UNPACK_ALIGNMENT]: 16,
  [GL.UNPACK_FLIP_Y_WEBGL]: true,
  [GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL]: true,
  [GL.UNPACK_COLORSPACE_CONVERSION_WEBGL]: GL.NONE,

  // WEBGL2 / EXTENSIONS
  // gl1: 'OES_standard_derivatives'
  [GL.FRAGMENT_SHADER_DERIVATIVE_HINT]: GL.FASTEST,
  [GL.RASTERIZER_DISCARD]: true,
  [GL.PACK_ROW_LENGTH]: 2,
  [GL.PACK_SKIP_PIXELS]: 4,
  [GL.PACK_SKIP_ROWS]: 8,
  [GL.UNPACK_ROW_LENGTH]: 16,
  [GL.UNPACK_IMAGE_HEIGHT]: 32,
  [GL.UNPACK_SKIP_PIXELS]: 64,
  [GL.UNPACK_SKIP_ROWS]: 128,
  [GL.UNPACK_SKIP_IMAGES]: 512
};

// eslint-disable-next-line
export const GL_PARAMETER_SETTINGS_TWO = {
  [GL.BLEND]: true,
  [GL.BLEND_COLOR]: new Float32Array([1, 1, 0.5, 0]),
  [GL.BLEND_EQUATION_RGB]: GL.FUNC_REVERSE_SUBTRACT,
  [GL.BLEND_EQUATION_ALPHA]: GL.MAX,
  [GL.BLEND_SRC_RGB]: GL.ONE_MINUS_SRC_COLOR,
  [GL.BLEND_DST_RGB]: GL.ONE_MINUS_DST_COLOR,
  [GL.BLEND_SRC_ALPHA]: GL.ONE_MINUS_SRC_ALPHA,
  [GL.BLEND_DST_ALPHA]: GL.ONE_MINUS_DST_ALPHA,
  [GL.COLOR_CLEAR_VALUE]: new Float32Array([1, 1, 0.5, 0]), // TBD
  [GL.COLOR_WRITEMASK]: [false, false, true, true],
  [GL.CULL_FACE]: false,
  [GL.CULL_FACE_MODE]: GL.FRONT_AND_BACK,
  [GL.DEPTH_TEST]: false,
  [GL.DEPTH_CLEAR_VALUE]: 0.5,
  [GL.DEPTH_FUNC]: GL.ALWAYS,
  [GL.DEPTH_RANGE]: new Float32Array([1, 1]), // TBD
  [GL.DEPTH_WRITEMASK]: true,
  [GL.DITHER]: true,
  [GL.FRONT_FACE]: GL.CCW,
  [GL.GENERATE_MIPMAP_HINT]: GL.NICEST,
  [GL.LINE_WIDTH]: 3,
  [GL.POLYGON_OFFSET_FILL]: false,
  [GL.POLYGON_OFFSET_FACTOR]: 2,
  [GL.POLYGON_OFFSET_UNITS]: 2,
  [GL.SAMPLE_COVERAGE_VALUE]: 0.5,
  [GL.SAMPLE_COVERAGE_INVERT]: false,
  [GL.SCISSOR_TEST]: false,
  // Note: Dynamic value. If scissor test enabled we expect users to set correct scissor box
  [GL.SCISSOR_BOX]: new Int32Array([0, 0, 200, 200]),
  [GL.STENCIL_TEST]: false,
  [GL.STENCIL_CLEAR_VALUE]: 1.0,
  [GL.STENCIL_WRITEMASK]: 0xEEEEEEEE,
  [GL.STENCIL_BACK_WRITEMASK]: 0xAAAAAAAA,
  [GL.STENCIL_FUNC]: GL.LESS,
  [GL.STENCIL_REF]: 1,
  [GL.STENCIL_VALUE_MASK]: 0xEEEEEEEE,
  [GL.STENCIL_BACK_FUNC]: GL.GREATER,
  [GL.STENCIL_BACK_REF]: 1,
  [GL.STENCIL_BACK_VALUE_MASK]: 0x22222222,
  [GL.STENCIL_FAIL]: GL.INCR,
  [GL.STENCIL_PASS_DEPTH_FAIL]: GL.DECR,
  [GL.STENCIL_PASS_DEPTH_PASS]: GL.INCR,
  [GL.STENCIL_BACK_FAIL]: GL.INCR,
  [GL.STENCIL_BACK_PASS_DEPTH_FAIL]: GL.DECR,
  [GL.STENCIL_BACK_PASS_DEPTH_PASS]: GL.INCR,
  // Dynamic value: We use [0, 0, 1024, 1024] as default, but usually this is updated in each frame.
  [GL.VIEWPORT]: new Int32Array([0, 0, 200, 200]),
  // WEBGL1 PIXEL PACK/UNPACK MODES
  [GL.PACK_ALIGNMENT]: 16,
  [GL.UNPACK_ALIGNMENT]: 8,
  [GL.UNPACK_FLIP_Y_WEBGL]: false,
  [GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL]: false,
  [GL.UNPACK_COLORSPACE_CONVERSION_WEBGL]: GL.BROWSER_DEFAULT_WEBGL,

  // WEBGL2 / EXTENSIONS
  // gl1: 'OES_standard_derivatives'
  [GL.FRAGMENT_SHADER_DERIVATIVE_HINT]: GL.NICEST,
  [GL.RASTERIZER_DISCARD]: false,
  [GL.PACK_ROW_LENGTH]: 64,
  [GL.PACK_SKIP_PIXELS]: 128,
  [GL.PACK_SKIP_ROWS]: 512,
  [GL.UNPACK_ROW_LENGTH]: 2,
  [GL.UNPACK_IMAGE_HEIGHT]: 4,
  [GL.UNPACK_SKIP_PIXELS]: 8,
  [GL.UNPACK_SKIP_ROWS]: 16,
  [GL.UNPACK_SKIP_IMAGES]: 32
};

// Note: These settings are same as GL_PARAMETER_SETTINGS_ONE
// keep the entries in sync.
export const GL_PARAMETER_SETTINGS_ONE_ENUM_FUNCTION = {
  blend: true,
  blendColor: new Float32Array([0.5, 0.5, 0.5, 0]),
  blendEquation: [GL.FUNC_SUBTRACT, GL.MIN],
  blendFunc: [GL.SRC_COLOR, GL.DST_COLOR, GL.SRC_ALPHA, GL.DST_ALPHA],
  clearColor: new Float32Array([0.5, 0.5, 0.5, 0]),
  colorMask: [false, false, false, true],
  cull: true,
  cullFace: GL.FRONT,
  depthTest: true,
  clearDepth: 0,
  depthFunc: GL.NEVER,
  depthRange: new Float32Array([0.5, 1]), // TBD
  depthMask: false,
  dither: false,
  frontFace: GL.CW,
  mipmapHint: GL.FASTEST,
  lineWidth: 2,
  polygonOffsetFill: true,
  polygonOffset: [1, 1],
  sampleCoverage: [0, true],
  scissorTest: true,
  // Note: Dynamic value. If scissor test enabled we expect users to set correct scissor box
  scissor: new Int32Array([0, 0, 100, 100]),
  [GL.STENCIL_TEST]: true,
  clearStencil: 0.5,
  stencilMask: [0xCCCCCCCC, 0xDDDDDDDD],
  [GL.STENCIL_FUNC]: GL.NEVER,
  [GL.STENCIL_REF]: 0.5,
  [GL.STENCIL_VALUE_MASK]: 0xBBBBBBBB,
  [GL.STENCIL_BACK_FUNC]: GL.LEQUAL,
  [GL.STENCIL_BACK_REF]: 0.5,
  [GL.STENCIL_BACK_VALUE_MASK]: 0x11111111,
  stencilOp: [GL.REPLACE, GL.INCR, GL.DECR, GL.REPLACE, GL.INCR, GL.DECR],
  // Dynamic value: We use [0, 0, 1024, 1024] as default, but usually this is updated in each frame.
  viewport: new Int32Array([0, 0, 100, 100]),
  // WEBGL1 PIXEL PACK/UNPACK MODES
  [GL.PACK_ALIGNMENT]: 8,
  [GL.UNPACK_ALIGNMENT]: 16,
  [GL.UNPACK_FLIP_Y_WEBGL]: true,
  [GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL]: true,
  [GL.UNPACK_COLORSPACE_CONVERSION_WEBGL]: GL.NONE,

  // WEBGL2 / EXTENSIONS
  // gl1: 'OES_standard_derivatives'
  derivativeHint: GL.FASTEST,
  [GL.RASTERIZER_DISCARD]: true,
  [GL.PACK_ROW_LENGTH]: 2,
  [GL.PACK_SKIP_PIXELS]: 4,
  [GL.PACK_SKIP_ROWS]: 8,
  [GL.UNPACK_ROW_LENGTH]: 16,
  [GL.UNPACK_IMAGE_HEIGHT]: 32,
  [GL.UNPACK_SKIP_PIXELS]: 64,
  [GL.UNPACK_SKIP_ROWS]: 128,
  [GL.UNPACK_SKIP_IMAGES]: 512
};
