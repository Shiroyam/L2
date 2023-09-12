const canvas = document.getElementById("diagram");
const context = canvas.getContext("2d");
const barSize = 20; 
const backgroundColor = "#f2f2f2"; 
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(canvas.width, canvas.height) / 2 - barSize;

export const updateDiagram = (config, all) => {
  drawBackground()

  drawProgress(config, all)
}

const drawBackground = () => {
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.lineWidth = barSize;
  context.strokeStyle = backgroundColor;
  context.stroke();
}

const drawProgress = (config, all) => {
  let startAngle = -Math.PI / 2;
  
  config.forEach((list) => {
    const progress = (list.totalCalories / all) * 100;
    const endAngle = startAngle + (progress / 100) * 2 * Math.PI;

    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.lineWidth = barSize;
    context.strokeStyle = list.color;
    context.stroke();

    startAngle = endAngle;
  })
}

drawBackground()