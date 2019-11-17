import * as loop from "./loop";
import * as view from "./view";
import * as text from "./text";
import { Terminal } from "./terminal";
import * as input from "./input";
import * as pointer from "./pointer";
import { Vector, VectorLike } from "./vector";
import { Random } from "./random";
import { clamp } from "./math";
declare const sss;
declare const Terser;

export { clamp, wrap, isInRange, map } from "./math";
export const PI = Math.PI;
export const abs = Math.abs;
export const sin = Math.sin;
export const cos = Math.cos;
export const atan2 = Math.atan2;
export const floor = Math.floor;
export const round = Math.round;
export const ceil = Math.ceil;
export let col: number;
export let tc: number;
export let df: number;
export let scr = 0;

export function end() {
  initGameOver();
}

export function rect(
  x: number | VectorLike,
  y: number | VectorLike,
  width?: number | VectorLike,
  height?: number
) {
  if (typeof x === "number") {
    if (typeof y === "number") {
      if (typeof width === "number") {
        return addRect(x, y, width, height);
      } else {
        return addRect(x, y, width.x, width.y);
      }
    } else {
      throw "invalid params";
    }
  } else {
    if (typeof y === "number") {
      if (typeof width === "number") {
        return addRect(x.x, x.y, y, width);
      } else {
        throw "invalid params";
      }
    } else {
      return addRect(x.x, x.y, y.x, y.y);
    }
  }
}

export function bar(
  x: number | VectorLike,
  y: number,
  length: number,
  thickness: number,
  rotate = 0.5,
  centerPosRatio = 0.5
) {
  if (typeof x !== "number") {
    centerPosRatio = rotate;
    rotate = thickness;
    thickness = length;
    length = y;
    y = x.y;
    x = x.x;
  }
  const t = Math.floor(clamp(thickness, 3, 10));
  const l = new Vector(length).rotate(rotate);
  const lx = Math.abs(l.x);
  const ly = Math.abs(l.y);
  const rn = clamp(Math.ceil(lx > ly ? lx / t : ly / t) + 1, 3, 99);
  const p = new Vector(x - l.x * centerPosRatio, y - l.y * centerPosRatio);
  l.div(rn - 1);
  let collision = 0;
  for (let i = 0; i < rn; i++) {
    collision |= addRect(p.x, p.y, thickness, thickness, true);
    p.add(l);
  }
  concatTmpRects();
  return collision;
}

export function vec(x?: number | VectorLike, y?: number) {
  return new Vector(x, y);
}

export function rnd(lowOrHigh?: number, high?: number) {
  return random.get(lowOrHigh, high);
}

export function rndi(lowOrHigh: number, high?: number) {
  return random.getInt(lowOrHigh, high);
}

export function rnds() {
  return random.getPlusOrMinus();
}

export class inp {
  static p = new Vector();
  static ip = false;
  static ijp = false;
  static ijr = false;
}

export function play(type: number) {
  sss.play(capitalLetterStrings[type]);
}

declare function title();
declare function description();
declare function options();
declare function update();
type State = "title" | "inGame" | "gameOver";
let state: State;
let updateFunc = {
  title: updateTitle,
  inGame: updateInGame,
  gameOver: updateGameOver
};
let terminal: Terminal;
let random = new Random();
let ticks = 0;
let hiScore = 0;
let capitalLetterStrings: { [k: number]: string } = {};
type Rect = { pos: VectorLike; size: VectorLike; color: number };
let rects: Rect[];
let tmpRects: Rect[];
let isNoTitle = true;
let seed = 0;

addGameScript();
window.addEventListener("load", onLoad);

function onLoad() {
  let loopOptions: any = {
    viewSize: { x: 100, y: 100 },
    bodyBackground: "#ddd",
    viewBackground: "#eee",
    isUsingVirtualPad: false
  };
  if (typeof options !== "undefined" && options() != null) {
    if (options().isCapturing) {
      loopOptions.isCapturing = true;
    }
    if (options().seed != null) {
      seed = options().seed;
    }
  }
  loop.init(init, _update, loopOptions);
}

function init() {
  if (typeof description !== "undefined" && description() != null) {
    isNoTitle = false;
    seed += getHash(description());
  }
  if (typeof title !== "undefined" && title() != null) {
    isNoTitle = false;
  }
  sss.init(seed);
  showScript();
  addCapitalVariables();
  col = window["L"];
  terminal = new Terminal({ x: 16, y: 16 });
  if (isNoTitle) {
    initInGame();
    ticks = 0;
  } else {
    initTitle();
  }
}

