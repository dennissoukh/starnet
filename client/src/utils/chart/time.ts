import { AstroTimestamp } from "../../types/common";
import { CalendarDate } from "./contracts";

/**
 * Compute D (number of days from J2000) at midnight local time
 */
export const dMidnight = (yy: number, mm: number, dd: number, timezone: number): number => {
  let dFrac = timezone / 1440;
  let m1 = mm;

  if (m1 <= 2) {
    m1 += 12; yy--;
  }

  let b;

  if (10000 * yy + 100 * m1 + dd <= 15821004) {
    // Julian calendar
    b = -2 + Math.floor((yy + 4716) / 4) - 1179;
  } else {
    // Gregorian calendar
    b = Math.floor(yy / 400) - Math.floor(yy / 100) + Math.floor(yy / 4);
  }

  let D0 = 365 * yy - 679004 + b + Math.floor(30.6001 * (m1 + 1)) + dd - 51544.5;

  return (D0 + dFrac);
}

/**
 * Calendar date and time from D (number of days from J2000)
 * Ported from Astronomy on Personal Computer, p. 15-16
 */
export const calendarTimestamp = (D: number): CalendarDate => {
  let a, b, c, d, e, f;

  // Convert Julian day number to calendar date
  a = Math.floor(D + 2451545.5);

  if (a < 0) {
    return calendarTimestampNegative(D + 2451545);
  }

  if (a < 2299161) {
    // Julian calendar
    b = 0; c = a + 1524;
  } else {
    // Gregorian calendar
    b = Math.floor((a - 1867216.25) / 36524.25);
    c = a + b - Math.floor(0.25 * b) + 1525;
  }

  d = Math.floor((c - 122.1) / 365.25);

  if (d < 0) {
    d++;
  }

  e = 365 * d + Math.floor(0.25 * d);
  f = Math.floor((c - e) / 30.6001);

  if (f < 0) {
    f++;
  }

  let dd = c - e - Math.floor(30.6001 * f);
  let mm = f - 1 - 12 * Math.floor(f / 14 + 1e-5);
  let yy = d - 4715 - Math.floor((7 + mm) / 10 + 1e-5);
  let ddFraction = D + 0.5 - Math.floor(D + 0.5);
  let hour = 24 * ddFraction;
  let h = Math.floor(hour);
  let m = Math.floor(60 * (hour - h));
  let s = (hour - h - m / 60) * 3600;

  return { dd, mm, yy, h, m, s };
}

/**
 * Calendar date and time from Julian date JD with a day number less than zero
 */
export const calendarTimestampNegative = (D: number): CalendarDate => {
  let mjd = -Math.floor(D + 0.5);
  let md = mjd - Math.floor(mjd / 1461);
  let dYear = Math.floor(md / (365 + 1e-10)) + 1;
  let year = -4712 - dYear;
  let mjd0 = dYear * 365 + Math.floor(dYear / 4) + 1;
  let dFromY = mjd0 - mjd;
  let months;

  if (dYear % 4 === 0) {
    months = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
  } else {
    months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  }

  let i, mm = 0, dd = 0;
  for (i = 1; i < 13; i++) {
    if (dFromY <= months[i]) {
      mm = i;
      dd = dFromY - months[i - 1];
      break;
    }
  }

  let dayFraction = 0.5 + (D + mjd);
  let hour = 24 * dayFraction;
  let h = Math.floor(hour);
  let m = Math.floor(60 * (hour - h));
  let s = (hour - h - m / 60) * 3600;

  return { dd, mm, yy: year, h, m, s }
}

/**
 * Compute Delta T in century form (difference between Terrestrial time and UT)
 * See: http://eclipsewise.com/help/deltatpoly2014.html
 */
