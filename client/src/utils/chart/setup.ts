const setup = (
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number
) => {
  const r = .47 * Math.max(length, width);
  const cx = .5 * length;
  const cy = .5 * length;

  ctx.clearRect(0, 0, length, width);

  // Draw sky as a filled circle
  ctx.fillStyle = '#D9D9E5';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Draw outline of chart
  ctx.strokeStyle = '#999';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();

  // Draw azimuth labels in increments of 10
  let dA = 10;
  let n = 360 / dA;
  let dArad = dA * Math.PI / 180;

  ctx.font = '14px Switzer-Variable';
  ctx.fillStyle = '#999';

  for (let i = 0; i < n; i++) {
    let deg = i * dA;
    deg -= 360 * Math.floor(deg / 360);

    let A = i * dArad - 0;
    let cosA = Math.cos(A), sinA = Math.sin(A);
    let x1 = cx - r * sinA;
    let y1 = cy - r * cosA;
    let x2 = cx - 1.02 * r * sinA;
    let y2 = cy - 1.02 * r * cosA;
    let x3, y3;

    if (deg < 90 || deg > 270) {
      x3 = cx - 1.03 * r * sinA;
      y3 = cy - 1.03 * r * cosA;
    } else {
      x3 = cx - 1.06 * r * sinA;
      y3 = cy - 1.06 * r * cosA;
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    let char = i * dA;
    let txt = `${char}°`;

    if (char === 0) {
      txt = 'N';
    } else if (char === 90) {
      txt = 'E';
    } else if (char === 180) {
      txt = 'S';
    } else if (char === 270) {
      txt = 'W';
    }

    ctx.save();
    ctx.translate(x3, y3);

    if (deg < 90 || deg > 270) {
      ctx.rotate(-A);
    } else {
      ctx.rotate(Math.PI - A);
    }

    let w = ctx.measureText(txt).width;

    ctx.fillText(txt, -w * 0.5, 0);
    ctx.restore();
  }
}

export default setup;
