/**
 * Логика модуля для игры
 * @param {string} currentPlayer - Текущий игрок
 * @param {HTMLElement} board - Элемент доски для игры
 * @param {HTMLElement} result - Элемент для отображения результата игры
 */
export const Game = (currentPlayer, board, result,) => {
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
  let resultFlag = false;
  let cells = [];

  /**
   * Создает игровую доску
   */
  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => makeMove(i));
      board.appendChild(cell);
      cells.push(cell);
    }
  };
  
  /**
   * Начинает новую игру
   */
  const newGame = () => {
    cells.forEach((cell) => {
      cell.innerText = "";
    });
  
    resultFlag = false;
    result.textContent = '';
    currentPlayer = "X";
  };

  /**
   * Совершает ход
   * @param {number} index - Индекс ячейки
   */
  const makeMove = (index) => {
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

  /**
   * Проверяет, выполнено ли условие победы
   * @param {string} player - Игрок 
   */
  const checkWin = (player) => {
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

  
  /**
   * Проверяет, наступила ли ничья
   */
  const checkDraw = () => {
    for (let cell of cells) {
      if (cell.innerText === "") {
        return false;
      }
    }
  
    resultFlag = true;
    return true;
  }
  
  return {
    createBoard,
    newGame
  }
}