export const deltaTPolynomial = (T: number): number => {
  let y = T * 100 + 2000;
  let u, u2, u3, u4, u5, u6, u7, DT;

  if (y > 2015) {
    u = y - 2015;
    DT = 67.62 + 0.3645 * u + 0.0039755 * u * u;
  } else if (y > 2005) {
    u = y - 2005;
    DT = 64.69 + 0.2930 * u;
  } else if (y > 1986) {
    u = y - 2000; u2 = u * u; u3 = u2 * u;
    u4 = u2 * u2; u5 = u2 * u3;
    DT = 63.86 + 0.3345 * u - 0.060374 * u2 + 0.0017275 * u3 +
      0.000651814 * u4 + 0.00002373599 * u5;
  } else if (y > 1961) {
    u = y - 1975; u2 = u * u; u3 = u * u2;
    DT = 45.45 + 1.067 * u - u2 / 260 - u3 / 718;
  } else if (y > 1941) {
    u = y - 1950; u2 = u * u; u3 = u * u2;
    DT = 29.07 + 0.407 * u - u2 / 233 + u3 / 2547;
  } else if (y > 1920) {
    u = y - 1920; u2 = u * u; u3 = u2 * u;
    DT = 21.2 + 0.84493 * u - 0.0761 * u2 + 0.0020936 * u3;
  } else if (y > 1900) {
    u = y - 1900; u2 = u * u; u3 = u * u2; u4 = u2 * u2;
    DT = -2.79 + 1.494119 * u - 0.0598939 * u2 + 0.0061966 * u3 - 0.000197 * u4;
  } else if (y > 1860) {
    u = y - 1860;
    u2 = u * u; u3 = u * u2; u4 = u2 * u2; u5 = u2 * u3;
    DT = 7.62 + 0.5737 * u - 0.251754 * u2 +
      0.01680668 * u3 - 0.0004473624 * u4 +
      u5 / 233174;
  } else if (y > 1800) {
    u = y - 1800; u2 = u * u; u3 = u * u2; u4 = u2 * u2;
    u5 = u2 * u3; u6 = u3 * u3; u7 = u3 * u4;
    DT = 13.72 - 0.332447 * u + 0.0068612 * u2 +
      0.0041116 * u3 - 0.00037436 * u4 +
      0.0000121272 * u5 - 0.0000001699 * u6 +
      0.000000000875 * u7;
  } else if (y > 1700) {
    u = y - 1700; u2 = u * u; u3 = u * u2; u4 = u2 * u2;
    DT = 8.83 + 0.1603 * u - 0.0059285 * u2 +
      0.00013336 * u3 - u4 / 1174000;
  } else if (y > 1600) {
    u = y - 1600; u2 = u * u; u3 = u * u2;
    DT = 120 - 0.9808 * u - 0.01532 * u2 + u3 / 7129;
  } else if (y > 500) {
    u = 0.01 * (y - 1000); u2 = u * u; u3 = u * u2; u4 = u2 * u2;
    u5 = u2 * u3; u6 = u3 * u3;
    DT = 1574.2 - 556.01 * u + 71.23472 * u2 +
      0.319781 * u3 - 0.8503463 * u4 -
      0.005050998 * u5 + 0.0083572073 * u6;
  } else if (y > -500) {
    u = 0.01 * y; u2 = u * u; u3 = u * u2; u4 = u2 * u2;
    u5 = u2 * u3; u6 = u3 * u3;
    DT = 10583.6 - 1014.41 * u + 33.78311 * u2 -
      5.952053 * u3 - 0.1798452 * u4 +
      0.022174192 * u5 + 0.0090316521 * u6;
  } else {
    u = 0.01 * (y - 1820);
    DT = -20 + 32 * u * u;
  }

  return (DT * 3.16880878140289e-10);
}

/**
 * Compute Delta T in seconds using the fittling and extrapolation formulae
 * See: http://astro.ukho.gov.uk/nao/lvm/
 */
