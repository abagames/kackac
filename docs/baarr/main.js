function title() {
  return "BAARR";
}

function description() {
  return `
[Click/Tap]
 Sting
`;
}

function options() {
  return {
    isPlayingBgm: true
  };
}

let player;

function update() {
  if (!tc) {
    b = [];
    d = y = p = j = 0;
  }
  if (j === 0 && inp.ip) {
    play(H);
    j = c = 1;
  }
  col = C;
  if (j > 0) {
    if (j < 10) {
      col = B;
    }
    if (j++ > 30) {
      j = 0;
    }
  } else {
    p += 0.1;
  }
  box(
    50 + sin(p) * 30,
    -40 + (j < 1 ? 0 : j < 10 ? j * 10 : (30 - j) * 5),
    5,
    99
  );
  s = (y > 50 ? (y - 50) * 0.1 : 0) + df * 0.1 + j * 0.03;
  y = 99;
  col = R;
  b = b.filter(a => {
    a.p.x = a.c + sin((a.a += a.v)) * a.r;
    a.p.y -= s;
    if (a.p.y < y) {
      y = a.p.y;
    }
    if (a.p.y < 0) {
      play(U);
      end();
    }
    if (box(a.p, a.w, 7) & B) {
      play(L);
      scr += c++;
    } else {
      return true;
    }
  });
  if ((d -= s) < 0) {
    z = 105;
    range(rndi(1, 5)).map(i => {
      b.push({
        p: vec(0, z),
        c: rnd(30, 70),
        a: rnd(PI * 2),
        v: rnd(0.01, 0.1),
        r: rnd(9, 30),
        w: rnd(20, 40)
      });
      z += 7;
      d += 10;
    });
    d += rnd(99);
  }
}
