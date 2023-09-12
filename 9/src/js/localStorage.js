export const LocalStorage = () => {
  /**
   * Метод, который создает массив в localStorage
   * @param {string} key - ключ доступа
   * @param {Array} value - содержимое
   */
  const create = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  /**
   * Метод получение
   * @param {string} key
   */
  const get = (key) => {
    const value = JSON.parse(localStorage.getItem(key));

    if (value !== null) {
      return value;
    }

    return null;
  };

  /**
   * Метод, который добавляет новое значение
   * @param {string} key
   * @param {unknown} newValue
   */
  const change = (key, newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  /**
   * Метод удаление
   * @param {string} key
   */
  const removeAllProducts = (key) => {
    const obj = JSON.parse(localStorage.getItem(key));

    obj.forEach((storageItem) => {
      storageItem.totalCalories = 0;
      storageItem.products = [];
    });

    localStorage.setItem(key, JSON.stringify(obj));
  };

  /**
   * Метод, который добавляет новой item
   * @param {string} key
   * @param {number} id - идентификатор объекта
   * @param {Object} newValue
   */
  const addItemProducts = (key, id, newValue) => {
    const obj = JSON.parse(localStorage.getItem(key));

    obj.forEach((storageItem) => {
      if (storageItem.id === id) {
        storageItem.products.push(newValue);
      }
    });

    localStorage.setItem(key, JSON.stringify(obj));
  };

  /**
   * Метод, который меняет калории
   * @param {string} key
   * @param {number} id - идентификатор объекта
   * @param {number} calories
   */
  const changeCalories = (key, id, calories) => {
    const obj = JSON.parse(localStorage.getItem(key));

    obj.forEach((storageItem) => {
      if (storageItem.id === id) {
        storageItem.totalCalories = calories;
      }
    });

    localStorage.setItem(key, JSON.stringify(obj));
  };

  return {
    create,
    get,
    change,
    addItemProducts,
    removeAllProducts,
    changeCalories,
  };
};