export const deltaTSplineY = (y: number): number => {
  // Integrated lod (deviation of mean solar day from 86400s) equation
  const integratedLod = (x: number): number => {
    let u = x - 1825;
    return 3.14115e-3 * u * u + 284.8435805251424 * Math.cos(0.4487989505128276 * (0.01 * u + 0.75));
  }

  if (y < -720) {
    const c = 1.007739546148514;
    return integratedLod(y) + c;
  }

  if (y > 2019) {
    const c = -150.263031657016;
    return integratedLod(y) + c;
  }

  // Cubic spline fit
  let y0 = [-720, -100, 400, 1000, 1150, 1300, 1500, 1600, 1650, 1720, 1800, 1810, 1820, 1830, 1840, 1850, 1855, 1860, 1865, 1870, 1875, 1880, 1885, 1890, 1895, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935, 1940, 1945, 1950, 1953, 1956, 1959, 1962, 1965, 1968, 1971, 1974, 1977, 1980, 1983, 1986, 1989, 1992, 1995, 1998, 2001, 2004, 2007, 2010, 2013, 2016];
  let y1 = [-100, 400, 1000, 1150, 1300, 1500, 1600, 1650, 1720, 1800, 1810, 1820, 1830, 1840, 1850, 1855, 1860, 1865, 1870, 1875, 1880, 1885, 1890, 1895, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935, 1940, 1945, 1950, 1953, 1956, 1959, 1962, 1965, 1968, 1971, 1974, 1977, 1980, 1983, 1986, 1989, 1992, 1995, 1998, 2001, 2004, 2007, 2010, 2013, 2016, 2019];
  let a0 = [20371.848, 11557.668, 6535.116, 1650.393, 1056.647, 681.149, 292.343, 109.127, 43.952, 12.068, 18.367, 15.678, 16.516, 10.804, 7.634, 9.338, 10.357, 9.04, 8.255, 2.371, -1.126, -3.21, -4.388, -3.884, -5.017, -1.977, 4.923, 11.142, 17.479, 21.617, 23.789, 24.418, 24.164, 24.426, 27.05, 28.932, 30.002, 30.76, 32.652, 33.621, 35.093, 37.956, 40.951, 44.244, 47.291, 50.361, 52.936, 54.984, 56.373, 58.453, 60.678, 62.898, 64.083, 64.553, 65.197, 66.061, 66.92, 68.109];
  let a1 = [-9999.586, -5822.27, -5671.519, -753.21, -459.628, -421.345, -192.841, -78.697, -68.089, 2.507, -3.481, 0.021, -2.157, -6.018, -0.416, 1.642, -0.486, -0.591, -3.456, -5.593, -2.314, -1.893, 0.101, -0.531, 0.134, 5.715, 6.828, 6.33, 5.518, 3.02, 1.333, 0.052, -0.419, 1.645, 2.499, 1.127, 0.737, 1.409, 1.577, 0.868, 2.275, 3.035, 3.157, 3.199, 3.069, 2.878, 2.354, 1.577, 1.648, 2.235, 2.324, 1.804, 0.674, 0.466, 0.804, 0.839, 1.007, 1.277];
  let a2 = [776.247, 1303.151, -298.291, 184.811, 108.771, 61.953, -6.572, 10.505, 38.333, 41.731, -1.126, 4.629, -6.806, 2.944, 2.658, 0.261, -2.389, 2.284, -5.148, 3.011, 0.269, 0.152, 1.842, -2.474, 3.138, 2.443, -1.329, 0.831, -1.643, -0.856, -0.831, -0.449, -0.022, 2.086, -1.232, 0.22, -0.61, 1.282, -1.115, 0.406, 1.002, -0.242, 0.364, -0.323, 0.193, -0.384, -0.14, -0.637, 0.708, -0.121, 0.21, -0.729, -0.402, 0.194, 0.144, -0.109, 0.277, -0.007];
  let a3 = [409.16, -503.433, 1085.087, -25.346, -24.641, -29.414, 16.197, 3.018, -2.127, -37.939, 1.918, -3.812, 3.25, -0.096, -0.539, -0.883, 1.558, -2.477, 2.72, -0.914, -0.039, 0.563, -1.438, 1.871, -0.232, -1.257, 0.72, -0.825, 0.262, 0.008, 0.127, 0.142, 0.702, -1.106, 0.614, -0.277, 0.631, -0.799, 0.507, 0.199, -0.414, 0.202, -0.229, 0.172, -0.192, 0.081, -0.165, 0.448, -0.276, 0.11, -0.313, 0.109, 0.199, -0.017, -0.084, 0.128, -0.095, -0.139];

  let n = y0.length, i;

  for (i = n - 1; i >= 0; i--) {
    if (y >= y0[i]) {
      break;
    }
  }

  let t = (y - y0[i]) / (y1[i] - y0[i]);
  let dT = a0[i] + t * (a1[i] + t * (a2[i] + t * a3[i]));

  return dT;
}

// Calculate the mean Greenwich sidereal time in hours
export const getGMST = (d: AstroTimestamp) => {
  // Get Julian date at midnight GMST
  let D0 = Math.floor(d.D - 0.5) + 0.5;

  // Get hours according to UTC time
  let H = d.h + d.m / 60 + d.s / 3600 + d.tz / 60;
  H -= 24 * Math.floor(H / 24);

  let GMST = 0.06570748587250752 * D0;
  GMST -= 24 * Math.floor(GMST / 24);
  GMST += 6.697374558336001 + 1.00273781191135448 * H;
  GMST -= 24 * Math.floor(GMST / 24);

  let T = d.T + d.dT;

  GMST += 2.686296296296296e-07 + T * (0.08541030618518518 + T * 2.577003148148148e-05);
  GMST -= 24 * Math.floor(GMST / 24);

  return GMST;
}

export const getSidereal = (GMST: number, longitude: number) => {
  let LST = GMST + longitude / 15;

  // LST in hours
  LST = LST - 24 * Math.floor(LST / 24);

  // LST in radians
  let LSTRad = LST * Math.PI / 12;

  return {
    hour: LST,
    rad: LSTRad,
  }
}

export const processTimestamp = (timestamp: Date, longitude: number) => {
  let yyyy = timestamp.getFullYear(),
    mm = timestamp.getMonth() + 1,
    dd = timestamp.getDate(),
    tz = timestamp.getTimezoneOffset(),
    h = timestamp.getHours(),
    m = timestamp.getMinutes(),
    s = timestamp.getSeconds() + 1e-3 * timestamp.getMilliseconds(),
    D = dMidnight(yyyy, mm, dd, tz) + (h + m / 60 + s / 3600) / 24,
    T = D / 36525,
    dT = deltaTPolynomial(T),
    date = calendarTimestamp(D - tz / 1440);

  let ts = {
    yyyy: date.yy,
    mm: date.mm,
    dd: date.dd,
    tz,
    h: date.h,
    m: date.m,
    s: date.s,
    D,
    T,
    dT,
    // GMST: 0,
    LST: { hour: 0, rad: 0 },
  };

  let GMST = getGMST(ts),
    LST = getSidereal(GMST, longitude);

  // ts.GMST = GMST;
  ts.LST = LST;

  return ts;
}

