import {ShaderPass} from '../../types';

/**
 * Hexagonal Pixelate
 * Renders the image using a pattern of hexagonal tiles. Tile colors
 * are nearest-neighbor sampled from the centers of the tiles.
 * @param centerX The x coordinate of the pattern center.
 * @param centerY The y coordinate of the pattern center.
 * @param scale   The width of an individual tile, in pixels.
 */
export const hexagonalPixelate: ShaderPass;
