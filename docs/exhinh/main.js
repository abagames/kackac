function title() {
  return "EXHINH";
}

function description() {
  return `
[Hold]    Exhale
[Release] Inhale
`;
}

function options() {
  return {
    isPlayingBgm: true
  };
}

function update() {
  if (!tc) {
    d = [Y, L, R].map(c => {
      return {
        p: vec(rnd(9, 90), rnd(9, 90)),
        v: vec(1).rotate(rnd(PI * 2)),
        c,
        s: 1
      };
    });
    z = 5;
    r = 1;
    t = 0;
  }
  if (inp.ijp) {
    r = 1;
  }
  d = d.filter(e => {
    c = e.c;
    p = e.p;
    v = e.v;
    col = c;
    l = box(p, 7, 7);
    v.mul(e.s);
    p.add(v);
    if (c == Y) {
      y = p;
    } else if (c == L) {
      b = p;
    } else if (c === C) {
      if (!inp.ip) {
        f = vec(b).sub(p);
        f.div(pow(f.length, 2)).mul(7);
        v.add(f);
      }
      if (l & L) {
        play(S);
        scr += r++;
        return false;
      }
      if (l & R) {
        play(U);
        end();
      }
    }
    a = -1;
    if (p.x < 0) {
      a = PI;
    }
    if (p.x > 99) {
      a = 0;
    }
    if (p.y < 0) {
      a = (PI / 2) * 3;
    }
    if (p.y > 99) {
      a = PI / 2;
    }
    if (a >= 0) {
      m = v.getAngle();
      o = wrap(m - a, -PI, PI);
      if (abs(o) < PI / 2) {
        l = v.length;
        e.v.set().addAngle(m + PI - o * 2 + rnds(0.5), l);
      }
    }
    return true;
  });
  if ((inp.ip && tc % (floor(10 / df) + 1) == 0 && tc > 20) || t > 300) {
    play(L);
    d.push({
      p: vec(y),
      v: vec(rnd(4)).rotate(rnd(PI * 2)),
      c: C,
      s: 0.9
    });
    t = 0;
  }
  t++;
}
