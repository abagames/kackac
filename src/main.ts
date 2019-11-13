import * as loop from "./loop";
import * as view from "./view";
import * as text from "./text";
import { Terminal } from "./terminal";
import * as input from "./input";
import * as pointer from "./pointer";
import { Vector, VectorLike } from "./vector";
import { Random } from "./random";
declare const sss;
declare const Terser;

export function rect(x: number, y: number, width: number, height: number) {
  view.context.fillStyle = "black";
  view.context.fillRect(
    Math.floor(x),
    Math.floor(y),
    Math.floor(width),
    Math.floor(height)
  );
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

addGameScript();
loop.init(init, _update, {
  viewSize: { x: 100, y: 100 },
  bodyBackground: "#ddd",
  viewBackground: "#eee",
  isUsingVirtualPad: false
});

function init() {
  sss.init();
  terminal = new Terminal({ x: 16, y: 16 });
  initInGame();
}

function _update() {
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
  console.log(update);
  console.log(
    Terser.minify(update.toString(), { mangle: false })
      .code.slice(18, -1)
      .replace(/(var |let |const )/g, "")
  );
}
