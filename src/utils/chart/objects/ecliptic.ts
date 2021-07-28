import { epsA } from "../../precession";
import { DrawingParameters } from "../contracts";
import { drawCircle } from "../drawingTools";

const ecliptic = (
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number,
  latitude: number,
  azimuthOffset: number,
  TD: number,
  LST: number,
) => {
  const ra = -0.5 * Math.PI;
  let dec;

  if (Math.abs(TD) < 1) {
    dec = 1.16170371649804;
  } else {
    dec = 0.5 * Math.PI - epsA(TD);
  }

  const pole = { ra, dec };
  const lat = latitude * (Math.PI / 180);
  const parameters: DrawingParameters = {
    length,
    width,
    xc: .5 * width,
    yc: .5 * length,
    r: .47 * Math.max(length, width),
    rotation: azimuthOffset,
  }

  drawCircle(ctx, parameters, LST, lat, pole, azimuthOffset, 'brown', [10, 15]);
}

export default ecliptic;
