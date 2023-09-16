/**
 * Логика модуля утилити функций 
 */
export const Utils = () => {
  /**
   * Создает идентификатор
   * @param {object[]} arr - Входной массив с объектами, имеющими поле id
   * @returns {number} - Новое значение идентификатора
   */
  const createIdArray = (arr) => {
    let id

    if (arr.at(-1)) {
      id = arr.at(-1).id + 1
    } else {
      id = 0
    }

    return id
  }
  
  return {
    createIdArray
  }
}