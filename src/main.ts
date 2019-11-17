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
export let col: number;
export let tc: number;
export let df: number;

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
let score = 0;
let capitalLetterStrings: { [k: number]: string } = {};
type Rect = { pos: VectorLike; size: VectorLike; color: number };
let rects: Rect[];
let tmpRects: Rect[];

addGameScript();
loop.init(init, _update, {
  viewSize: { x: 100, y: 100 },
  bodyBackground: "#ddd",
  viewBackground: "#eee",
  isUsingVirtualPad: false
});

function init() {
  sss.init();
  showScript();
  addCapitalVariables();
  col = window["L"];
  terminal = new Terminal({ x: 16, y: 16 });
  initInGame();
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
  ticks = 0;
  score = 0;
}

function updateInGame() {
  terminal.clear();
  view.clear();
  update();
  terminal.draw();
}

function initTitle() {
  state = "title";
  ticks = 0;
}

function updateTitle() {
  if (input.isJustPressed) {
    initInGame();
  }
}

function initGameOver() {
  state = "gameOver";
  input.clearJustPressed();
  ticks = 0;
}

function updateGameOver() {
  if (ticks > 20 && input.isJustPressed) {
    initInGame();
  } else if (ticks > 300) {
    initTitle();
  }
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
