// 2pi
const twoPi = 6.283185307179586;

// 1/pi
const f1opi = 0.3183098861837907;

const mod2pi = (x: number) => {
  return x - twoPi * Math.floor(0.5 * (x * f1opi + 1));
}

const degreesToRadians = (x: number) => {
  return x * (Math.PI / 180);
}

export {
  mod2pi,
  degreesToRadians,
}
