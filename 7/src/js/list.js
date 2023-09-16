import L from "leaflet";

const sidebar = document.querySelector("#sidebar");

/**
 * Возвращает HTML-разметку для отображения маркера в списке
 * @param {object} data - Объект маркера
 */
const markerHTML = (data) => `
<div data-lng="${data._latlng.lng}" data-lat="${data._latlng.lat}" id="marker-list-${data.id}" class="marker-list">
 <div>Тип: ${data.type}</div> <div>Имя: ${data.name}</div> <div>Описание: ${data.description}</div>
</div>`;

/**
 * Логика модуля список маркеров.
 */
export const List = () => {
  /**
   * Показывает список маркеров в боковой панели
   * @param {object[]} markers - Массив объектов маркеров
   * @param {object} map - Объект карты Leaflet
   */
  const show = (markers, map) => {
    if (markers.length) {
      let search = document.querySelector("#search");
      let list = document.querySelector("#list");

      if (!search) {
        const wrapper = `<h1 class="title">Ваши маркеры:</h1> 
        <input id="search" class="input" placeholder="Поиск по описанию"></input>
        <div id="list"></div>`;

        sidebar.innerHTML = wrapper;

        search = document.querySelector("#search");
        list = document.querySelector("#list");
      }

      let html = "";

      markers.map((marker) => {
        html += markerHTML(marker);
      });

      list.innerHTML = html;

      search.addEventListener("input", () => {
        list.innerHTML = handleSearch(markers);
        markerPanTO(markers, map);
      });

      markerPanTO(markers, map);

      return;
    }

    return (sidebar.innerHTML = `<h1 class="title">Ваши маркеры:</h1> <div>У вас нет маркеров</div>`);
  };

  /**
   *  Поиск маркеров по описанию
   * @param {object[]} markers - Массив объектов маркеров
   * @returns {string} - HTML-разметка для найденных маркеров
   */
  const handleSearch = (markers) => {
    let html = "";

    markers
      .filter((marker) => {
        return marker.description
          .toLowerCase()
          .includes(search.value.toLowerCase());
      })
      .map((marker) => {
        html += markerHTML(marker);
      });

    return html;
  };

  /**
   * Перемещает карту к выбранному маркеру по клику
   * @param {object[]} markers - Массив объектов маркеров
   * @param {object} map - Объект карты Leaflet
   */
  const markerPanTO = (markers, map) => {
    markers.forEach((marker) => {
      const _marker = document.querySelector(`#marker-list-${marker.id}`);

      if (_marker) {
        _marker.addEventListener("click", () => {
          const lat = _marker.dataset.lat;
          const lng = _marker.dataset.lng;

          map.panTo(L.latLng(lat, lng));
        });
      }
    });
  };

  return { markerPanTO, handleSearch, show };
};
