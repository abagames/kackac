function title() {
  return "GOLFME";
}

function description() {
  return `
[Press]   Change angle
[Release] Jump
`;
}

function options() {
  return {
    viewSize: { x: 200, y: 100 },
    isPlayingBgm: true
  };
}

let p, j, a, v, h, i;

function update() {
  if (!tc) {
    p = vec(50, 85);
    j = a = h = i = 0;
  }
  if (h + i <= 0) {
    h = 199;
    i = rnd(50, 150);
  }
  col = B;
  rect(0, 90, h, 9);
  rect(h + i, 90, 200, 9);
  col = G;
  const c = box(p, 9, 9);
  if (p.x < 0 || p.y > 99) {
    play(U);
    end();
  }
  if (j) {
    p.add(v);
    v.y += 0.1;
    if (c & B) {
      j = a = 0;
      p.y = 85;
    }
  } else {
    if (inp.ip) {
      a -= 0.05;
      bar(p, 20, 3, a, 0);
    }
    if (inp.ijr) {
      play(J);
      j = 1;
      v = vec(4).rotate(a);
    }
  }
  const s = clamp(p.x - 50, 0, 99) * 0.1 + df;
  p.x -= s;
  h -= s;
  scr += s;
}
