import fs from 'fs';
import path from 'path';
import parse from 'csv-parse/lib/sync';

const parseHYGFile = async () => {
  const csv = fs.readFileSync(path.resolve('data/hygdata_v3.csv'), 'utf8');

  const stars = await parse(csv, {
    columns: true,
    skipEmptyLines: true,
    trim: true,
  });

  const processed = stars.map((star: any) => ({
    id: parseEmptyInt(star.id),
    hip: parseEmptyInt(star.hip),
    hd: parseEmptyInt(star.hd),
    gl: parseEmptyString(star.gl),
    bf: parseEmptyString(star.bf),
    proper: parseEmptyString(star.proper),
    ra: parseEmptyFloat(star.ra),
    dec: parseEmptyFloat(star.dec),
    dist: parseEmptyFloat(star.dist),
    pmra: parseEmptyFloat(star.pmra),
    pmdec: parseEmptyFloat(star.pmdec),
    rv: parseEmptyFloat(star.rv),
    mag: parseEmptyFloat(star.mag),
    absmag: parseEmptyFloat(star.absmag),
    spect: parseEmptyString(star.spect),
    ci: parseEmptyFloat(star.ci),
    x: parseEmptyFloat(star.x),
    y: parseEmptyFloat(star.y),
    z: parseEmptyFloat(star.z),
    vx: parseEmptyFloat(star.vx),
    vy: parseEmptyFloat(star.vy),
    vz: parseEmptyFloat(star.vz),
    rarad: parseEmptyFloat(star.rarad),
    decrad: parseEmptyFloat(star.decrad),
    pmrarad: parseEmptyFloat(star.pmrarad),
    pmdecrad: parseEmptyFloat(star.pmdecrad),
    bayer: parseEmptyString(star.bayer),
    flam: parseEmptyInt(star.flam),
    con: parseEmptyString(star.con),
    comp: parseEmptyInt(star.comp),
    comp_primary: parseEmptyInt(star.comp_primary),
    base: parseEmptyString(star.base),
    lum: parseEmptyFloat(star.lum),
    var: parseEmptyString(star.var),
    var_min: parseEmptyFloat(star.var_min),
    var_max: parseEmptyFloat(star.var_max),
  }));

  return processed;
}

const parseEmptyInt = (str: string) => {
  if (!str) {
    return null;
  } else {
    return parseInt(str, 10);
  }
}

const parseEmptyFloat = (str: string) => {
  if (!str) {
    return null;
  } else {
    return parseFloat(str);
  }
}

const parseEmptyString = (str: string) => {
  if (str) {
    return str;
  } else {
    return null;
  }
}

export default parseHYGFile;
