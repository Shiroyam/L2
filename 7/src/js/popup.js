import L from "leaflet";

const popup = L.popup();

const popupFormHTML = `
  <form id="form-create" type="submit" class="create">
    <div>Хотите создать маркер?</div>
    <div class="input-wrapper">
      <label for="marker-type">Тип:</label>
      <input class="input" type="text" id="marker-type">
    </div>
    <div class="input-wrapper">
      <label for="marker-name">Имя:</label>
      <input class="input" type="text" id="marker-name">
    </div>
    <div class="input-wrapper">
      <label for="marker-description">Описание:</label>
      <textarea class="input" id="marker-description"></textarea>
    </div>
    <div class="input-wrapper">
      <label for="marker-color">Цвет:</label>
      <input class="input" type="color" id="marker-color">
    </div>
    <button type="submit" class="button" id="create-marker">Создать</button>
  </div>
  `;

/**
 * Логика модуля окон на карте
 */
export const Popup = () => {
  /**
   * Открывает всплывающее окно с формой для создания маркера
   * @param {object} latlng - Координаты маркера
   * @param {object} map - Объект карты Leaflet
   */
  const markerForm = (latlng, map) => {
    popup.setLatLng(latlng).setContent(popupFormHTML).openOn(map);
  };

  /**
   * Закрывает всплывающее окно.
   */
  const close = () => {
    popup.close();
  };

  return { markerForm, close };
};
