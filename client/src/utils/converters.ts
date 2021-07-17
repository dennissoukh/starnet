export const convertCoordinatesDMS = (deg: number) => {
  let d = Math.floor(deg);

  let minfloat = (deg - d) * 60;
  let m = Math.floor(minfloat);

  let secfloat = (minfloat - m) * 60;
  let s = Math.round(secfloat);

  if (s === 60) {
    m++;
    s = 0;
  }

  if (m === 60) {
    d++;
    m = 0;
  }

  return `${(d > 0) ? '+' : ''}${d}°${m}'${s}''`;
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getOrdinalNum = (n: number) => {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

const getTimeZone = (date: Date) => {
  let offset = date.getTimezoneOffset(), o = Math.abs(offset);
  return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

export const createTimeString = (date: Date) => {
  const time = date.toLocaleTimeString();
  const day = getOrdinalNum(date.getUTCDate());
  const month = months[date.getMonth()];
  const timezone = getTimeZone(date);

  return `${time}, ${day} ${month} ${date.getFullYear()} UTC${timezone}`;
}