function _update() {
  rects = [];
  tmpRects = [];
  tc = ticks;
  df = ticks / 3600 + 1;
  inp.p = pointer.pos;
  inp.ip = input.isPressed;
  inp.ijp = input.isJustPressed;
  inp.ijr = input.isJustReleased;
  updateFunc[state]();
  ticks++;
}

function initInGame() {
  state = "inGame";
  ticks = -1;
  if (scr > hiScore) {
    hiScore = scr;
  }
  scr = 0;
}

function updateInGame() {
  terminal.clear();
  view.clear();
  update();
  drawScore();
  terminal.draw();
}

function initTitle() {
  state = "title";
  ticks = -1;
  terminal.clear();
  view.clear();
}

function updateTitle() {
  if (ticks === 0) {
    drawScore();
    if (typeof title !== "undefined" && title() != null) {
      terminal.print(title(), Math.floor(16 - title().length) / 2, 3);
    }
    terminal.draw();
  }
  if (ticks === 30 || ticks == 40) {
    if (typeof description !== "undefined" && description() != null) {
      description()
        .split("\n")
        .forEach((l, i) => {
          terminal.print(l, 1, 7 + i);
        });
      terminal.draw();
    }
  }
  if (input.isJustPressed) {
    initInGame();
  }
}

function initGameOver() {
  state = "gameOver";
  input.clearJustPressed();
  ticks = -1;
  terminal.print("GAME OVER", 3, 7);
  terminal.draw();
}

function updateGameOver() {
  if (ticks > 20 && input.isJustPressed) {
    initInGame();
  } else if (ticks === 500 && !isNoTitle) {
    initTitle();
  }
  if (ticks === 10) {
    terminal.print("GAME OVER", 3, 7);
    terminal.draw();
  }
}

function drawScore() {
  terminal.print(`${scr}`, 0, 0);
  const hs = `HI ${hiScore}`;
  terminal.print(hs, 16 - hs.length, 0);
}

function addGameScript() {
  let gameName = window.location.search.substring(1);
  gameName = gameName.replace(/\W/g, "");
  document.title = gameName;
  const script = document.createElement("script");
  script.setAttribute("src", `${gameName}.js`);
  document.head.appendChild(script);
}

function showScript() {
  const minifiedCode = Terser.minify(update.toString(), { mangle: false })
    .code.slice(18, -1)
    .replace(/(var |let |const )/g, "");
  console.log(minifiedCode);
  console.log(`${minifiedCode.length} letters`);
}

function addCapitalVariables() {
  let v = 1;
  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    window[String.fromCharCode(i)] = v;
    capitalLetterStrings[v] = String.fromCharCode(
      i - "A".charCodeAt(0) + "a".charCodeAt(0)
    );
    v <<= 1;
  }
}

function setFillStyleFromCol() {
  const fill = capitalLetterStrings[col];
  const f = text.rgbObjects[text.colorChars.indexOf(fill)];
  view.context.fillStyle = `rgb(${f.r},${f.g},${f.b})`;
}

function addRect(
  x: number,
  y: number,
  width: number,
  height: number,
  isAddingToTmp = false
) {
  const pos = { x: Math.floor(x - width / 2), y: Math.floor(y - height / 2) };
  const size = { x: Math.floor(width), y: Math.floor(height) };
  let rect = { pos, size, color: col };
  const collision = checkRects(rect);
  (isAddingToTmp ? tmpRects : rects).push(rect);
  setFillStyleFromCol();
  view.context.fillRect(pos.x, pos.y, size.x, size.y);
  return collision;
}

function concatTmpRects() {
  rects = rects.concat(tmpRects);
  tmpRects = [];
}

function checkRects(rect: Rect) {
  let collision = 0;
  rects.forEach(r => {
    if (testCollision(rect, r)) {
      collision |= r.color;
    }
  });
  return collision;
}

function testCollision(r1: Rect, r2: Rect) {
  const ox = r2.pos.x - r1.pos.x;
  const oy = r2.pos.y - r1.pos.y;
  return -r2.size.x < ox && ox < r1.size.x && -r2.size.y < oy && oy < r1.size.y;
}

function getHash(v: string) {
  let hash = 0;
  for (let i = 0; i < v.length; i++) {
    const chr = v.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}
