import { DrawingParameters } from "./contracts";

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  parameters: DrawingParameters,
  LST: number,
  lat: number,
  pole: { ra: number, dec: number },
  azimuthOffset: number,
  color: string = 'black',
  dash: Array<number> = [],
) => {
  const cosLat = Math.cos(lat), sinLat = Math.sin(lat);
  const halfPi = Math.PI / 2;

  // Calculate P = (xp, yp, zp) of the point w.r.t the horizontal coordinate system
  let xp = 0, yp = 0, zp = 0, sinA, cosA;
  let draw = true;

  if (Math.abs(pole.dec - halfPi) < 1e-5) {
    // This point is the celestial north pole
    xp = -cosLat; yp = 0; zp = sinLat;
  } else {
    let HA = LST - pole.ra;
    let sinHA = Math.sin(HA), cosHA = Math.cos(HA);
    let sinDec = Math.sin(pole.dec), cosDec = Math.cos(pole.dec);
    let sinAlt = sinLat * sinDec + cosLat * cosDec * cosHA;
    let cosAlt;

    if (Math.abs(Math.abs(sinAlt) - 1) < 1e-5) {
      // The point is at the zenith or nadir (circle is horizon)
      draw = false;
    } else {
      cosAlt = Math.sqrt(1 - sinAlt * sinAlt);
      sinA = cosDec * sinHA / cosAlt;
      cosA = (cosDec * cosHA * sinLat - sinDec * cosLat) / cosAlt;
      xp = cosAlt * cosA; yp = cosAlt * sinA; zp = sinAlt;
    }
  }

  if (draw) {
    /**
     * The cross product V = Z x P [Z = (0,0,1)] is perpendicular to both Z and P. So V is on the
     * circle and horizon. Thus, calculate the unit vector in the V direction.
     */
    let norm = Math.sqrt(xp * xp + yp * yp);
    let Vx = -yp / norm, Vy = xp / norm;

    /**
     * Calculate W = P x V. This point is also on the circle (since it's perpendicular to P) and
     * is on the meridian (since it's perpendicular to V, which is on the horizon) and is above
     * the horizon (since Z dot W is proportional to 1-(P dot Z)^2 > 0). Since
     * Wz = xp*Vy - yp*Vx = norm > 0, W is always above the horizon.
     */
    let Wx = -zp * Vy, Wy = zp * Vx, Wz = norm;

    /**
     * The points on the circle are given by C = cos(theta) V + sin(theta) W. The portion above
     * the horizon is for theta in (0,pi).
     */

    // Draw the circle
    let n = 50;
    let dTheta = Math.PI / n;

    ctx.beginPath();

    ctx.setLineDash(dash);

    // Point V
    sinA = Vy; cosA = Vx;

    // Rotate the chart depending on the azimuth offset
    let rotation = azimuthOffset - 360 * Math.floor(azimuthOffset / 360);
    rotation = azimuthOffset * Math.PI / 180;

    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);

    let sA = sinA * cosRotation - cosA * sinRotation;
    let cA = cosA * cosRotation + sinA * sinRotation;

    let x = parameters.xc + parameters.r * sA, y = parameters.yc + parameters.r * cA;

    ctx.moveTo(x, y);

    for (let i = 0; i < n; i++) {
      let theta = i * dTheta;
      let cosTheta = Math.cos(theta), sinTheta = Math.sin(theta);
      let Cx = cosTheta * Vx + sinTheta * Wx;
      let Cy = cosTheta * Vy + sinTheta * Wy;
      let Cz = sinTheta * Wz;
      let pom = Math.sqrt(Cx * Cx + Cy * Cy);

      if (pom < 1e-5) {
        // The point is at the zenith
        ctx.lineTo(parameters.xc, parameters.yc);
      } else {
        cosA = Cx / pom; sinA = Cy / pom;

        // Rotate the chart by the azimuth offset
        sA = sinA * cosRotation - cosA * sinRotation;
        cA = cosA * cosRotation + sinA * sinRotation;
        let alt = Math.asin(Cz);
        let rc = parameters.r * Math.tan(0.5 * ((Math.PI / 2) - alt));
        let x = parameters.xc + rc * sA;
        let y = parameters.yc + rc * cA;
        ctx.lineTo(x, y);
      }
    }

    // Point -V
    sinA = -Vy; cosA = -Vx;

    // Rotate the chart by the azimuth offset
    sA = sinA * cosRotation - cosA * sinRotation;
    cA = cosA * cosRotation + sinA * sinRotation;
    x = parameters.xc + parameters.r * sA; y = parameters.yc + parameters.r * cA;

    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

