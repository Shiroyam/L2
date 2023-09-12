const board = document.querySelector("#board");
const reset = document.querySelector("#reset");
const result = document.querySelector("#result-text");

let resultFlag = false;
let currentPlayer = "X";
let cells = [];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const createBoard = () => {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }
};

createBoard();

// Ресетнуть игру
const newGame = () => {
  cells.forEach((cell) => {
    cell.innerText = "";
  });

  resultFlag = false;
  result.textContent = '';
  currentPlayer = "X";
};

reset.addEventListener("click", newGame);

// Сделать ход
function makeMove(index) {
  if (cells[index].innerText === "" && !resultFlag) {
    cells[index].innerText = currentPlayer;
    cells[index].classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
      cells.forEach((cell) => {
        cell.removeEventListener("click", makeMove);
      });

      result.textContent = `Игрок ${currentPlayer} победил`
      return;
    }

    if (checkDraw()) {
      cells.forEach((cell) => {
        cell.removeEventListener("click", makeMove);
      });

      result.textContent = `Ничья`
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Проверка на победу
function checkWin(player) {
  for (let combination of winningCombinations) {
    if (
      cells[combination[0]].innerText === player &&
      cells[combination[1]].innerText === player &&
      cells[combination[2]].innerText === player
    ) {
      resultFlag = true;
      return true;
    }
  }

  return false;
}

// Проверка на ничью
function checkDraw() {
  for (let cell of cells) {
    if (cell.innerText === "") {
      return false;
    }
  }

  resultFlag = true;
  return true;
}
