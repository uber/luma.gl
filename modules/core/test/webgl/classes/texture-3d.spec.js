import test from 'tape-catch';
import {Texture3D} from 'luma.gl';

import {fixture} from 'test/setup';

test('WebGL#Texture3D construct/delete', t => {
  const gl = fixture.gl2;

  if (!gl) {
    t.comment('WebGL2 not available, skipping tests');
    t.end();
    return;
  }

  t.throws(() => new Texture3D(), /.*Requires WebGL2.*/, 'Texture3D throws on missing gl context');

  let texture = new Texture3D(gl);
  t.ok(texture instanceof Texture3D, 'Texture3D construction successful');
  texture.delete();

  gl.getError(); // Reset error

  texture = new Texture3D(gl, {
    width: 4,
    height: 4,
    depth: 4,
    pixels: new Uint8Array(4 * 4 * 4),
    format: gl.RED,
    dataFormat: gl.R8
  });

  t.ok(gl.getError() === gl.NO_ERROR, 'Texture3D construction produces no errors');

  texture.delete();
  t.ok(!gl.isTexture(texture.handle), `Texture GL object was deleted`);
  t.ok(texture instanceof Texture3D, 'Texture3D delete successful');

  texture.delete();
  t.ok(texture instanceof Texture3D, 'Texture3D repeated delete successful');

  t.end();
});
