/**
 * Шаблон,который генерирует HTML-разметку для плейлиста
 * @param {object} data - Данные плейлиста
 */
const template = (data) => `
<div id=${data.id} class="playlist">
  <img src=${data.img}>
  <h4>${data.title}<h4>
</div>
`;

/**
 * Логика работы плейлиста
 */
export const Playlist = () => {
   /**
   * Рендерит список плейлистов на странице
   * @param {object[]} data - Массив объектов плейлистов
   */
  const render = (data) => {
    let html = "";
  
    data.map((playlist) => {
      html += template(playlist);
    });
  
    document.querySelector("#playlists").innerHTML = html;
  };
  
  return {
    render
  }
}
