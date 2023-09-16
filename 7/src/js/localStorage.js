const getLocalStorageSize = () => {
  let totalSize = 0;

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // учитываем размер ключа и значения
      totalSize += localStorage[key].length + key.length;
    }
  }

  // переводим в мб
  return totalSize / (1024 * 1024);
};

export const LocalStorageMarker = () => {
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

    if (!value) {
      return null;
    }

    if (value.length) {
      return value;
    }

    return null;
  };

  /**
   * Метод удаление
   * @param {string} key
   */
  const remove = (key) => {
    localStorage.removeItem(key);
  };

  /**
   * Метод удаление item
   * @param {string} key
   * @param {string | null} id
   */
  const removeItem = (key, id) => {
    const obj = JSON.parse(localStorage.getItem(key));

    const filter = obj.filter((value) => value.id !== id);

    localStorage.setItem(key, JSON.stringify(filter));

    return filter;
  };

  /**
   * Метод редактирования item
   * @param {string} key
   * @param {Object} data
   * @param {string | null} id
   */
  const changeItem = (key, data, id) => {
    const obj = JSON.parse(localStorage.getItem(key));
    console.log(id)

    obj.forEach((value) => {
      if (value.id === id) {
        value.type = data.type;
        value.name = data.name;
        value.description = data.description;
        value.color = data.color;
      }
    });

    localStorage.setItem(key, JSON.stringify(obj));
  };

  /**
   * Метод, который добавляет новой item
   * @param {string} key
   * @param {Object} newValue
   */
  const addItem = (key, newValue) => {
    let obj = JSON.parse(localStorage.getItem(key));
    const size = getLocalStorageSize();

    // при переполнении памяти в localStorage
    if (size > 3.9) {
      for (let i = 0; i < 20; i++) {
        shiftItem(key);
      }
    }

    if (obj.length) {
      obj = [...obj, newValue];

      localStorage.setItem(key, JSON.stringify(obj));

      return obj;
    }

    localStorage.setItem(key, JSON.stringify([newValue]));

    return newValue;
  };

  /**
   * Метод, который удаляет первый элемент массива, мутирующий метод
   * @param {string} key - ключ доступа к кэшу
   */
  const shiftItem = (key) => {
    const obj = JSON.parse(localStorage.getItem(key));

    if (obj) {
      obj.value.shift();

      localStorage.setItem(key, JSON.stringify(obj));
    }
  };

  return {
    create,
    get,
    remove,
    addItem,
    shiftItem,
    changeItem,
    removeItem,
  };
};
