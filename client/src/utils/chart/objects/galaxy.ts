import galacticCenter from '../../data/galacticCenter';
import { degreesToRadians } from '../../math';
import { precessedRaDec, precessionMatrix } from '../../precession';
import { drawCircle, drawLineArray } from '../drawingTools';

const galaxy = (
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number,
  lat: number,
  azimuthOffset: number,
  LST: number,
  T: number,
) => {
  const cosLat = Math.cos(degreesToRadians(lat)), sinLat = Math.sin(degreesToRadians(lat));
  const parameters = {
    length,
    width,
    xc: .5 * width,
    yc: .5 * length,
    r: .47 * Math.max(length, width),
    rotation: azimuthOffset,
  };

  ctx.strokeStyle = 'blue';

  // Northern Edge
  drawLineArray(ctx, parameters, cosLat, sinLat, LST, azimuthOffset, galacticCenter[0].line);

  // Southern Edge
  drawLineArray(ctx, parameters, cosLat, sinLat, LST, azimuthOffset, galacticCenter[1].line);

  // Beta Cas
  drawLineArray(ctx, parameters, cosLat, sinLat, LST, azimuthOffset, galacticCenter[2].line);

  // Theta Oph
  drawLineArray(ctx, parameters, cosLat, sinLat, LST, azimuthOffset, galacticCenter[3].line);

  // Lambda Sco
  drawLineArray(ctx, parameters, cosLat, sinLat, LST, azimuthOffset, galacticCenter[4].line);

  // Coalsack
  drawLineArray(ctx, parameters, cosLat, sinLat, LST, azimuthOffset, galacticCenter[5].line);

  // Coordinates of the galactic north pole relative to the equinox of the date
  // J2000: ra = 12h 51m 26.00s, dec = 27deg 7' 42.0"
  const ra0 = 3.366012906575397, dec0 = 0.4734787372451951;
  const p = precessionMatrix(0, T);
  const galacticNorthPole = precessedRaDec(ra0, dec0, p);

  lat = degreesToRadians(lat);

  // Draw Galactic Equator
  drawCircle(ctx, parameters, LST, lat, galacticNorthPole, azimuthOffset, 'magenta', [14, 15]);
};

export default galaxy;