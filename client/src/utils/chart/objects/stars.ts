import { degreesToRadians } from "../../math";
import { raDecToCoordinates } from "../drawingTools";

const stars = (
  stars: Array<any>,
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number,
  lat: number,
  azimuthOffset: number,
  LST: number,
) => {
  const n = stars.length;
  const cosLat = Math.cos(degreesToRadians(lat)), sinLat = Math.sin(degreesToRadians(lat));
  const s1 = 1, s2 = 5;
  const a = (s1 - s2) / 6.5;
  const b = s1 - 5 * a;
  const parameters = {
    length,
    width,
    xc: .5 * width,
    yc: .5 * length,
    r: .47 * Math.max(length, width),
    rotation: azimuthOffset,
  };

  ctx.fillStyle = '#000';

  for (let i = 0; i < n; i++) {
    const raDec = { ra: stars[i].ra, dec: stars[i].dec };

    let coord = raDecToCoordinates(raDec, LST, cosLat, sinLat, azimuthOffset, parameters);

    if (coord.x > -998) {
      let s = a * stars[i].mag + b;
      s = Math.max(s, 1);

      ctx.beginPath();
      ctx.arc(coord.x, coord.y, s, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export default stars;
