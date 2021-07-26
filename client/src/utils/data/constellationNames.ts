const constellationNames = [
  { name: "Andromeda", abbr: "And", ra: 0.25, dec: 0.7 },
  { name: "Antlia", abbr: "Ant", ra: 2.683443724941281, dec: -0.6108652381980153 },
  { name: "Apus", abbr: "Aps", ra: -2.094395102393196, dec: -1.343903524035634 },
  { name: "Aquaries", abbr: "Aqr", ra: -0.3272492347489371, dec: -0.2617993877991494 },
  { name: "Aquila", abbr: "Aql", ra: -1.112647398146385, dec: -0.03490658503988659 },
  { name: "Ara", abbr: "Ara", ra: -1.6, dec: -0.96 },
  { name: "Aries", abbr: "Ari", ra: 0.6544984694978735, dec: 0.4363323129985824 },
  { name: "Auriga", abbr: "Aur", ra: 1.439896632895322, dec: 0.6108652381980153 },
  { name: "Bootes", abbr: "Boo", ra: -2.55, dec: 0.5 },
  { name: "Caelum", abbr: "Cae", ra: 1.3, dec: -0.7 },
  { name: "Camelopardalis", abbr: "Cam", ra: 1.701696020694471, dec: 1.256637061435917 },
  { name: "Cancer", abbr: "Cnc", ra: 2.356194490192345, dec: 0.3490658503988659 },
  { name: "Canes Venatici", abbr: "CVn", ra: -2.945243112740432, dec: 0.7330382858376184 },
  { name: "Capricornus", abbr: "Cap", ra: -0.7853981633974486, dec: -0.3490658503988659 },
  { name: "Carina", abbr: "Car", ra: 2.028945255443408, dec: -1.012290966156711 },
  { name: "Cassiopeia", abbr: "Cas", ra: 0.205, dec: 0.95 },
  { name: "Centaurus", abbr: "Cen", ra: -2.74889357189107, dec: -0.7853981633974482 },
  { name: "Cepheus", abbr: "Cep", ra: -0.4581489286485125, dec: 1.099557428756428 },
  { name: "Cetus", abbr: "Cet", ra: 0.5299999999999999, dec: -0.1 },
  { name: "Chamaeleon", abbr: "Cha", ra: 2.88, dec: -1.41 },
  { name: "Circinus", abbr: "Cir", ra: -2.3, dec: -1.05 },
  { name: "Columba", abbr: "Col", ra: 1.570796326794897, dec: -0.6632251157578453 },
  { name: "Coma Berenices", abbr: "Com", ra: -2.85, dec: 0.38 },
  { name: "Corona Australis", abbr: "CrA", ra: -1.361356816555578, dec: -0.6981317007977317 },
  { name: "Corona Borealis", abbr: "CrB", ra: -2.146754979953025, dec: 0.4886921905584123 },
  { name: "Corvus", abbr: "Crv", ra: -3, dec: -0.37 },
  { name: "Crater", abbr: "Crt", ra: 3.063052837250048, dec: -0.2617993877991494 },
  { name: "Crux", abbr: "Cru", ra: -3.010692959690219, dec: -0.9773843811168246 },
  { name: "Cygrus", abbr: "Cyg", ra: -0.7853981633974485, dec: 0.7853981633974482 },
  { name: "Delphinus", abbr: "Del", ra: -0.9162978572970241, dec: 0.174532925199433 },
  { name: "Dorado", abbr: "Dor", ra: 1.35, dec: -1.1 },
  { name: "Draco", abbr: "Dra", ra: -1.570796326794897, dec: 1.047197551196598 },
  { name: "Canis Major", abbr: "CMa", ra: 1.780235837034216, dec: -0.4363323129985824 },
  { name: "Canis Minor", abbr: "CMi", ra: 2.05, dec: 0.13 },
  { name: "Equuleus", abbr: "Equ", ra: -0.7199483164476617, dec: 0.05235987755982989 },
  { name: "Eridanus", abbr: "Eri", ra: 0.9817477042468101, dec: -0.2617993877991494, ra2: 0.7330382858376183, dec2: -0.7853981633974483 },
  { name: "Fornax", abbr: "For", ra: 0.7499999999999999, dec: -0.53 },
  { name: "Gemini", abbr: "Gem", ra: 2.12, dec: 0.52 },
  { name: "Grus", abbr: "Gru", ra: -0.4, dec: -0.7499999999999999 },
  { name: "Hercules", abbr: "Her", ra: -1.832595714594047, dec: 0.4188790204786391 },
  { name: "Horologium", abbr: "Hor", ra: 1, dec: -0.9 },
  { name: "Hydra", abbr: "Hya", ra: 2.487094184091919, dec: -0.06981317007977318, ra2: 3.141592653589793, dec2: -0.5759586531581288 },
  { name: "Hydrus", abbr: "Hyi", ra: 0.5759586531581288, dec: -1.256637061435917 },
  { name: "Indus", abbr: "Ind", ra: -0.6544984694978739, dec: -0.8726646259971648 },
  { name: "Lacerta", abbr: "Lac", ra: -0.3926990816987248, dec: 0.7330382858376184 },
  { name: "Leo", abbr: "Leo", ra: 2.879793265790644, dec: 0.2967059728390360 },
  { name: "Leo Minor", abbr: "LMi", ra: 2.748893571891069, dec: 0.5585053606381853 },
  { name: "Lepus", abbr: "Lep", ra: 1.492256510455152, dec: -0.2617993877991494 },
  { name: "Libra", abbr: "Lib", ra: -2.356194490192345, dec: -0.2094395102393196 },
  { name: "Lupus", abbr: "Lup", ra: -2.225294796292771, dec: -0.7853981633974482 },
  { name: "Lynx", abbr: "Lyn", ra: 2.094395102393195, dec: 0.7853981633974482 },
  { name: "Lyra", abbr: "Lyr", ra: -1.4, dec: 0.7 },
  { name: "Mensa", abbr: "Men", ra: 1.439896632895322, dec: -1.308996938995747 },
  { name: "Microscopium", abbr: "Mic", ra: -0.7853981633974486, dec: -0.6283185307179586 },
  { name: "Monoceros", abbr: "Mon", ra: 2.01585528605345, dec: -0.1047197551196598 },
  { name: "Musca", abbr: "Mus", ra: -3.063052837250049, dec: -1.221730476396031 },
  { name: "Norma", abbr: "Nor", ra: -2.015855286053451, dec: -0.8901179185171081 },
  { name: "Octans", abbr: "Oct", ra: -1.047197551196599, dec: -1.48352986419518 },
  { name: "Ophiuchus", abbr: "Oph", ra: -1.780235837034217, dec: -0.06981317007977318 },
  { name: "Orion", abbr: "Ori", ra: 1.4, dec: 0 },
  { name: "Pavo", abbr: "Pav", ra: -1.047197551196599, dec: -1.082104136236484 },
  { name: "Pegasus", abbr: "Peg", ra: -0.07853981633974551, dec: 0.3839724354387525 },
  { name: "Perseus", abbr: "Per", ra: 1, dec: 0.6499999999999999 },
  { name: "Phoenix", abbr: "Phe", ra: 0.2617993877991494, dec: -0.8377580409572782 },
  { name: "Pictor", abbr: "Pic", ra: 1.623156204354726, dec: -1.012290966156711 },
  { name: "Pisces", abbr: "Psc", ra: 0.2879793265790644, dec: 0.2094395102393196 },
  { name: "Piscis Austrinus", abbr: "PsA", ra: -0.3665191429188098, dec: -0.5235987755982988 },
  { name: "Puppis", abbr: "Pup", ra: 2.042035224833366, dec: -0.6632251157578453 },
  { name: "Pyxis", abbr: "Pyx", ra: 2.303834612632515, dec: -0.5585053606381853 },
  { name: "Reticulum", abbr: "Ret", ra: 1.047197551196598, dec: -1.047197551196598 },
  { name: "Sagitta", abbr: "Sge", ra: -0.98, dec: 0.28 },
  { name: "Sagittarius", abbr: "Sgr", ra: -1.4, dec: -0.4 },
  { name: "Scorpius", abbr: "Sco", ra: -1.78, dec: -0.55 },
  { name: "Sculptor", abbr: "Scl", ra: 0, dec: -0.5934119456780722 },
  { name: "Scutum", abbr: "Sct", ra: -1.361356816555578, dec: -0.2094395102393196 },
  { name: "Serpens", abbr: "Ser", ra: -2.172934918732941, dec: 0.2094395102393196, ra2: 4.88, dec2: 0 },
  { name: "Sextans", abbr: "Sex", ra: 2.722713633111154, dec: -0.1047197551196598 },
  { name: "Taurus", abbr: "Tau", ra: 1.125737367536342, dec: 0.174532925199433 },
  { name: "Telescopium", abbr: "Tel", ra: -1.45, dec: -0.8100000000000001 },
  { name: "Triangulum", abbr: "Tri", ra: 0.5235987755982988, dec: 0.5585053606381853 },
  { name: "Triangulum  Australe", abbr: "TrA", ra: -2.042035224833367, dec: -1.082104136236484 },
  { name: "Tucana", abbr: "Tuc", ra: 0, dec: -1.117010721276371 },
  { name: "Ursa Major", abbr: "UMa", ra: 2.879793265790644, dec: 0.8726646259971648 },
  { name: "Ursa Minor", abbr: "UMi", ra: -2.356194490192345, dec: 1.43116998663535 },
  { name: "Vela", abbr: "Vel", ra: 2.539454061651749, dec: -0.8726646259971648 },
  { name: "Virgo", abbr: "Vir", ra: -2.77, dec: -0.1 },
  { name: "Volans", abbr: "Vol", ra: 2.22529479629277, dec: -1.134464013796314 },
  { name: "Vulpecula", abbr: "Vul", ra: -1.178097245096173, dec: 0.3839724354387525 }
];

export default constellationNames;
