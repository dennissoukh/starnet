export type Pagination = {
  page: number,
  count: number,
  totalCount: number,
  pageCount: number,
}

export type Timestamp = {
  day: number,
  month: number,
  year: number,
  hours: number,
  minutes: number,
  seconds: number,
}

export type PrecessionMatrix = {
  p11: number,
  p12: number,
  p13: number,
  p21: number,
  p22: number,
  p23: number,
  p31: number,
  p32: number,
  p33: number,
}

export type ELPMPP02Angles = {
  D: number,
  F: number,
  L: number,
  Lp: number,
  zeta: number,
  Me: number,
  Ve: number,
  EM: number,
  Ma: number,
  Ju: number,
  Sa: number,
  Ur: number,
  Ne: number,
  W1: number,
}

export type CalendarDate = {
  dd: number,
  mm: number,
  yy: number,
  h: number,
  m: number,
  s: number,
}

export type AstroTimestamp = {
  yyyy: number,
  mm: number,
  dd: number,
  tz: number,
  h: number,
  m: number,
  s: number,
  D: number,
  T: number,
  dT: number,
  GMST?: number,
  LST?: LST,
}

export type LST = {
  hour: number,
  rad: number,
}
