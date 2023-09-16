const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Логика модуля игры
 * @param {HTMLElement} result - Элемент для отображения результата игры.
 * @param {HTMLElement} attemptsText - Элемент для отображения информации о попытках.
 */
export const Game = (result, attemptsText) => {
  let attempts = 0;
  let minRange = 0;
  let maxRange = 100;
  let secretNumber = generateRandom(minRange, maxRange);

   /**
   * Обновляет значения диапазона чисел
   */
  const change = () => {
    const rangeInputs = document.querySelectorAll("#range");
    const inputValues = Array.from(rangeInputs).map((input) => parseInt(input.value));

    minRange = Math.min(...inputValues);
    maxRange = Math.max(...inputValues);

    reset();
  };

  /**
   * Сбрасывает игру в начальное состояние
   */
  const reset = () => {
    attempts = 0;
    secretNumber = generateRandom(minRange, maxRange);
    document.querySelector("#guess-input").value = "";
    document.querySelector("#submit").style.display = "inline";
    result.textContent = "";
    attemptsText.textContent = "";
  };

  /**
   * Проверяет ответ пользователя и обновляет состояние игры
   */
  const check = () => {
    const guessInput = document.querySelector("#guess-input");
    const guess = parseInt(guessInput.value);

    // Проверить, находится ли ответ в заданном диапазоне
    if (guess < minRange || guess > maxRange) {
      result.textContent = "Введите число в допустимом диапазоне!";
    } else {
      attempts++;
      attemptsText.textContent = `Попытка: ${attempts}`;

      // Проверить, угадал ли пользователь число
      if (guess === secretNumber) {
        result.textContent = "Вы угадали число!";
        document.querySelector("#submit").style.display = "none";
      } else if (guess < secretNumber) {
        result.textContent = "Попробуйте большее число";
      } else {
        result.textContent = "Попробуйте меньшее число";
      }

      // Предоставить подсказку после каждых трех неудачных попыток
      if (attempts % 3 === 0 && guess !== secretNumber) {
        if (secretNumber % 2 === 0) {
          result.textContent += ", число четное";
        } else {
          result.textContent += ", число нечетное";
        }
      }
    }
  };

  return {
    change,
    check,
    reset,
  };
};
