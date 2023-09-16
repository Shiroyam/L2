import L from "leaflet";

/**
 * Логика модуля создания и управление маркерами на карте.
 */
export const Marker = () => {
  const markers = []

  /**
   * Добавляет новый маркер 
   * @param {object} newItem - Новый маркер
   */
  const addItem = (newItem) => {
    markers.push(newItem)
  }

    /**
   * Удаляет маркер из массива маркеров
   * @param {string} id - Идентификатор маркера
   */
  const removeItem = (id) => {
    markers.forEach((item, index) => {
      if (item.id === id) {
        markers.splice(index, 1);
      }
    });
  }

  /**
   * Создает маркер на карте
   * @param {object} latlng - Координаты маркера 
   * @param {object} data - Данные маркера 
   * @param {object} map - Объект карты Leaflet
   * @returns {object} - Созданный маркер
   */
  const create = (latlng, data, map) => {
    const marker = L.marker(latlng, {
      draggable: true,
    }).addTo(map);
  
    marker.id = data.id
    marker.name = data.name;
    marker.type = data.type;
    marker.description = data.description;
    marker.color = data.color;
  
    const icon = L.divIcon({
      className: "wrapper-marker",
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span data-lng='${latlng.lng}' data-lat='${latlng.lat}' class="marker" id='marker-${marker.id}' style="background-color: ${data.color}" />`,
    });
    
    marker.setIcon(icon)
  
    return marker
  }

  return { create, addItem, removeItem, markers }
}
