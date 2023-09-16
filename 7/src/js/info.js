const sidebar = document.querySelector("#sidebar");

/**
 * Возвращает HTML-разметку для отображения информации о маркере
 * @param {object} data - Объект маркера
 */
const infoHTML = (data) => `
  <div class="info">
    <h2 class="title">Маркер:</h2>
    <div id="info-type">Тип: ${data.type}</div>
    <div id="info-name">Имя: ${data.name}</div>  
    <div id="info-description">Описание: ${data.description}</div>
    <button class="button" id="info-edit">Изменить</button>
    <button class="button" id="info-remove">Удалить</button>
    <button class="button" id="info-cancel">Закрыть</button>
  </div>`;

/**
 * Логика модуля информации о маркере
 */
export const InfoMarker = () => {
  /**
   * Показывает информацию о маркере в боковой панели
   * @param {object} marker - Объект маркера
   */
  const show = (marker) => {
    sidebar.innerHTML = infoHTML(marker);
  };

  return { show };
};
