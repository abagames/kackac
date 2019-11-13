import { Vector, VectorLike } from "./vector";
import { Random } from "./random";
import { isInRange } from "./math";

export const pos = new Vector();
export const move = new Vector();
export const pressedPos = new Vector();
export const targetPos = new Vector();
export let isPressed = false;
export let isJustPressed = false;
export let isJustReleased = false;

type Options = {
  isDebugMode?: boolean;
  anchor?: Vector;
  padding?: Vector;
  onPointerDownOrUp?: Function;
};

let defaultOptions: Options = {
  isDebugMode: false,
  anchor: new Vector(),
  padding: new Vector(),
  onPointerDownOrUp: undefined
};
let screen: HTMLElement;
let pixelSize: Vector;
let options: Options;

const prevPos = new Vector();
const debugRandom = new Random();
const debugPos = new Vector();
const debugMoveVel = new Vector();
let debugIsDown = false;
let cursorPos = new Vector(-9999, -9999);
let isDown = false;
let isClicked = false;
let isReleased = false;
let isResettingTargetPos = false;

export function init(
  _screen: HTMLElement,
  _pixelSize: Vector,
  _options?: Options
) {
  options = { ...defaultOptions, ..._options };
  screen = _screen;
  pixelSize = new Vector(
    _pixelSize.x + options.padding.x * 2,
    _pixelSize.y + options.padding.y * 2
  );
  targetPos.set(pixelSize.x / 2, pixelSize.y / 2);
  if (options.isDebugMode) {
    debugPos.set(pixelSize.x / 2, pixelSize.y / 2);
  }
  document.addEventListener("mousedown", e => {
    onDown(e.pageX, e.pageY);
  });
  document.addEventListener("touchstart", e => {
    onDown(e.touches[0].pageX, e.touches[0].pageY);
  });
  document.addEventListener("mousemove", e => {
    onMove(e.pageX, e.pageY);
  });
  document.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
      onMove(e.touches[0].pageX, e.touches[0].pageY);
    },
    { passive: false }
  );
  document.addEventListener("mouseup", e => {
    onUp(e);
  });
  document.addEventListener(
    "touchend",
    e => {
      e.preventDefault();
      (e.target as any).click();
      onUp(e);
    },
    { passive: false }
  );
}

export function update() {
  calcPointerPos(cursorPos.x, cursorPos.y, pos);
  if (options.isDebugMode && !pos.isInRect(0, 0, pixelSize.x, pixelSize.y)) {
    updateDebug();
    pos.set(debugPos);
    isJustPressed = !isPressed && debugIsDown;
    isJustReleased = isPressed && !debugIsDown;
    isPressed = debugIsDown;
  } else {
    isJustPressed = !isPressed && isClicked;
    isJustReleased = isPressed && isReleased;
    isPressed = isDown;
  }
  if (isJustPressed) {
    pressedPos.set(pos);
    prevPos.set(pos);
  }
  move.set(pos.x - prevPos.x, pos.y - prevPos.y);
  prevPos.set(pos);
  if (isResettingTargetPos) {
    targetPos.set(pos);
  } else {
    targetPos.add(move);
  }
  isClicked = isReleased = false;
}

export function clearJustPressed() {
  isJustPressed = false;
  isPressed = true;
}

export function resetPressedPointerPos(ratio = 1) {
  pressedPos.x += (pos.x - pressedPos.x) * ratio;
  pressedPos.y += (pos.y - pressedPos.y) * ratio;
}

export function setTargetPos(v: VectorLike) {
  targetPos.set(v);
}

function calcPointerPos(x: number, y: number, v: Vector) {
  if (screen == null) {
    return;
  }
  v.x =
    ((x - screen.offsetLeft) / screen.clientWidth + options.anchor.x) *
      pixelSize.x -
    options.padding.x;
  v.y =
    ((y - screen.offsetTop) / screen.clientHeight + options.anchor.y) *
      pixelSize.y -
    options.padding.y;
}

function updateDebug() {
  if (debugMoveVel.length > 0) {
    debugPos.add(debugMoveVel);
    if (
      !isInRange(debugPos.x, -pixelSize.x * 0.1, pixelSize.x * 1.1) &&
      debugPos.x * debugMoveVel.x > 0
    ) {
      debugMoveVel.x *= -1;
    }
    if (
      !isInRange(debugPos.y, -pixelSize.y * 0.1, pixelSize.y * 1.1) &&
      debugPos.y * debugMoveVel.y > 0
    ) {
      debugMoveVel.y *= -1;
    }
    if (debugRandom.get() < 0.05) {
      debugMoveVel.set(0);
    }
  } else {
    if (debugRandom.get() < 0.1) {
      debugMoveVel.set(0);
      debugMoveVel.addAngle(
        debugRandom.get(Math.PI * 2),
        (pixelSize.x + pixelSize.y) * debugRandom.get(0.01, 0.03)
      );
    }
  }
  if (debugRandom.get() < 0.05) {
    debugIsDown = !debugIsDown;
  }
}

function onDown(x: number, y: number) {
  cursorPos.set(x, y);
  isDown = isClicked = true;
  isResettingTargetPos = false;
  if (options.onPointerDownOrUp != null) {
    options.onPointerDownOrUp();
  }
}

function onMove(x: number, y: number) {
  cursorPos.set(x, y);
  if (!isDown) {
    isResettingTargetPos = true;
  }
}

function onUp(e: Event) {
  isDown = false;
  isReleased = true;
  isResettingTargetPos = false;
  if (options.onPointerDownOrUp != null) {
    options.onPointerDownOrUp();
  }
}
