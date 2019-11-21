function title() {
  return "ROTWAL";
}

function description() {
  return `
[Mouse/Touch]
 Rotate wall
`;
}

function options() {
  return {
    isPlayingBgm: true
  };
}

function update() {
  if (!tc) {
    r = vec(0, 99);
  }
  if (r.y > 98) {
    r = vec(rnd(9, 90));
    l = 0;
    a = rnd(PI * 2);
    m = rnds(0.1) * df;
  }
  col = G;
  box((p = vec(50, 70)), 7, 7);
  p.addAngle((b = p.getAngle(inp.p)), 15);
  col = B;
  bar(p, 9, 5, b + PI / 2);
  col = R;
  c = bar(r, l, 4, a, 0);
  if (c & B) {
    play(C);
    r.y = 99;
    scr++;
  }
  if (c & G) {
    play(U);
    end();
  }
  l += df;
  r.y += df;
  a += m;
}
