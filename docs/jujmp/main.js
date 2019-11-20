function title() {
  return "JUJMP";
}

function description() {
  return `
[Click/Tap]
 Jump
`;
}

function options() {
  return {
    isPlayingBgm: true,
    seed: 3,
    isCapturing: true
  };
}

let p, v, w, j, m, d;

function update() {
  if (!tc) {
    p = vec(50, 50);
    v = vec();
    w = [vec(50, 70)];
    j = m = d = 1;
  }
  p.add(v);
  v.y += inp.ip ? 0.05 : 0.1;
  const s = (p.y < 30 ? (30 - p.y) * 0.1 : 0) + df * 0.1;
  scr += s;
  if ((d -= s) < 0) {
    d = rnd(99);
    w.push(vec(rnd(99), -9));
  }
  p.y += s;
  col = B;
  w = w.filter(l => {
    l.y += s;
    box(l, 33, 7);
    return l.y < 99;
  });
  col = T;
  for (;;) {
    if (!box(p, 7, 7)) {
      break;
    }
    p.y--;
    v.set();
    m = 1;
  }
  col = G;
  box(p, 7, 7);
  if (inp.ijp) {
    play(J);
    v.x = j *= -1;
    v.y = -3 * m;
    m *= 0.7;
  }
  if (p.y > 99) {
    play(E);
    end();
  }
}
