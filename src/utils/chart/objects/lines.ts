import { DrawingParameters } from "../contracts";
import { lines as lineData } from '../../data/constellationLines';
import { drawLine, raDecToCoordinates } from "../drawingTools";
import { degreesToRadians } from "../../math";
import starData from "../../data/stars";

const lines = (
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
  }

  ctx.strokeStyle = '#1B9722';
  ctx.setLineDash([]);

  if (!starData) {
    return;
  }

  lineData.forEach((constellation) => {
    constellation.lines.forEach((line) => {
      for (let i = 0; i < line.length - 1; i++) {
        const hip1 = line[i];
        const hip2 = line[i + 1];
        const star1 = starData.find(s => s.hip === hip1);
        const star2 = starData.find(s => s.hip === hip2);

        if (!star1 || !star2) {
          return;
        }

        const raDec1 = { ra: star1.ra, dec: star1.dec };
        const raDec2 = { ra: star2.ra, dec: star2.dec };

        const coord1 = raDecToCoordinates(raDec1, LST, cosLat, sinLat, azimuthOffset, parameters);
        const coord2 = raDecToCoordinates(raDec2, LST, cosLat, sinLat, azimuthOffset, parameters);

        if (coord1.x > -998 && coord2.x > -998) {
          drawLine(ctx, parameters, coord1.x, coord1.y, coord2.x, coord2.y);
        }
      }
    });
  });
}

export default lines;
