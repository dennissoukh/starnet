# Convert constellation_lines_simplifed.dat to JSON format
import json
import re

class Constellation:
  def __init__(self, name, lines):
    self.name = name
    self.lines = lines

file = open('data/constellation_lines_simplified.dat', 'r')

lines = ""

for i, line in enumerate(file):
  if i == 0 or not line.startswith('#'):
    lines += line.rstrip()

constellationString = lines.split('* ')
constellations = []

for line in constellationString:
  constellation = []
  name = ""
  lines = []

  for l in line.split('['):
    if l.startswith('"'):
      constellation.append("[" + l)
    else:
      constellation.append(l)

  for line in constellation:
    i = constellation.index(line)

    if i == 0:
      name = line.lower()
    else:
      arr = [ int(x.strip().replace('"', '').replace('*', '')) for x in line.strip('[]').split(',') ]
      lines.append(arr)

  constellationObj = Constellation(name, lines)

  constellations.append(constellationObj)

jsonFile = open('../core/data/constellation_lines.json', 'w')

results = [obj.__dict__ for obj in constellations[1:]]
resultsSerialized = json.dumps(results)

jsonFile.write(resultsSerialized)

jsonFile.close()
file.close()
