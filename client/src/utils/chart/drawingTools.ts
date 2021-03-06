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

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  parameters: DrawingParameters,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) => {
  const r1sq = (x1 - parameters.xc) ** 2 + (y1 - parameters.yc) ** 2;
  const r2sq = (x2 - parameters.xc) ** 2 + (y2 - parameters.yc) ** 2;
  const r2 = parameters.r * parameters.r;

  // Both points are below the horizon
  if (r1sq > r2 && r2sq > r2) {
    return;
  }

  let x1p = x1, x2p = x2, y1p = y1, y2p = y2;
  if (r1sq > r2 || r2sq > r2) {
    let R1dotR2 = (x1 - parameters.xc) * (x2 - parameters.xc) + (y1 - parameters.yc) * (y2 - parameters.yc);
    let dR1R2sq = (x1 - x2) ** 2 + (y1 - y2) ** 2;
    let q = r1sq - R1dotR2;
    let s;

    if (r1sq <= r2) {
      s = (q + Math.sqrt(q * q + dR1R2sq * (r2 - r1sq))) / dR1R2sq;
      x2p = x1 + s * (x2 - x1);
      y2p = y1 + s * (y2 - y1);
    } else {
      s = (q - Math.sqrt(q * q + dR1R2sq * (r2 - r1sq))) / dR1R2sq;
      x1p = x1 + s * (x2 - x1);
      y1p = y1 + s * (y2 - y1);
    }
  }

  ctx.beginPath();
  ctx.moveTo(x1p, y1p);
  ctx.lineTo(x2p, y2p);
  ctx.stroke();
}

export const drawLineArray = (
  ctx: CanvasRenderingContext2D,
  parameters: DrawingParameters,
  cosLat: number,
  sinLat: number,
  LST: number,
  azimuthOffset: number,
  line: Array<{ ra: number, dec: number }>,
) => {
  let x1, y1, x2, y2;
  let raDec = { ra: line[0].ra, dec: line[0].dec };
  let coord = raDecToCoordinates(raDec, LST, cosLat, sinLat, azimuthOffset, parameters);
  x2 = coord.x; y2 = coord.y;

  for (let i = 1; i < line.length; i++) {
    x1 = x2; y1 = y2;
    raDec = { ra: line[i].ra, dec: line[i].dec };
    coord = raDecToCoordinates(raDec, LST, cosLat, sinLat, azimuthOffset, parameters);
    x2 = coord.x; y2 = coord.y;

    if (x1 > -998 && x2 > -998) {
      drawLine(ctx, parameters, x1, y1, x2, y2);
    }
  }
}

export const raDecToCoordinates = (
  raDec: { ra: number, dec: number },
  LST: number,
  cosLat: number,
  sinLat: number,
  azimuthOffset: number,
  parameters: DrawingParameters,
) => {
  // Hour angle
  let HA = (LST - raDec.ra);

  let cosHA = Math.cos(HA), sinHA = Math.sin(HA);
  let cosDec = Math.cos(raDec.dec), sinDec = Math.sin(raDec.dec);
  let alt = sinDec * sinLat + cosLat * cosDec * cosHA;
  alt = Math.asin(alt);
  let cosAlt = Math.cos(alt);
  let sinA = cosDec * sinHA / cosAlt;
  let cosA = (cosDec * cosHA * sinLat - sinDec * cosLat) / cosAlt;

  // Rotate the chart depending on the azimuth offset
  let rotation = azimuthOffset - 360 * Math.floor(azimuthOffset / 360);
  rotation = azimuthOffset * Math.PI / 180;

  const cosRotation = Math.cos(rotation);
  const sinRotation = Math.sin(rotation);

  let sA = sinA * cosRotation - cosA * sinRotation;
  let cA = cosA * cosRotation + sinA * sinRotation;

  // The object is at the zenith or nadir
  if (Math.abs(cosAlt) < 1e-10) {
    sA = 0; cA = 1;
  }

  // TODO: Correct for atmospheric refraction

  let x, y;
  if (alt >= 0) {
    // Stereographic projection
    let rc = parameters.r * Math.tan(.5 * ((Math.PI / 2) - alt));
    x = parameters.xc + rc * sA;
    y = parameters.yc + rc * cA;
  } else {
    x = -999;
    y = -999;
  }

  return { x, y };
}

export const geocentricToTopocentric = (
  rGeo: number,
  raDec: { ra: number, dec: number },
  LST: number,
  cosLat: number,
  sinLat: number,
) => {
  // Geocentric Cartesian coordinates of the object
  let x = rGeo * Math.cos(raDec.ra) * Math.cos(raDec.dec);
  let y = rGeo * Math.sin(raDec.ra) * Math.cos(raDec.dec);
  let z = rGeo * Math.sin(raDec.dec);

  // Geometric Cartesian coordinates of the location
  let a = 6378.1366; // Earth's equatorial radius in km
  let f1_f2 = 0.9933056020041341;
  let aC = a / Math.sqrt(cosLat * cosLat + f1_f2 * sinLat * sinLat);
  let aS = f1_f2 * aC;
  let xloc = aC * cosLat * Math.cos(LST);
  let yloc = aC * cosLat * Math.sin(LST);
  let zloc = aS * sinLat;

  // Topocentric Cartesian coordinates of the object
  let xtopo = x - xloc;
  let ytopo = y - yloc;
  let ztopo = z - zloc;

  // Topocentric Distance, Ra and Dec
  let rTopo = Math.sqrt(xtopo * xtopo + ytopo * ytopo + ztopo * ztopo);
  let raTopo = Math.atan2(ytopo, xtopo);
  let decTopo = Math.asin(ztopo / rTopo);

  return { rTopo, raTopo, decTopo };
}
