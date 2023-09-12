import { updateDiagram } from "./diagram";
import { LocalStorage } from "./localStorage";
import { Product } from "./product";
import { Utils } from "./utils";

const product = Product();
const utils = Utils();
const localDB = LocalStorage();

const warning = document.querySelector("#warning");

const select = document.querySelector("#select");
const name = document.querySelector("#name");
const calories = document.querySelector("#cal");
const add = document.querySelector("#add");

const eatenCalories = document.querySelector("#eaten");
const remainingCalories = document.querySelector("#remaining");
const allCalories = document.querySelector("#all");

let listConfig = [
  {
    id: 0,
    totalCalories: 0,
    title: "breakfast",
    caloriesElement: "#total-breakfast",
    listElement: "#product-list-breakfast",
    color: "blue",
    products: [],
  },
  {
    id: 1,
    totalCalories: 0,
    title: "lunch",
    caloriesElement: "#total-lunch",
    listElement: "#product-list-lunch",
    color: "green",
    products: [],
  },
  {
    id: 2,
    totalCalories: 0,
    title: "dinner",
    caloriesElement: "#total-dinner",
    listElement: "#product-list-dinner",
    color: "orange",
    products: [],
  },
];
let eaten = 0;
let remaining = 0;
let all = parseInt(allCalories.textContent);

if (
  localDB.get("all") !== null &&
  localDB.get("eaten") !== null &&
  localDB.get("remaining") !== null &&
  localDB.get("listConfig")
) {
  all = localDB.get("all");
  eaten = localDB.get("eaten");
  remaining = localDB.get("remaining");
  listConfig = localDB.get("listConfig");

  allCalories.textContent = all;
  eatenCalories.textContent = eaten;
  remainingCalories.textContent = remaining;

  listConfig.forEach((category) => {
    product.showList(category);

    const element = document.querySelector(category.caloriesElement);
    element.innerText = category.totalCalories;
  });

  updateDiagram(listConfig, all);
} else {
  localDB.create("all", all);
  localDB.create("eaten", eaten);
  localDB.create("remaining", remaining);
  localDB.create("listConfig", listConfig);
}

add.addEventListener("click", () => {
  const nameValue = name.value.trim();
  const caloriesValue = parseInt(calories.value.trim());
  const selectValue = select.value;

  listConfig.map((value) => {
    if (value.title === selectValue) {
      const calories = caloriesValue ? caloriesValue : 0;

      const id = utils.createIdArray(value.products);

      const productData = {
        id,
        name: nameValue,
        calories: calories,
      };

      value.products.push(productData);

      product.showList(value);

      localDB.addItemProducts("listConfig", value.id, productData);

      incrementCalories(calories, value);
      updateDiagram(listConfig, all);
    }
  });

  name.value = "";
  calories.value = "";
});

const incrementCalories = (calories, value) => {
  const element = document.querySelector(value.caloriesElement);

  eaten += calories;
  remaining = all - eaten;

  value.totalCalories = value.totalCalories + calories;
  element.innerText = value.totalCalories;
  eatenCalories.innerText = eaten;
  remainingCalories.innerText = remaining;

  localDB.change("eaten", eaten);
  localDB.change("remaining", remaining);
  localDB.changeCalories("listConfig", value.id, value.totalCalories);

  if (eaten > all) {
    warning.style.display = "block";
  }
};

const removeCalories = () => {
  eaten = 0;
  remaining = 0;

  eatenCalories.innerText = eaten;
  remainingCalories.innerText = remaining;

  listConfig.forEach((value) => {
    const element = document.querySelector(value.caloriesElement);

    value.totalCalories = 0;
    element.innerText = value.totalCalories;
  });

  if (eaten < all) {
    warning.style.display = "none";
  }
};

const removeAllButton = document.querySelector("#remove-all");
removeAllButton.addEventListener("click", () => {
  product.removeAll(listConfig);
  updateDiagram(listConfig);
  removeCalories();

  localDB.create("eaten", 0);
  localDB.create("remaining", 0);
  localDB.removeAllProducts("listConfig");
});

const goal = document.querySelector("#goal");
const goalBtn = document.querySelector("#goal-btn");
goalBtn.addEventListener("click", () => {
  if (goal.value) {
    all = parseInt(goal.value);
    remaining = all - eaten;

    allCalories.innerText = goal.value;
    remainingCalories.innerText = remaining;

    localDB.change("all", all);
    localDB.change("remaining", remaining);

    updateDiagram(listConfig, all);

    if (eaten > all) {
      warning.style.display = "block";
    }

    goal.value = "";
  }
});

const search = document.querySelector("#search");
search.addEventListener("input", () => {
  product.filter(listConfig, search);
});
