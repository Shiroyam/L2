/**
 * @param { number } number - число для которого нужно окончание
 * @param { Array.<string> } endings - массив строк окончаний
 */
export const declension = (number, endings) => {
  number = Math.abs(number) % 100;

  if (number >= 11 && number <= 19) {
    return endings[2];
  }

  number = number % 10;

  if (number === 1) {
    return endings[0];
  } else if (number >= 2 && number <= 4) {
    return endings[1];
  } else {
    return endings[2];
  }
};