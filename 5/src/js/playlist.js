const template = (data) => `
<div id=${data.id} class="playlist">
  <img src=${data.img}>
  <h4>${data.title}<h4>
</div>
`;

export const render = (data) => {
  let html = "";

  data.map((playlist) => {
    html += template(playlist);
  });

  document.querySelector("#playlists").innerHTML = html;
};

