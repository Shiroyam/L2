/**
 * Логика модуля для игры в тетрис
 * @param {HTMLCanvasElement} canvas - Элемент холста для отрисовки игры
 * @param {number} cols - Количество колонок в игровом поле
 * @param {number} rows - Количество строк в игровом поле
 * @param {number[][]} board - Игровое поле
 * @param {number[][][]} shapes - Фигуры для игры
 * @param {string[]} colors - Цвета фигур
 * @param {HTMLElement} score - Элемент для отображения счета игры
 */
export const Tetris = (canvas, cols, rows, board, shapes, colors, score) => {
  const context = canvas.getContext("2d")
  const width = canvas.width;
  const height = canvas.height;
  const blockWidth = width / cols;
  const blockHeight = height / rows;

  let current;
  let currentX;
  let currentY;
  let lose;
  let freezed;

   /**
   * Создает новую фигуру
   */
  const newShape = () => {
    const id = Math.floor(Math.random() * shapes.length);
    const shape = shapes[id];

    current = [];
    for (let y = 0; y < 4; ++y) {
      current[y] = [];
      for (let x = 0; x < 4; ++x) {
        let i = 4 * y + x;
        if (typeof shape[i] != "undefined" && shape[i]) {
          current[y][x] = id + 1;
        } else {
          current[y][x] = 0;
        }
      }
    }

    freezed = false;

    currentX = 5;
    currentY = 0;
  };

  /**
   * Создает игровое поле
   */
  const init = () => {
    for (let y = 0; y < rows; ++y) {
      board[y] = [];
      for (let x = 0; x < cols; ++x) {
        board[y][x] = 0;
      }
    }
  };

  /**
   * Удаляет заполненные линии из игрового поля
   */
  const removeLines = () => {
    for (let y = rows - 1; y >= 0; --y) {
      let rowFilled = true;
      
      for (let x = 0; x < cols; ++x) {
        if (board[y][x] == 0) {
          rowFilled = false;
          break;
        }
      }

      if (rowFilled) {
        for (let yy = y; yy > 0; --yy) {
          for (let x = 0; x < cols; ++x) {
            board[yy][x] = board[yy - 1][x];
          }
        }

        score.textContent = Number(score.textContent) + 1;
        ++y;
      }
    }
  };

  /**
   * Фиксирует текущую фигуру на поле
   */
  const freeze = () => {
    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        if (current[y][x]) {
          board[y + currentY][x + currentX] = current[y][x];
        }
      }
    }

    freezed = true;
  };

  /**
   * Поворачивает фигуру
   * @param {number[][]} current - Текущая фигура.
   */
  const rotate = (current) => {
    let newCurrent = [];

    for (let y = 0; y < 4; ++y) {
      newCurrent[y] = [];

      for (let x = 0; x < 4; ++x) {
        newCurrent[y][x] = current[3 - x][y];
      }
    }

    return newCurrent;
  };

  /**
   * Проверяет, является ли текущая позиция фигуры допустимой
   * @param {number} offsetX - Смещение по оси X
   * @param {number} offsetY - Смещение по оси Y
   * @param {number[][]} newCurrent - Новая текущая фигура
   */
  const valid = (offsetX, offsetY, newCurrent) => {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;

    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        if (newCurrent[y][x]) {
          if (
            typeof board[y + offsetY] == "undefined" ||
            typeof board[y + offsetY][x + offsetX] == "undefined" ||
            board[y + offsetY][x + offsetX] ||
            x + offsetX < 0 ||
            y + offsetY >= rows ||
            x + offsetX >= cols
          ) {
            if (offsetY == 1 && freezed) {
              lose = true;
            }
            return false;
          }
        }
      }
    }
    return true;
  };

  /**
   * Сдвигает фигуру вниз
   */
  const moveBottom = () => {
    if (valid(0, 1)) {
      ++currentY;
    }
  };

  /**
   * Сдвигает фигуру влево
   */
  const moveLeft = () => {
    if (valid(-1)) {
      --currentX;
    }
  };

  /**
   * Сдвигает фигуру вправо
   */
  const moveRight = () => {
    if (valid(1)) {
      ++currentX;
    }
  };

  /**
   * Поворачивает фигуру
   */
  const moveRotate = () => {
    if (valid(0, 0, rotate(current))) {
      current = rotate(current);
    }
  };

  /**
   * Отрисовка игрового поля и текущую фигуру
   */
  const render = () => {
    context.clearRect(0, 0, width, height);

    context.strokeStyle = "black";
    for (let x = 0; x < cols; ++x) {
      for (let y = 0; y < rows; ++y) {
        if (board[y][x]) {
          context.fillStyle = colors[board[y][x] - 1];
          drawBlock(x, y);
        }
      }
    }

    context.strokeStyle = "black";
    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        if (current[y][x]) {
          context.fillStyle = colors[current[y][x] - 1];
          drawBlock(currentX + x, currentY + y);
        }
      }
    }
  };

  
  /**
   * Рисует блок по указанным координатам
   * @param {number} x
   * @param {number} y
   */
  const drawBlock = (x, y) => {
    context.fillRect(
      blockWidth * x,
      blockHeight * y,
      blockWidth - 1,
      blockHeight - 1
    );
    context.strokeRect(
      blockWidth * x,
      blockHeight * y,
      blockWidth - 1,
      blockHeight - 1
    );
  };

  
  /**
   * Создает задержку для плавной анимации
   * @param {number} ms - Продолжительность задержки
   */
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  
  /**
   * Анимирует
   */
  const animate = async () => {
    if (valid(0, 1)) {
      ++currentY;
      render();
    } else {
      freeze();
      valid(0, 1);
      removeLines();

      if (lose) {
        return;
      }

      newShape();
    }

    render();

    if (!lose) {
      await sleep(400)
      requestAnimationFrame(animate);
    }
  };

   /**
   * Старт игры
   */
  const start = () => {
    init();
    newShape();
    requestAnimationFrame(animate);

    score.textContent = 0;
    lose = false;
  };

  return {
    start,
    moveLeft,
    moveRight,
    moveRotate,
    moveBottom,
  };
};
