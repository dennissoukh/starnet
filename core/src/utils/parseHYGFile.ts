import fs from 'fs';
import path from 'path';
import parse from 'csv-parse/lib/sync';
import { parseEmptyInt, parseEmptyFloat, parseEmptyString } from './dataParsers';

const parseHYGFile = async () => {
  const csv = fs.readFileSync(path.resolve('data/hygdata_v3.csv'), 'utf8');

  const stars = await parse(csv, {
    columns: true,
    skipEmptyLines: true,
    trim: true,
  });

  let processed = stars.map((star: any) => ({
    id: parseEmptyInt(star.id),
    hip: parseEmptyInt(star.hip),
    hd: parseEmptyInt(star.hd),
    gl: parseEmptyString(star.gl),
    bf: parseEmptyString(star.bf),
    proper: parseEmptyString(star.proper),
    ra: parseEmptyFloat(star.rarad),
    dec: parseEmptyFloat(star.decrad),
    dist: parseEmptyFloat(star.dist),
    pmra: parseEmptyFloat(star.pmrarad),
    pmdec: parseEmptyFloat(star.pmdecrad),
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

  // Remove Sun from catalogue
  // TODO: Remove Capella B and α Cen B from catalogue
  processed = processed.filter((star: any) => {
    return star.proper !== 'Sol';
  });

  return processed;
}

export default parseHYGFile;
