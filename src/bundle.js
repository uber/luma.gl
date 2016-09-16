/* Generate pre-bundled script that can be used in browser without browserify */
import 'babel-polyfill';
import * as LumaGL from './index';
import * as addons from './addons';
import {luma} from './utils';
/* global window */

// Export all LumaGL objects as members of global lumagl variable
if (typeof window !== 'undefined') {
  luma.LumaGL = LumaGL;
  luma.addons = addons;
  LumaGL.addons = addons;
  window.LumaGL = LumaGL;
}
