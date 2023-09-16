import { Game } from "./game";

const board = document.querySelector("#board");
const reset = document.querySelector("#reset");
const result = document.querySelector("#result-text");

let currentPlayer = "X"

const game = Game(currentPlayer, board, result)

game.createBoard();
reset.addEventListener("click", game.newGame);