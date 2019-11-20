function title() {
  return "BALBOU";
}

function description() {
  return `
[Mouse/Touch]
 Move racket
`;
}

function options() {
  return {
    isPlayingBgm: true,
    isCapturing: true
  };
}

let b, x;

function update() {
  if (!tc) {
    b = [];
  }
  if (tc % 222 === 0) {
    b.push({ p: vec(50, 10), v: vec(rnds(0.5), 0) });
  }
  col = G;
  box((x = inp.p.x), 90, 20, 10);
  col = P;
  map(b, (c, i) => {
    const p = c.p;
    const v = c.v;
    p.add(v);
    v.y += 0.02 * df;
    v.mul(0.99);
    if (box(p, 5, 5) & G) {
      v.y = -2 * sqrt(df);
      v.x += (p.x - x) * 0.05;
      scr += pow(b.length, 2);
      play(C);
    }
    if (p.x < 0 || p.x > 99) {
      b.splice(i, 1);
    }
    if (p.y > 99) {
      play(U);
      end();
    }
  });
}
