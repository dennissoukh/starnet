// 2 pi
let twoPi = 6.283185307179586;

// 1/pi
let f1opi = 0.3183098861837907;

const modulus = (x: number, y: number) => {
  return (x - y * Math.floor(x / y));
}

// Solve Kepler's equation
const kepler = (M: number, e: number) => {
  let n2pi = Math.floor(M / (2 * Math.PI) + 0.5) * (2 * Math.PI);
  let Mp = M - n2pi;

  // Solve Kepler's equation E - e sin E = M using Newton's iteration method. Initial guess
  let E = Mp;

  // Another initial guess for very eccentric orbit
  if (e > 0.8) { E = Math.PI; }

  let E0 = E * 1.01;
  let tol = 1.e-15;
  let iter = 0, maxit = 100;

  while (Math.abs(E - E0) > tol && iter < maxit) {
    E0 = E;
    E = E0 - (E0 - e * Math.sin(E0) - Mp) / (1.0 - e * Math.cos(E0));
    iter++;
  }

  if (iter === maxit) {
    // Newton's iteration doesn't converge after 100 iterations, use bisection instead
    iter = 0; maxit = 60;

    if (Mp > 0.0) {
      E0 = 0.0; E = Math.PI;
    } else {
      E = 0.0; E0 = -Math.PI;
    }

    while (E - E0 > tol && iter < maxit) {
      let E1 = 0.5 * (E + E0);
      let z = E1 - e * Math.sin(E1) - Mp;
      if (z > 0.0) {
        E = E1;
      } else {
        E0 = E1;
      }
      iter++;
    }
  }

  return E;
}

const mod2pi = (x: number) => {
  return (x - twoPi * Math.floor(0.5 * (x * f1opi + 1)));
}

const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
}

export {
  modulus,
  kepler,
  mod2pi,
  degreesToRadians,
}
