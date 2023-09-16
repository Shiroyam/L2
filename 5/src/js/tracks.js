/**
 * Шаблон,который генерирует HTML-разметку для треков
 * @param {object} data - Данные треков
 */
const template = (data, index) => `
<li class="track" data-src=${data.src}>${index + 1}. ${data.title}</li>
`;

/**
 * Логика работы треков
 */
export const Track = () => {
  /**
   * Рендерит список треков
   * @param {object[]} data - Массив объектов треков
   */
  const render = (data) => {
    let html = "";

    data.map((track, index) => {
      html += template(track, index);
    });

    document.querySelector("#tracks").innerHTML = html;
  };

  return { render };
};
