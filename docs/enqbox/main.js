function title() {
  return "ENQBOX";
}

function description() {
  return `
[Hold]
 Rotate reverse
`;
}

function options() {
  return {
    isPlayingBgm: true
  };
}

function update() {
  if (!tc) {
    r = d = h = 0;
    b = vec(50, 50);
    v = vec();
  }
  s = 0.05 * df;
  r += inp.ip ? s : -s;
  [R, G, B, P].map((c, i) => {
    if (h != i) {
      a = r + (i * PI) / 2;
      p = vec(50, 50).addAngle(a, 30);
      col = c;
      a += PI / 2;
      bar(p, 50, 5, a);
      if (d & c) {
        f = vec(v).rotate(-a);
        f.x = 0;
        f.y = clamp(f.y * -2.7, 1, 4);
        f.rotate(a);
        v.add(f);
        f.normalize();
        col = T;
        for (; box(b, 7, 7) & c; b.add(f));
        h = i;
        play(C);
        scr++;
      }
    }
  });
  b.add(v);
  v.y += 0.02 * df;
  v.mul(0.99);
  col = C;
  d = box(b, 7, 7);
  if (!b.isInRect(0, 0, 99, 99)) {
    play(E);
    end();
  }
}
