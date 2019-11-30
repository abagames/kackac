function title() {
  return "LLAND";
}

function description() {
  return `
[Hold] Thrust up
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
    m = range(9).map(i => {
      return { y: 90 - i, c: R };
    });
    y = 9;
    v = o = c = i = j = k = l = 0;
  }
  m.map((n, i) => {
    col = n.c;
    rect(wrap(i * 13 + o - 13, -13, 104), n.y, 13, 99);
  });
  col = G;
  p = box(25, y, 5, 5);
  if (l > 0) {
    if (inp.ip) {
      l = 0;
    } else {
      return;
    }
  }
  o -= df;
  c -= df;
  if (c < 0) {
    n = m[wrap(i, 0, 9)];
    n.y =
      k > 0
        ? 90
        : j == 1
        ? rnd(70, 90)
        : j == 0
        ? (z = rnd(40, 70))
        : rnd(40, 90);
    j--;
    k--;
    if (j < 0) {
      n.c = C;
      j = rndi(9, 12);
      k = 1;
    } else {
      n.c = R;
    }
    i++;
    c += 13;
  }
  if (inp.ijp) {
    play(H);
    v -= 0.4;
  }
  if (inp.ip) {
    v -= 0.2;
  }
  v += 0.1;
  v *= 0.99;
  if (y < 0 && v < 0) {
    v *= -1;
  }
  y += v * df;
  if (p & C) {
    play(S);
    scr++;
    l = 1;
    v = 0;
    y = z - 3;
    m.map(n => (n.c = R));
  } else if (p & R) {
    play(E);
    end();
  }
  col = T;
  if (rect(0, 0, 1, 99) & C) {
    play(E);
    end();
  }
}
