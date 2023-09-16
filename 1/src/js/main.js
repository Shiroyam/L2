import { Game } from "./game";

const menu = document.querySelector("#menu");
const start = document.querySelector("#start");
const soldiers = document.querySelector("#soldiers");
const gameField = document.querySelector("#game");
const myArmy = document.querySelector("#my-army");
const enemyArmy = document.querySelector("#enemy-army");
const battleText = document.querySelector("#battle-text");
const actionText = document.querySelector("#action");

const soldiersTypeConfig = [ 
  {
    id: 0,
    races: "Человек",
    forces: "light",
    armor: 7,
    damage: 5,
    typeOfTroops: "Мечник",
    declensionRaces:  ["Человек", "Человека", "Людей"],
    declensionTypeOfTroops: ["Мечник", "Мечника", "Мечников"]
  },
  {
    id: 1,
    races: "Человек",
    forces: "light",
    armor: 2,
    damage: 8,
    typeOfTroops: "Всадник",
    declensionRaces:  ["Человек", "Человека", "Людей"],
    declensionTypeOfTroops: ["Всадник", "Всадника", "Всадников"]
  },
  {
    id: 2,
    races: "Человек",
    forces: "light",
    armor: 1,
    damage: 6,
    typeOfTroops: "Лучник",
    declensionRaces: ["Людей", "Человека", "Человек"],
    declensionTypeOfTroops: ["Лучник", "Лучника", "Лучников"]
  },
  {
    id: 3,
    races: "Эльфы",
    forces: "light",
    armor: 1,
    damage: 7,
    typeOfTroops: "Лучник",
    declensionRaces: ["Эльф", "Эльфа", "Эльфов"],
    declensionTypeOfTroops: ["Лучник", "Лучника", "Лучников"]
  },
  {
    id: 4,
    races: "Орк",
    forces: "dark",
    armor: 8,
    damage: 4,
    typeOfTroops: "Тяжелый мечник",
    declensionRaces: ["Орк", "Орка", "Орков"],
    declensionTypeOfTroops: ["Тяжелый мечник", "Тяжелых мечника","Тяжелых мечников" ]
  },
  {
    id: 5,
    races: "Орк",
    forces: "dark",
    armor: 4,
    damage: 6,
    typeOfTroops: "Легкий мечник",
    declensionRaces: ["Орк", "Орка", "Орков"],
    declensionTypeOfTroops: ["Легкий мечник", "Легких мечника","Легких Мечников",]
  },
  {
    id: 6,
    races: "Темный эльф",
    forces: "dark",
    armor: 1,
    damage: 7,
    typeOfTroops: "Лучник",
    declensionRaces: ["Темный эльф", "Темного Эльфа", "Темных эльфов"],
    declensionTypeOfTroops: ["Лучник", "Лучника", "Лучников"]
  },
  {
    id: 7,
    races: "Темный эльф",
    forces: "dark",
    armor: 1,
    damage: 7,
    typeOfTroops: "Лучник",
    declensionRaces: ["Темный эльф", "Темного Эльфа", "Темных эльфов"],
    declensionTypeOfTroops:  ["Мечник", "Мечника", "Мечников"]
  },
];

const itemArmyHTML = (data, races, type) => `
<div class="soldier" id="${data.id}">
  <span class="number">${data.numberOfSoldiers}</span> 
  ${type} 
  ${races}
</div>
`;

const game = Game(
  menu,
  gameField,
  enemyArmy,
  myArmy,
  battleText,
  actionText,
  soldiers,
  soldiersTypeConfig,
  itemArmyHTML
);

start.addEventListener("click", () => {
  game.start();
});
