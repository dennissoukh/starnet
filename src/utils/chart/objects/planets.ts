import { degreesToRadians, kepler, mod2pi, modulus } from "../../math";
import { precessionMatrix } from "../../precession";
import { geocentricToTopocentric, raDecToCoordinates } from "../drawingTools";

const planetColors = ['red', 'orange', '#68696d', '#8B7D82', '#993d00', '#b07f35', '#b08f36', '#5580aa', '#366896'];
// const planetNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
const planetSizes = [1, 2, 1, 2, 2, 3, 2, 2, 2];
const planetSymbols = [9788, 9789, 9791, 9792, 9794, 9795, 9796, 9954, 9798];
const planetOffsets = [{ x: -10, y: 7 }, { x: -10, y: 7 }, { x: -5.5, y: 6 }, { x: -7, y: 1 }, { x: -6, y: 3 },
  { x: -12.5, y: 4 }, { x: -5, y: 7 }, { x: -10, y: 2 }, { x: -8, y: 5 }];

const planets = (
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number,
  lat: number,
  azimuthOffset: number,
  TD: number,
  LST: number,
) => {
  const planets = solarSystemObjects(TD);
  const cosLat = Math.cos(degreesToRadians(lat)), sinLat = Math.sin(degreesToRadians(lat));
  const parameters = {
    length,
    width,
    xc: .5 * width,
    yc: .5 * length,
    r: .47 * Math.max(length, width),
    rotation: azimuthOffset,
  }

  for (let i = 0; i < 9; i++) {
    let raDec = { ra: planets[i].ra, dec: planets[i].dec };

    if (i === 1) {
      // Convert geocentric coord. to topocentric coord. to correct for diurnal parallax of the Moon.
      let topo = geocentricToTopocentric(planets[i].rGeo, raDec, LST, cosLat, sinLat);
      raDec = { ra: topo.raTopo, dec: topo.decTopo };
    }

    let coord = raDecToCoordinates(raDec, LST, cosLat, sinLat, azimuthOffset, parameters);

    if (coord.x > -998) {
      const x = coord.x; const y = coord.y;

      let symbol = String.fromCharCode(planetSymbols[i]);

      ctx.font = '20px Georgia'
      ctx.fillStyle = planetColors[i];
      ctx.fillText(symbol, x + planetOffsets[i].x, y + planetOffsets[i].y);
      ctx.beginPath();
      ctx.arc(x, y, planetSizes[i], 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const solarSystemObjects = (T: number) => {
  let planets = [];
  let positions = planetPositions(T, [true, true, true, true, true, true, true, true]);

  // 0 = Sun, 1 = Moon, 2 = Mercury, 3 = Venus, 4 = Mars, 5 = Jupiter, 6 = Saturn, 7 = Uranus, 8 = Neptune
  planets[0] = positions[2];
  planets[1] = moonPosition(T);
  planets[2] = positions[0];
  planets[3] = positions[1];
  planets[4] = positions[3];
  planets[5] = positions[4];
  planets[6] = positions[5];
  planets[7] = positions[6];
  planets[8] = positions[7];

  return planets;
}

const planetPositions = (T: any, objects: Array<boolean>) => {
  let pi2 = 2 * Math.PI;
  let f1oc = 1.58125073358306e-07;
  let cosEps = 0.917482139208287;
  let sinEps = 0.397776978008764;
  let a0, adot, e0, edot, I0, Idot, L0, Ldot, pom0, pomdot, Omg0, Omgdot;
  let b: Array<number> = [], c: Array<number> = [], s: Array<number> = [], f: Array<number> = [];

  if (T > -2 && T < 0.5) {
    // Use the parameters for 1800 AD - 2050 AD
    a0 = [0.38709927, 0.72333566, 1.00000261, 1.52371034, 5.202887, 9.53667594, 19.18916464, 30.06992276];
    adot = [0.00000037, 0.0000039, 0.00000562, 0.00001847, -0.00011607, -0.0012506, -0.00196176, 0.00026291];
    e0 = [0.20563593, 0.00677672, 0.01671123, 0.09339410, 0.04838624, 0.05386179, 0.04725744, 0.00859048];
    edot = [0.00001906, -0.00004107, -0.00004392, 0.00007882, -0.00013253, -0.00050991, -0.00004397, 0.00005105];
    I0 = [0.122259947932126, 0.0592482741110957, -2.67209908480332e-07, 0.0322832054248893,
      0.0227660215304719, 0.0433887433093108, 0.0134850740589642, 0.0308930864549255];
    Idot = [-0.000103803282729438, -1.37689024689833e-05, -0.000225962193202099, -0.00014191813200034,
    -3.20641418200886e-05, 3.3791145114937e-05, -4.2400854315025e-05, 6.17357863015434e-06];
    L0 = [4.40259868429583, 3.17613445608937, 1.75343755707279, -0.0794723815383351,
      0.600331137865858, 0.87186603715888, 5.4670362664056, -0.962026001887529];
    Ldot = [2608.79030501053, 1021.32854958241, 628.307577900922, 334.061301681387,
      52.966311891386, 21.3365387887055, 7.47842217160454, 3.81283674131913];
    pom0 = [1.35189357642502, 2.29689635603878, 1.79660147404917, -0.41789517122344,
      0.257060466847075, 1.61615531016306, 2.98371499179911, 0.784783148988019];
    pomdot = [0.00280085010386076, 4.68322452858386e-05, 0.00564218940290684, 0.00775643308768542,
      0.00370929031433238, -0.00731244366619248, 0.00712186505651484, -0.00562719702463221];
    Omg0 = [0.843530995489199, 1.33831572240834, 0, 0.864977129749742, 1.75360052596996,
      1.9837835429754, 1.2918390439753, 2.30006864135446];
    Omgdot = [-0.00218760982161663, -0.00484667775462579, 0, -0.00510636965735315,
      0.00357253294639726, -0.00503838053087464, 0.000740122402738538, -8.87786158636444e-05];
  } else {
    // Use the parameters for 3000 BC - 3000 AD
    a0 = [0.38709843, 0.72332102, 1.00000018, 1.52371243, 5.20248019, 9.54149883, 19.18797948, 30.06952752];
    adot = [0, -0.00000026, -0.00000003, 0.00000097, -0.00002864, -0.00003065, -0.00020455, 0.00006447];
    e0 = [0.20563661, 0.00676399, 0.01673163, 0.09336511, 0.0485359, 0.05550825, 0.0468574, 0.00895439];
    edot = [0.00002123, -0.00005107, -0.00003661, 0.00009149, 0.00018026, -0.00032044, -0.0000155, 0.00000818];
    I0 = [0.122270686943013, 0.059302368845932, -9.48516635288838e-06, 0.0323203332904682,
      0.0226650928050204, 0.0435327181373017, 0.0134910682177473, 0.0308932911820467];
    Idot = [-0.000103002002069847, 7.59113504862414e-06, -0.000233381587852327, -0.000126493959268765,
    -5.63216004289318e-05, 7.88834716694625e-05, -3.14429791393038e-05, 3.9095375244673e-06];
    L0 = [4.40262213698312, 3.17614508514451, 1.75347846863765, -0.0797289377825283, 0.599255160009829,
      0.873986072195182, 5.48387278993662, 5.30969114052348];
    Ldot = [2608.79031817869, 1021.32855334028, 628.307588608167, 334.061243342709, 52.9690623526126,
      21.3299296671748, 7.47865077657529, 3.81293622316663];
    pom0 = [1.35189222676191, 2.29977771922823, 1.79646842620403, -0.417438213482006, 0.249144920643598,
      1.62073649087534, 3.00954181748462, 0.814747397394972];
    pomdot = [0.00278205709660699, 0.000991285579543109, 0.00554931973527652, 0.00789301155937221,
      0.00317635891415782, 0.00945610278111832, 0.00161739399982927, 0.000176267433410065];
    Omg0 = [0.843685496572442, 1.33818957716586, -0.08923177123077, 0.867659193442843, 1.75044003925455,
      1.98339193542262, 1.29088918553089, 2.30010586556221];
    Omgdot = [-0.00213177691337826, -0.00476024137061832, -0.00421040715476989, -0.00468663333114593,
      0.00227322485367811, -0.00436594147292966, 0.00100176645623426, -0.000105819661614267];
    b = [0, 0, 0, 0, -2.17328398458334e-06, 4.52022822974011e-06, 1.01806800598081e-05, -7.21658739114615e-06];
    c = [0, 0, 0, 0, 0.00105837813038487, -0.0023447571730711, -0.0170574253165864, 0.0119286828071507];
    s = [0, 0, 0, 0, -0.00621955723490303, 0.0152402406847545, 0.00308735567441944, -0.00177369905538672];
    f = [0, 0, 0, 0, 0.669355584755475, 0.669355584755475, 0.133871116951095, 0.133871116951095];
  }

  let i, xp, yp, zp;
  let x = [0, 0, 0, 0, 0, 0, 0, 0];
  let y = [0, 0, 0, 0, 0, 0, 0, 0];
  let z = [0, 0, 0, 0, 0, 0, 0, 0];
  let rHelio = [0, 0, 0, 0, 0, 0, 0, 0];
  let rGeo = [0, 0, 0, 0, 0, 0, 0, 0];
  let vx = [0, 0, 0, 0, 0, 0, 0, 0];
  let vy = [0, 0, 0, 0, 0, 0, 0, 0];
  let vz = [0, 0, 0, 0, 0, 0, 0, 0];

  for (i = 0; i < 8; i++) {
    if (!objects[i] && i !== 2) continue;

    let a = a0[i] + adot[i] * T;
    let e = e0[i] + edot[i] * T;
    let I = I0[i] + Idot[i] * T;
    let L = L0[i] + modulus(Ldot[i] * T, pi2);
    let pom = pom0[i] + pomdot[i] * T;
    let Omg = Omg0[i] + Omgdot[i] * T;
    let omg = pom - Omg;
    let M = L - pom;
    if (T <= -2 || T >= 0.5) {
      if (i > 3) {
        M = M + b[i] * T * T + c[i] * Math.cos(f[i] * T) + s[i] * Math.sin(f[i] * T);
      }
    }
    let E = kepler(M, e);
    let sinE = Math.sin(E);
    let cosE = Math.cos(E);
    let bb = a * Math.sqrt(1 - e * e);
    let Edot = Ldot[i] / (1 - e * cosE);
    xp = a * (cosE - e);
    yp = bb * sinE;
    let vxp = -a * sinE * Edot;
    let vyp = bb * cosE * Edot;
    let cos_omg = Math.cos(omg);
    let sin_omg = Math.sin(omg);
    let cosOmg = Math.cos(Omg);
    let sinOmg = Math.sin(Omg);
    let sinI = Math.sin(I);
    let cosI = Math.cos(I);
    let m11 = cos_omg * cosOmg - sin_omg * sinOmg * cosI;
    let m12 = -sin_omg * cosOmg - cos_omg * sinOmg * cosI;
    x[i] = m11 * xp + m12 * yp;
    vx[i] = m11 * vxp + m12 * vyp;
    let m21 = cos_omg * sinOmg + sin_omg * cosOmg * cosI;
    let m22 = cos_omg * cosOmg * cosI - sin_omg * sinOmg;
    y[i] = m21 * xp + m22 * yp;
    vy[i] = m21 * vxp + m22 * vyp;
    let m31 = sin_omg * sinI;
    let m32 = cos_omg * sinI;
    z[i] = m31 * xp + m32 * yp;
    vz[i] = m31 * vxp + m32 * vyp;

    // Heliocentric distance
    rHelio[i] = Math.sqrt(x[i] * x[i] + y[i] * y[i] + z[i] * z[i]);
  }

  // Heliocentric position -> geocentric position
  // Index 2 becomes Sun's geocentric position
  x[2] = -x[2]; y[2] = -y[2]; z[2] = -z[2];
  rGeo[2] = rHelio[2]; rHelio[2] = 0;
  vx[2] = -vx[2]; vy[2] = -vy[2]; vz[2] = -vz[2];

  for (i = 0; i < 8; i++) {
    if (i !== 2 && objects[i]) {
      x[i] = x[i] + x[2];
      y[i] = y[i] + y[2];
      z[i] = z[i] + z[2];
      rGeo[i] = Math.sqrt(x[i] * x[i] + y[i] * y[i] + z[i] * z[i]);

      // Correct for light time
      let dT = rGeo[i] * f1oc;
      x[i] -= vx[i] * dT;
      y[i] -= vy[i] * dT;
      z[i] -= vz[i] * dT;
    }
  }

  // RA and DEC with respect to J2000
  let p = precessionMatrix(0, T);
  let output = [];

  for (i = 0; i < 8; i++) {
    if (!objects[i]) continue;

    // Ecliptic long. and lat. wrt J2000
    let lam2000 = Math.atan2(y[i], x[i]);
    let bet2000 = Math.asin(z[i] / rGeo[i]);

    // Equatorial coordinates
    let xeq = x[i];
    let yeq = cosEps * y[i] - sinEps * z[i];
    let zeq = sinEps * y[i] + cosEps * z[i];

    // Velocity/c wrt J2000.0 mean equator and equinox
    let bx = vx[i] * f1oc;
    let by = (cosEps * vy[i] - sinEps * vz[i]) * f1oc;
    let bz = (sinEps * vy[i] + cosEps * vz[i]) * f1oc;

    // Precessed to the mean equator and equinox of the date
    xp = p.p11 * xeq + p.p12 * yeq + p.p13 * zeq;
    yp = p.p21 * xeq + p.p22 * yeq + p.p23 * zeq;
    zp = p.p31 * xeq + p.p32 * yeq + p.p33 * zeq;

    let betax = p.p11 * bx + p.p12 * by + p.p13 * bz;
    let betay = p.p21 * bx + p.p22 * by + p.p23 * bz;
    let betaz = p.p31 * bx + p.p32 * by + p.p33 * bz;
    let r = Math.sqrt(xp * xp + yp * yp + zp * zp);

    output[i] = {
      ra: Math.atan2(yp, xp),
      dec: Math.asin(zp / r),
      ra2000: Math.atan2(yeq, xeq),
      dec2000: Math.asin(zeq / r),
      lam2000,
      bet2000,
      rHelio: rHelio[i],
      rGeo: rGeo[i],
      betax,
      betay,
      betaz,
    };
  }

  return output;
}

const moonPosition = (T: number) => {
  let T2 = T * T;
  let T3 = T2 * T;
  let T4 = T2 * T2;
  let T5 = T2 * T3;
  let ra0 = 0.9999999498265204;

  let W1 = 3.8103440908308803 + mod2pi(8399.6847300719292 * T) +
    mod2pi(-3.3189520425500942e-5 * T2) +
    mod2pi(3.1102494491060616e-8 * T3) +
    mod2pi(-2.0328237648922845e-10 * T4);
  let W2 = 1.4547895404440776 + mod2pi(70.993305448479248 * T) +
    mod2pi(-1.8548192818782712e-4 * T2) +
    mod2pi(-2.1961637966359412e-7 * T3) +
    mod2pi(1.0327016221314225e-9 * T4);
  let W3 = 2.1824388474237688 + mod2pi(-33.781427419672326 * T) +
    mod2pi(3.0816644950982666e-5 * T2) +
    mod2pi(3.6447710769397583e-8 * T3) +
    mod2pi(-1.738541860458796e-10 * T4);
  let Ea = 1.7534699452640696 + mod2pi(628.30758508103156 * T) +
    mod2pi(-9.7932363584126268e-8 * T2) +
    mod2pi(4.3633231299858238e-11 * T3) +
    mod2pi(7.2722052166430391e-13 * T4);
  let pomp = 1.7965956331206001 + mod2pi(5.6298669711442699e-3 * T) +
    mod2pi(2.5659491293243853e-6 * T2) +
    mod2pi(-5.7275888286280579e-10 * T3) +
    mod2pi(5.5166948773454099e-11 * T4);

  // Arguments of Delaunay
  let D = mod2pi(W1 - Ea + Math.PI);
  let F = mod2pi(W1 - W3);
  let L = mod2pi(W1 - W2);
  let Lp = mod2pi(Ea - pomp);

  let long = W1;
  long += -0.001995472498018293 * Math.sin(2 * F);
  long += 0.0001916628565478175 * Math.sin(-2 * F + L);
  long += 0.1097598086261916 * Math.sin(L);
  long += -0.0002186490808966586 * Math.sin(2 * F + L);
  long += 0.00372834182278019 * Math.sin(2 * L);
  long += 0.00017513318791757 * Math.sin(3 * L);
  long += -0.0007142342143774959 * Math.sin(-L + Lp);
  long += -0.003230883385671323 * Math.sin(Lp);
  long += -0.0005302909592585855 * Math.sin(L + Lp);
  long += -0.0006059594976151819 * Math.sin(D);
  long += 0.0009959815905878214 * Math.sin(2 * D - L - Lp);
  long += 0.0007986268729360748 * Math.sin(2 * D - Lp);
  long += 0.001026135054568928 * Math.sin(2 * D - 2 * L);
  long += 0.02223568023224499 * Math.sin(2 * D - L);
  long += 0.0002675059342607472 * Math.sin(2 * D - 2 * F);
  long += 0.01148966695626307 * Math.sin(2 * D);
  long += 0.0009306298945895796 * Math.sin(2 * D + L);
  long += 0.0001491896510579414 * Math.sin(4 * D - 2 * L);
  long += 0.0001863130931752139 * Math.sin(4 * D - L);
  long += T * (8.1293558048447e-06 * Math.sin(Lp));

  let lat = 0.08950261906476278 * Math.sin(F);
  lat += 0.004846651648159632 * Math.sin(-F + L);
  lat += 0.004897428574922555 * Math.sin(F + L);
  lat += 0.0001539752292512595 * Math.sin(-F + 2 * L);
  lat += 0.0003001576051004671 * Math.sin(F + 2 * L);
  lat += 0.0008075741060449063 * Math.sin(2 * D - F - L);
  lat += 0.0009671245654627556 * Math.sin(2 * D + F - L);
  lat += 0.003023552571339078 * Math.sin(2 * D - F);
  lat += 0.0005684958997727675 * Math.sin(2 * D + F);
  lat += 0.0001617202836489691 * Math.sin(2 * D - F + L);

  let r = 385000.529032284;
  r += -20905.35493520509 * Math.cos(L);
  r += -569.9251153350947 * Math.cos(2 * L);
  r += -129.6202221720506 * Math.cos(-L + Lp);
  r += 104.7552926742703 * Math.cos(L + Lp);
  r += 108.742701272463 * Math.cos(D);
  r += -152.1378094258907 * Math.cos(2 * D - L - Lp);
  r += -204.5861164608731 * Math.cos(2 * D - Lp);
  r += 246.1584748535579 * Math.cos(2 * D - 2 * L);
  r += -3699.110896398076 * Math.cos(2 * D - L);
  r += -2955.967557972414 * Math.cos(2 * D);
  r += -170.7330771247706 * Math.cos(2 * D + L);
  r *= ra0;

  let x = r * Math.cos(long) * Math.cos(lat);
  let y = r * Math.sin(long) * Math.cos(lat);
  let z = r * Math.sin(lat);

  // Precessed to J2000 mean ecliptic and equinox
  let p1 = 0.10180391e-4 * T + 0.47020439e-6 * T2 - 0.5417367e-9 * T3 - 0.2507948e-11 * T4 + 0.463486e-14 * T5;
  let q1 = -0.113469002e-3 * T + 0.12372674e-6 * T2 + 0.12654170e-8 * T3 - 0.1371808e-11 * T4 - 0.320334e-14 * T5;
  let sq = Math.sqrt(1 - p1 * p1 - q1 * q1);
  let p11 = 1 - 2 * p1 * p1;
  let p12 = 2 * p1 * q1;
  let p13 = 2 * p1 * sq;
  let p21 = p12;
  let p22 = 1 - 2 * q1 * q1;
  let p23 = -2 * q1 * sq;
  let p31 = -2 * p1 * sq;
  let p32 = 2 * q1 * sq;
  let p33 = 1 - 2 * p1 * p1 - 2 * q1 * q1;
  let x2000 = p11 * x + p12 * y + p13 * z;
  let y2000 = p21 * x + p22 * y + p23 * z;
  let z2000 = p31 * x + p32 * y + p33 * z;

  // Ecliptic longitude and latitude wrt J2000.0 ecliptic
  let lam2000 = Math.atan2(y2000, x2000);
  let bet2000 = Math.asin(z2000 / r);

  // Equatorial coordinates
  let cosEps = 0.9174821430652418;
  let sinEps = 0.397776969112606;
  let Yeq = cosEps * y2000 - sinEps * z2000;
  let Zeq = sinEps * y2000 + cosEps * z2000;

  // RA and DEC wrt J2000 mean equator and equinox
  let ra2000 = Math.atan2(Yeq, x2000);
  let dec2000 = Math.asin(Zeq / r);

  // Precessed to equinox and equator of date
  let p = precessionMatrix(0, T);
  let xp = p.p11 * x2000 + p.p12 * Yeq + p.p13 * Zeq;
  let yp = p.p21 * x2000 + p.p22 * Yeq + p.p23 * Zeq;
  let zp = p.p31 * x2000 + p.p32 * Yeq + p.p33 * Zeq;
  let ra = Math.atan2(yp, xp);
  let dec = Math.asin(zp / r);

  return {
    Xgeo: x2000,
    Ygeo: y2000,
    Zgeo: z2000,
    rGeo: r,
    lam2000,
    bet2000,
    ra2000,
    dec2000,
    ra,
    dec,
  };
}

export default planets;
