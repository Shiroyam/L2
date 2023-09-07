const template = (data, index) => `
<li class="track" data-src=${data.src}>${index + 1}. ${data.title}</li>
`;

export const render = (data) => {
  let html = "";

  data.map((track, index) => {
    html += template(track, index);
  });

  document.querySelector("#tracks").innerHTML = html;
};


