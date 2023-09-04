const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");

// загрузка изображения
const load = document.querySelector("#load");
let staticImg;
let scaledWidth;
let scaledHeight;

load.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      scaledWidth = img.width;
      scaledHeight = img.height;

      // изменение размера изображение, если оно превышает 1000px по ширине
      if (img.width > 1000) {
        const scaleRatio = 1000 / img.width;
        scaledWidth = 1000;
        scaledHeight = img.height * scaleRatio;
      }

      // Установка размеров canvas и отображение изображения
      drawImage(img, 0, 0, scaledWidth, scaledHeight);
      staticImg = img;

      // Если у нас уже есть текст, то он появится на новой картинке
      texts.forEach((text) => {
        drawText(text.font, text.color, text.content, text.x, text.y);
      });
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

const remove = document.querySelector("#remove");

// удаление canvas
remove.addEventListener("click", () => {
  context.fillStyle = "#ffffff";
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 300;
  canvas.height = 150;

  if (staticImg) {
    staticImg = null;
  }

  // очистка надписей
  texts.length = 0;
});

const save = document.querySelector("#save");

// сохранение canvas
save.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = dataURL;
  link.click();
});

const add = document.querySelector("#add");
const textInput = document.querySelector("#text");
const font = document.querySelector("#font");
const weight = document.querySelector("#weight");
const color = document.querySelector("#color");
const size = document.querySelector(".size");

// массив текстов на canvas
const texts = [];

// добавление текста в canvas
add.addEventListener("click", () => {
  // объект, который хранит данные о надписи
  const text = {
    content: textInput.value,
    font: `${weight.value} ${size.value ? `${size.value}px` : "16px"} ${
      font.value
    }`,
    color: color.value,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isDragging: false,
  };

  // устанавливаем шрифт и стиль текста
  context.font = text.font;
  context.fillStyle = text.color;

  // высчитываем высоту и ширину текста
  const textMetrics = context.measureText(text.content);
  text.width = textMetrics.width;
  text.height = textMetrics.fontBoundingBoxAscent;
  text.y = text.height;

  // добавляем в массив надписей
  texts.push(text);

  // рендерим текст в canvas
  context.fillText(text.content, text.x, text.y);
});

// это переменные используются для хранения начальных координат курсора мыши
let startX;
let startY;

canvas.addEventListener("mousedown", (e) => {
  e.stopPropagation();

  const { mouseX, mouseY } = calculateSizeCanvas(e);

  texts.forEach((text) => {
    // если мышь находиться над размерами текста, то делаем его подвижным
    if (
      mouseX > text.x &&
      mouseX < text.x + text.width &&
      mouseY < text.y &&
      mouseY > text.y - text.height
    ) {
      text.isDragging = true;
    }
  });

  startX = mouseX;
  startY = mouseY;
});

canvas.addEventListener("mousemove", (e) => {
  e.stopPropagation();

  const { mouseX, mouseY } = calculateSizeCanvas(e);

  const distanceX = mouseX - startX;
  const distanceY = mouseY - startY;

  texts.forEach((text) => {
    if (text.isDragging) {
      text.x += distanceX;
      text.y += distanceY;
    }
  });

  animate();

  startX = mouseX;
  startY = mouseY;
});

canvas.addEventListener("mouseup", (e) => {
  texts.forEach((text) => {
    text.isDragging = false;
  });
});

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (staticImg) {
    drawImage(staticImg, 0, 0, scaledWidth, scaledHeight);
  }

  texts.forEach((text) => {
    drawText(text.font, text.color, text.content, text.x, text.y);
  });
}

/**
 * рендерит картинку в canvas.
 * @param {string} img - ссылка на картину
 * @param {number} x - координаты
 * @param {number} y - координаты
 * @param {number} width - размер
 * @param {number} height - размер
 */
function drawImage(img, x, y, width, height) {
  canvas.width = width;
  canvas.height = height;
  context.drawImage(img, x, y, width, height);
}

/**
 * рендерит текс в canvas
 * @param {string} font - название шрифта и стиль
 * @param {number} color - цвет
 * @param {number} content - сам текст
 * @param {number} x - координаты
 * @param {number} y - координаты
 */
function drawText(font, color, content, x, y) {
  context.font = font;
  context.fillStyle = color;
  context.fillText(content, x, y);
}

function calculateSizeCanvas(e) {
  const rect = canvas.getBoundingClientRect();

  //координаты canvas
  const x = rect.left;
  const y = rect.top;

  //координаты мыши
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;

  return { x, y, mouseX, mouseY };
}
