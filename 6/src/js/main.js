import { Game } from "./game";

const result = document.querySelector("#result");
const attemptsText = document.querySelector("#attempts");

const game = Game(result, attemptsText)

document.querySelectorAll("#range").forEach((input) => { input.addEventListener("input", game.change) });
document.querySelector("#reset").addEventListener("click", game.reset);
document.querySelector("#submit").addEventListener("click", game.check);
