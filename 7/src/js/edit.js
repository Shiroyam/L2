import { LocalStorageMarker } from "./localStorage";

const localDB = LocalStorageMarker()
const sidebar = document.querySelector("#sidebar");

const editHTML = `
<div class="edit">
  <h2 class="title">Редактировать маркер</h2>
  <label for="edit">Тип:</label>
  <input class="input" type="text" id="edit-type">
  <label for="edit-name">Имя:</label>
  <input class="input" type="text" id="edit-name">
  <label for="edit-description">Описание:</label>
  <textarea class="input" id="edit-description"></textarea>
  <label for="edit-color">Цвет:</label>
  <input class="input" type="color" id="edit-color">
  <button class="button" id="save-edit">Изменить</button>
  <button class="button" id="cancel-edit">Закрыть</button>
</div>`;

/**
 * Логика модуля формы редактирования маркера
 */
export const EditMarker = () => {

   /**
   * Показывает форму редактирования маркера
   */
  const show = () => {
    sidebar.innerHTML = editHTML;
  };

  /**
   * Заполняет значениями форму редактирования маркера
   * @param {object} marker - Объект маркера
   */
  const populate = (marker) => {
    const type = document.querySelector("#edit-type");
    const name = document.querySelector("#edit-name");
    const description = document.querySelector("#edit-description");
    const color = document.querySelector("#edit-color");
  
    type.value = marker.type;
    name.value = marker.name;
    description.value = marker.description;
    color.value = marker.color;
  };

   /**
   * Изменяет свойства маркера
   * @param {object} marker - Объект маркера
   */
  const change = (marker) => {
    const type = document.querySelector("#edit-type");
    const name = document.querySelector("#edit-name");
    const description = document.querySelector("#edit-description");
    const color = document.querySelector("#edit-color");
    const markerElement = document.querySelector(`#marker-${marker.id}`);
  
    markerElement.style.backgroundColor = color.value;
    marker.type = type.value;
    marker.name = name.value;
    marker.description = description.value;
    marker.color = color.value;
  
    localDB.changeItem(
      "markers",
      {
        type: type.value,
        name: name.value,
        description: description.value,
        color: color.value,
      },
      marker.id
    );
  };
  
  return {change, populate, show}
}
