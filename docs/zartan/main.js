function title() {
  return "ZARTAN";
}

function description() {
  return `
[Hold] 
 Hold rope
`;
}

function options() {
  return {
    isPlayingBgm: true,
    isCapturing: true
  };
}

function update() {
  if (!tc) {
    n = [];
    p = vec(99, (d = 9));
    v = vec();
    a = z = null;
  }
  s = (p.x > 30 ? (p.x - 30) * 0.1 : 0) + df * 0.1;
  scr += s;
  p.x -= s;
  v.y += 0.02;
  if (v.y < 0 && p.y < 0) {
    v.y *= -1;
  }
  if (p.y > 99) {
    play(U);
    end();
  }
  v.mul(0.99);
  p.add(v);
  col = G;
  box(p, 7, 7);
  o = 99;
  n.map(m => {
    q = abs(m.y - p.y);
    if (m.x > p.x && q < o) {
      o = q;
      z = m;
    }
  });
  col = C;
  if (z) {
    box(z, 9, 9);
    if (inp.ijp) {
      play(S);
      a = z;
    }
  }
  if (inp.ip && a) {
    b = vec(a)
      .sub(p)
      .div(199);
    v.add(b);
    line(p, a);
    if (a.x < 0) {
      a = null;
    }
  }
  if (inp.ijr) {
    a = null;
  }
  if ((d -= s) < 0) {
    d += rnd(9, 66);
    n.push(vec(99, rnd(66)));
  }
  col = L;
  n = n.filter(m => {
    m.x -= s;
    box(m, 5, 5);
    return m.x > 0;
  });
}
