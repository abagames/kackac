function title() {
  return "3 ARMS";
}

function description() {
  return `
[Mouse/Touch]
 Move bar
`;
}

function options() {
  return {
    isPlayingBgm: true,
    isCapturing: true
  };
}

let a, x;

function update() {
  const r = 0.01;
  if (!tc) {
    a = range(3).map(_ => [-PI / 2, 0, rnds(r)]);
    x = 50;
  }
  a.map((b, i) => {
    col = [R, G, B][i];
    bar(50, 50, 16, 3 + i, b[0], -i);
    b[0] += b[1] += b[2] / (4 - i);
    b[1] *= 0.95;
    if (rnd() < r) {
      b[2] = rnds(r) * df;
    }
  });
  col = Y;
  const p = clamp(inp.p.x, 0, 99);
  if (line(p, 58, x, 58)) {
    play(E);
    end();
  }
  scr += abs(p - x);
  x += (p - x) / 7;
}
