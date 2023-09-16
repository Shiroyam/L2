import { Tetris } from "./tetris"

const score = document.querySelector("#score");
const canvas = document.querySelector("#field");
const cols = 10;
const rows = 20;
const board = [];

const colors = [
  "rgb(25, 118, 210)",
  "rgb(25, 118, 210)",
  "rgb(25, 118, 210)",
  "rgb(25, 118, 210)",
  "rgb(25, 118, 210)",
  "rgb(25, 118, 210)",
  "rgb(25, 118, 210)",
];

const shapes = [
  [1, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [0, 1, 1, 0, 1, 1],
  [0, 1, 0, 0, 1, 1, 1],
];

const tetris = Tetris(canvas, cols, rows, board, shapes, colors, score)

document.querySelector("#left").addEventListener("click", () => tetris.moveLeft());
document.querySelector("#right").addEventListener("click", () => tetris.moveRight());
document.querySelector("#bottom").addEventListener("click", () => tetris.moveBottom());
document.querySelector("#rotate").addEventListener("click", () => tetris.moveRotate());
document.querySelector("#top").addEventListener("click", () => tetris.moveRotate());
document.querySelector("#start").addEventListener("click",() =>  tetris.start());