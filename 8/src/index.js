const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const algorithmSelect = document.querySelector("#algorithm");
const arrayInput = document.querySelector("#array");

let animationId;
let animationSpeed = 500;
let stopAnimation = false;
let currentArray;

algorithmSelect.addEventListener("change", () => {
  resetCanvas();
  currentArray = null;
});

const start = () => {
  resetCanvas();
  const array = getArray();
  const algorithm = algorithmSelect.value;
  stopAnimation = false;

  switch (algorithm) {
    case "bubble":
      if (currentArray) {
        drawBars(currentArray);
        bubbleSort(currentArray);
        break;
      }

      drawBars(array);
      bubbleSort(array);
      break;
    case "insertion":
      if (currentArray) {
        drawBars(currentArray);
        insertionSort(currentArray);
        break;
      }

      drawBars(array);
      insertionSort(array);
      break;
    case "selection":
      if (currentArray) {
        drawBars(currentArray);
        selectionSort(currentArray);
        break;
      }

      drawBars(array);
      selectionSort(array);
      break;
    case "quick":
      if (currentArray) {
        drawBars(currentArray);
        quickSort(currentArray, 0, currentArray.length - 1);
        break;
      }

      drawBars(array);
      quickSort(array, 0, array.length - 1);
      break;
    case "merge":
      if (currentArray) {
        drawBars(currentArray);
        mergeSort(currentArray, 0, currentArray.length - 1);
        break;
      }

      drawBars(array);
      mergeSort(array, 0, array.length - 1);
      break;
    default:
      break;
  }
};

const stop = () => {
  stopAnimation = true;
};

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);

const getArray = () => {
  const array = arrayInput.value.replaceAll(" ", "").split(",");
  const arrayNumber = array.map((value) => Number(value));

  return arrayNumber;
};

const resetCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const drawBars = (arr) => {
  const canvasHeight = canvas.height;
  const barWidth = canvas.width / arr.length;
  const maxBarHeight = Math.max(...arr);

  context.clearRect(0, 0, canvas.width, canvas.height);

  arr.forEach((value, index) => {
    const barHeight = (value / maxBarHeight) * canvasHeight;
    const barX = index * barWidth;
    const barY = canvasHeight - barHeight;

    context.fillStyle = "rgb(25, 118, 210)";
    context.fillRect(barX, barY, barWidth, barHeight);

    const textX = barX + barWidth / 2;
    const textY = barY + barHeight / 2;

    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(value, textX, textY);
  });
};

const swap = async (arr, i, j) => {
  await sleep(animationSpeed);
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  drawBars(arr);
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const bubbleSort = async (arr) => {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      await sleep(animationSpeed);
      if (stopAnimation) return (currentArray = arr);

      if (arr[j] > arr[j + 1]) {
        await swap(arr, j, j + 1);
      }
    }
  }
};

const insertionSort = async (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      if (stopAnimation) return (currentArray = arr);
      await swap(arr, j, j - 1);
      j--;
    }
  }
};

const selectionSort = async (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (stopAnimation) return (currentArray = arr);

    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (stopAnimation) return (currentArray = arr);

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    await swap(arr, i, minIndex);
  }
};

const quickSort = async (arr) => {
  const stack = [];
  stack.push({ left: 0, right: arr.length - 1 });

  while (stack.length > 0) {
    if (stopAnimation) return (currentArray = arr);

    const { left, right } = stack.pop();

    const index = await partition(arr, left, right);

    if (left < index - 1) {
      stack.push({ left: left, right: index - 1 });
    }

    if (index < right) {
      stack.push({ left: index, right: right });
    }
  }
};

const partition = async (arr, left, right) => {
  const pivot = arr[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    if (stopAnimation) return (currentArray = arr);

    while (arr[i] < pivot) {
      i++;
    }

    while (arr[j] > pivot) {
      j--;
    }

    if (i <= j) {
      await swap(arr, i, j);
      i++;
      j--;
    }
  }

  return i;
};

const mergeSort = async (arr) => {
  for (let currSize = 1; currSize < arr.length; currSize = 2 * currSize) {
    if (stopAnimation) return (currentArray = arr);

    for (
      let leftStart = 0;
      leftStart < arr.length - 1;
      leftStart += 2 * currSize
    ) {
      if (stopAnimation) return (currentArray = arr);

      const mid = Math.min(leftStart + currSize - 1, arr.length - 1);
      const rightEnd = Math.min(leftStart + 2 * currSize - 1, arr.length - 1);

      await merge(arr, leftStart, mid, rightEnd);
    }
  }
}

const merge = async (arr, start, mid, end) => {
  const leftArr = arr.slice(start, mid + 1);
  const rightArr = arr.slice(mid + 1, end + 1);

  let i = 0;
  let j = 0;
  let k = start;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }

    k++;
    await sleep(animationSpeed);
    drawBars(arr);
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
    await sleep(animationSpeed);
    drawBars(arr);
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
    await sleep(animationSpeed);
    drawBars(arr);
  }
}
