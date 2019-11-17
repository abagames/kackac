let l, r, a, m;

function update() {
  if (!tc) {
    r = vec(0, 99);
  }
  if (r.y > 98) {
    r = vec(rndi(10, 90), 0);
    l = 0;
    a = rnd(PI * 2);
    m = rnd(-0.1, 0.1) * df;
  }
  col = G;
  const p = vec(50, 70);
  rect(p, 7, 7);
  const b = p.getAngle(inp.p);
  p.addAngle(b, 15);
  col = B;
  bar(p, 9, 5, b + PI / 2);
  col = R;
  const c = bar(r, l, 4, a, 0);
  if (c & B) {
    play(C);
    r.y = 99;
  }
  if (c & G) {
    play(U);
  }
  l += df;
  r.y += df;
  a += m;
}
