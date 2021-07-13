import { DrawingParameters } from "../contracts";
import { drawCircle } from "../drawingTools";

const ecliptic = (
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number,
  latitude: number,
  azimuthOffset: number,
) => {
  const ra = -.5 * Math.PI;
  const dec = 1.1617037164980;
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

  drawCircle(ctx, parameters, 2.46, lat, pole, azimuthOffset, 'brown', [10, 15]);
}

export default ecliptic;
