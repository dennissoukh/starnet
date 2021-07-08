import fs from 'fs';
import path from 'path';
import parse from 'csv-parse/lib/sync';
import { parseEmptyInt, parseEmptyFloat, parseEmptyString } from './dataParsers';

const parseDSOFile = async () => {
  const csv = fs.readFileSync(path.resolve('data/dso.csv'), 'utf8');

  const objects = await parse(csv, {
    columns: true,
    skipEmptyLines: true,
    trim: true,
  });

  let processed = objects.map((object: any) => ({
    type: parseEmptyString(object.type),
    const: parseEmptyString(object.const),
    mag: parseEmptyFloat(object.mag),
    name: parseEmptyString(object.name),
    ra: parseEmptyFloat(object.ra),
    dec: parseEmptyFloat(object.dec),
    id: parseEmptyInt(object.id),
    r1: parseEmptyFloat(object.r1),
    r2: parseEmptyFloat(object.r2),
    angle: parseEmptyFloat(object.angle),
    dso_source: parseEmptyInt(object.dso_source),
    id1: parseEmptyInt(object.id1),
    cat1: parseEmptyString(object.cat1),
    id2: parseEmptyInt(object.id2),
    cat2: parseEmptyString(object.cat2),
    dupid: parseEmptyInt(object.dupid),
    dupcat: parseEmptyString(object.dupcat),
    display_mag: parseEmptyInt(object.display_mag),
  }));

  return processed;
}

export default parseDSOFile;
