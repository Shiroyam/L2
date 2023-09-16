import { Generator } from "./generator";

const canvas = document.querySelector("#canvas");
const weight = document.querySelector("#weight");
const color = document.querySelector("#color");
const size = document.querySelector("#size");
const textInput = document.querySelector("#text");
const font = document.querySelector("#font");

const generator = Generator(canvas, weight, size, color, font, textInput);

const load = document.querySelector("#load");
load.addEventListener("change", (e) => {
  generator.loadImg(e)
});

const remove = document.querySelector("#remove");
remove.addEventListener("click", () => {
  generator.remove()
});

const save = document.querySelector("#save");
save.addEventListener("click", () => {
  generator.save()
});

const add = document.querySelector("#add");
add.addEventListener("click",() => {
  generator.addText()
});

canvas.addEventListener("mousedown", (e) => {
  generator.handleHoverMouseActive(e)
});

canvas.addEventListener("mousemove", (e) => {
  generator.handleMoveText(e)
});

canvas.addEventListener("mouseup", () => {
  generator.handleMouseup()
});

