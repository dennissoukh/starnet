import fs from 'fs';
import path from 'path';

const parseConstellationLinesFile = async () => {
  const data = fs.readFileSync(path.resolve('data/constellation_lines.json'), 'utf8');
  const parsed = JSON.parse(data);

  return parsed;
}

export default parseConstellationLinesFile;
