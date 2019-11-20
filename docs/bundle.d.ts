declare let col: number; // color
declare let tc: number; // ticks
declare let df: number; // difficulty
declare let scr: number; // score

declare const PI: number;
declare const abs: (v: number) => number;
declare const sin: (v: number) => number;
declare const cos: (v: number) => number;
declare const atan2: (y: number, x: number) => number;
declare const pow: (b: number, e: number) => number;
declare const sqrt: (v: number) => number;
declare const floor: (v: number) => number;
declare const round: (v: number) => number;
declare const ceil: (v: number) => number;

declare function clamp(v: number, low?: number, high?: number): number;
declare function wrap(v: number, low: number, high: number): number;
declare function range(v: number): number[];

// End game
declare function end(): void;

// Draw rectangle
declare function rect(
  x: number,
  y: number,
  width: number,
  height: number
): number;
declare function rect(x: number, y: number, size: VectorLike): number;
declare function rect(pos: VectorLike, width: number, height: number): number;
declare function rect(pos: VectorLike, size: VectorLike): number;

// Draw box (center-aligned rect)
declare function box(
  x: number,
  y: number,
  width: number,
  height: number
): number;
declare function box(x: number, y: number, size: VectorLike): number;
declare function box(pos: VectorLike, width: number, height: number): number;
declare function box(pos: VectorLike, size: VectorLike): number;

// Draw bar (angled rect)
declare function bar(
  x: number,
  y: number,
  length: number,
  thickness: number,
  rotate: number,
  centerPosRatio?: number
): number;
declare function bar(
  pos: VectorLike,
  length: number,
  thickness: number,
  rotate: number,
  centerPosRatio?: number
): number;

// Draw line
declare function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  thickness?: number
): number;
declare function line(
  x1: number,
  y1: number,
  p2: VectorLike,
  thickness?: number
): number;
declare function line(
  p1: VectorLike,
  x2: number,
  y2: number,
  thickness?: number
): number;
declare function line(
  p1: VectorLike,
  p2: VectorLike,
  thickness?: number
): number;

// Return Vector
declare function vec(x?: number | VectorLike, y?: number): Vector;

// Return random number
declare function rnd(lowOrHigh?: number, high?: number): number;
// Return random integer
declare function rndi(lowOrHigh?: number, high?: number): number;
// Return plus or minus random number
declare function rnds(lowOrHigh?: number, high?: number): number;

// Input
declare class inp {
  static p: Vector; // Pointer position
  static ip: boolean; // is pressed
  static ijp: boolean; // is just pressed
  static ijr: boolean; // is just released
}

// Play sound
// 'C'oin, 'L'aser, 'E'xplosion, 'P'ower-up, 'H'it, 'J'ump, 'S'elect, l'U'cky
declare function play(type: number);

declare interface Vector {
  x: number;
  y: number;
  constructor(x?: number | VectorLike, y?: number);
  set(x?: number | VectorLike, y?: number): this;
  add(v: VectorLike): this;
  sub(v: VectorLike): this;
  mul(v: number): this;
  div(v: number): this;
  clamp(xLow: number, xHigh: number, yLow: number, yHigh: number): this;
  wrap(xLow: number, xHigh: number, yLow: number, yHigh: number): this;
  addAngle(angle: number, value: number): this;
  swapXy(): this;
  normalize(): this;
  rotate(angle: number): this;
  getAngle(to?: VectorLike): number;
  distanceTo(to: VectorLike): number;
  isInRect(x: number, y: number, width: number, height: number): boolean;
  equals(other: VectorLike): boolean;
  floor(): this;
  round(): this;
  ceil(): this;
  length: number;
}

declare interface VectorLike {
  x: number;
  y: number;
}

declare const A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z: number;
