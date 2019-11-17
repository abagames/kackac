declare let col: number;
declare let tc: number;
declare let df: number;

declare function rect(
  x: number,
  y: number,
  width: number,
  height: number
): number;

declare function rect(x: number, y: number, size: VectorLike): number;

declare function rect(pos: VectorLike, width: number, height: number): number;

declare function rect(pos: VectorLike, size: VectorLike): number;

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

declare const PI: number;
declare const abs: (x: number) => number;
declare const sin: (x: number) => number;
declare const cos: (x: number) => number;
declare const atan2: (y: number, x: number) => number;
declare function clamp(v: number, low?: number, high?: number): number;
declare function wrap(v: number, low: number, high: number): number;
declare function isInRange(v: number, low: number, high: number): boolean;
declare function map(
  v: any[] | number,
  func: (v: any, i: number) => any
): any[];

declare function vec(x?: number | VectorLike, y?: number): Vector;

declare function rnd(lowOrHigh?: number, high?: number): number;
declare function rndi(lowOrHigh: number, high?: number): number;
declare function rnds(): number;

declare class inp {
  static p: Vector;
  static ip: boolean;
  static ijp: boolean;
  static ijr: boolean;
}

declare function play(type: number);

declare interface VectorLike {
  x: number;
  y: number;
}

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
