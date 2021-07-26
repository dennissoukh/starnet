import constellationNames from '../../data/constellationNames';
import { degreesToRadians } from '../../math';
import { DrawingParameters } from '../contracts';
import { raDecToCoordinates } from '../drawingTools';

const names = (
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number,
  latitude: number,
  azimuthOffset: number,
  LST: number,
) => {
  const cosLat = Math.cos(degreesToRadians(latitude)), sinLat = Math.sin(degreesToRadians(latitude));
  const parameters: DrawingParameters = {
    length,
    width,
    xc: .5 * width,
    yc: .5 * length,
    r: .47 * Math.max(length, width),
    rotation: azimuthOffset,
  };

  ctx.font = '12px Switzer-Variable';

  constellationNames.forEach((constellation) => {
    let raDec = { ra: constellation.ra, dec: constellation.dec };
    let coord = raDecToCoordinates(raDec, LST, cosLat, sinLat, azimuthOffset, parameters);

    if (coord.x > -998) {
      let w = ctx.measureText(constellation.abbr).width;
      ctx.fillStyle = '#D9D9E5';
      ctx.fillRect(coord.x, coord.y - 12, w, 12);

      ctx.fillStyle = '#303956';
      ctx.fillText(constellation.abbr, coord.x, coord.y);
    }

    if (constellation.ra2) {
      let raDec = { ra: constellation.ra2, dec: constellation.dec2 };
      let coord = raDecToCoordinates(raDec, LST, cosLat, sinLat, azimuthOffset, parameters);

      if (coord.x > -998) {
        let w = ctx.measureText(constellation.abbr).width;
        ctx.fillStyle = '#D9D9E5';
        ctx.fillRect(coord.x, coord.y - 12, w, 12);

        ctx.fillStyle = '#303956';
        ctx.fillText(constellation.abbr, coord.x, coord.y);
      }
    }
  });
};

export default names;
