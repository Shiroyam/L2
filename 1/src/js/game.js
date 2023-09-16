import { declension } from "./declension";

/**
 * Представляет игру и ее функциональность.
 * @param {HTMLElement} menu - HTML-разметка меню игры.
 * @param {HTMLElement} game - HTML-разметка с разметкой самой игры.
 * @param {HTMLElement} enemyArmyHtml - HTML-элемент, где будет рендериться армия противника.
 * @param {HTMLElement} myArmyHtml - HTML-элемент,  где будет рендериться своя армия.
 * @param {HTMLElement} battleText - HTML-элемент текста битвы.
 * @param {HTMLElement} actionText - HTML-элемент текста действия.
 * @param {HTMLInputElement} soldiers - HTML-элемент ввода количества солдат.
 * @param {Array} soldiersType - Конфиг типов солдат.
 * @param {Function} itemArmyHTML - Функция для генерации HTML-элемента солдата.
 * @returns {Object} - Объект, в котором экспортируем логику игры.
 */
export const Game = (
  menu,
  game,
  enemyArmyHtml,
  myArmyHtml,
  battleText,
  actionText,
  soldiers,
  soldiersType,
  itemArmyHTML
) => {
  let darkForces = [];
  let lightForces = [];
  let battle = [];
  let currentSoldiers = null;
  let currentEnemy = null;

  /**
   * Запуск игры
   */
  const start = () => {
    menu.classList.add("menu--hidden");
    game.classList.add("game--active");
    generateSoldiers(parseInt(soldiers.value));
    drawArmy(darkForces, enemyArmyHtml, itemArmyHTML);
    drawArmy(lightForces, myArmyHtml, itemArmyHTML);
    addEventListenerArmy(myArmyHtml, enemyArmyHtml);
    document.querySelector("#end").addEventListener("click", end)
  };

  /**
   * Завершить игру
   */
  const end = () => {
    darkForces = [];
    lightForces = [];
    battle = [];
    currentSoldiers = null;
    currentEnemy = null;
    menu.classList.remove("menu--hidden");
    game.classList.remove("game--active");
    drawBattleText(battle, battleText);
    actionText.textContent = "Теперь выберите отряд противника для атаки";
  };

  /**
   * Генерирует рандомное количество солдат в отрядах
   * @param {number} number - Количество солдат для генерации
   */
  const generateSoldiers = (number) => {
    const halfSoldiers = Math.floor(number / 2);

    soldiersType.map((soldier) => {
      const randomSoldiers =
        Math.floor(Math.random() * (halfSoldiers)) + 1;

      if (soldier.forces === "light") {
        lightForces.push({ ...soldier, numberOfSoldiers: randomSoldiers ? randomSoldiers : 1 });
      } else if (soldier.forces === "dark") {
        darkForces.push({ ...soldier, numberOfSoldiers: randomSoldiers ? randomSoldiers : 1 });
      }
    });
  };

  /**
   * Отображает армию
   * @param {Array} arr - Массив отрядов для отображения.
   * @param {HTMLElement} innerHtmlElement - HTML-элемент, где будет рендериться армия
   * @param {Function} htmlElement - Функция для генерации HTML-элемента солдата
   */
  const drawArmy = (arr, innerHtmlElement, htmlElement) => {
    let list = "";

    arr.forEach((soldier) => {
      const races = declension(soldier.numberOfSoldiers, soldier.declensionRaces)
      const type = declension(soldier.numberOfSoldiers, soldier.declensionTypeOfTroops)
      list += htmlElement(soldier, races, type);
    });

    innerHtmlElement.innerHTML = list;
  };

   /**
   * Отображает текст битвы
   * @param {Array} arr - Массив текстов битвы
   * @param {HTMLElement} innerHtmlElement - HTML-элемент, где будет рендериться тексом ход битвы
   */
  const drawBattleText = (arr, innerHtmlElement) => {
    let list = "";

    arr.forEach((text) => {
      list += text;
    });

    innerHtmlElement.innerHTML = list;
  };

  /**
   * Выполняет атаку
   * @param {Object} attackingTarget - Атакующая цель
   * @param {Object} protectingTarget - Защищающаяся цель
   */
  const actionAttack = (attackingTarget, protectingTarget) => {
    if(checkWin(darkForces, lightForces)) {
      return;
    }

    protectingTarget.numberOfSoldiers =
      parseInt(protectingTarget.numberOfSoldiers) -
      parseInt(attackingTarget.damage);

    if (protectingTarget.numberOfSoldiers <= 0) {
      darkForces.forEach((soldier, index) => {
        if (soldier.numberOfSoldiers <= 0) {
          darkForces.splice(index, 1);
        }
      });

      lightForces.forEach((soldier, index) => {
        if (soldier.numberOfSoldiers <= 0) {
          lightForces.splice(index, 1);
        }
      });
    }
  };

 /**
   * Выполняет действия противника
   */
  const enemyAction = () => {
    const randomSoldiersLight = Math.floor(Math.random() * (lightForces.length - 1) );
    const randomSoldiersDark = Math.floor( Math.random() * (darkForces.length - 1) );
     
    const darkSoldier = darkForces[randomSoldiersDark];
    const lightSoldier = lightForces[randomSoldiersLight];

    actionAttack(darkSoldier, lightSoldier);

    if(checkWin(darkForces, lightForces)) {
      return drawArmy(lightForces, myArmyHtml, itemArmyHTML);
    }

    const declensionDarkSoldierRaces = declension(darkSoldier.numberOfSoldiers, darkSoldier.declensionRaces)
    const declensionDarkSoldierType = declension(darkSoldier.numberOfSoldiers, darkSoldier.declensionTypeOfTroops)
    const declensionLightSoldierRaces = declension(lightSoldier.numberOfSoldiers, lightSoldier.declensionRaces)
    const declensionLightSoldierType = declension(lightSoldier.numberOfSoldiers, lightSoldier.declensionTypeOfTroops)
    const declensionAttackText = declension(darkSoldier.numberOfSoldiers, ["атакует", "атакуют", "атакуют"])

    battle.push(
      `<div class="attack">
      <span class="enemySoldier">Противник</span>: 
      ${darkSoldier.numberOfSoldiers} 
      ${declensionDarkSoldierRaces} 
      ${declensionDarkSoldierType} 
      ${declensionAttackText} 
      ${lightSoldier.numberOfSoldiers}  
      ${declensionLightSoldierRaces} 
      ${declensionLightSoldierType}
    </div>
    `);

    drawBattleText(battle, battleText);
    drawArmy(lightForces, myArmyHtml, itemArmyHTML);
  };

  /**
   * Выполняет действия игрока
   */
  const myAction = () => {
    if (currentSoldiers !== null && currentEnemy !== null) {
      let lightSoldier = null;
      let darkSoldier = null;

      lightForces.forEach((soldier) => {
        if (soldier.id == currentSoldiers) {
          lightSoldier = soldier;
        }
      });

      darkForces.forEach((soldier) => {
        if (soldier.id == currentEnemy) {
          darkSoldier = soldier;
        }
      });

      if (lightSoldier && darkSoldier) {
        actionAttack(lightSoldier, darkSoldier);

        if(checkWin(darkForces, lightForces)) {
          return drawArmy(darkForces, enemyArmyHtml, itemArmyHTML);
        }

        const declensionDarkSoldierRaces = declension(darkSoldier.numberOfSoldiers, darkSoldier.declensionRaces)
        const declensionDarkSoldierType = declension(darkSoldier.numberOfSoldiers, darkSoldier.declensionTypeOfTroops)
        const declensionLightSoldierRaces = declension(lightSoldier.numberOfSoldiers, lightSoldier.declensionRaces)
        const declensionLightSoldierType = declension(lightSoldier.numberOfSoldiers, lightSoldier.declensionTypeOfTroops)
        const declensionAttackText = declension(darkSoldier.numberOfSoldiers, ["атакует", "атакуют", "атакуют"])

        battle.push(
          `<div class="attack">
            <span class="mySoldier">Вы</span>: 
            ${lightSoldier.numberOfSoldiers} 
            ${declensionLightSoldierRaces} 
            ${declensionLightSoldierType} 
            ${declensionAttackText}
            ${darkSoldier.numberOfSoldiers}  
            ${declensionDarkSoldierRaces} 
            ${declensionDarkSoldierType}
          </div>`
        );

        drawArmy(darkForces, enemyArmyHtml, itemArmyHTML);
        drawBattleText(battle, battleText);
      }

      darkSoldier = null;
      lightSoldier = null;
      currentSoldiers = null;
      currentEnemy = null;
    }
  };

  /**
   * Слушатели событий для выбора армий
   * @param {HTMLElement} myArmyHtml - HTML-элемент своей армии
   * @param {HTMLElement} enemyArmyHtml - HTML-элемент армии противника
   */
  const addEventListenerArmy = (myArmyHtml, enemyArmyHtml) => {
    for (let i = 0; myArmyHtml.children.length > i; i++) {
      myArmyHtml.children[i].addEventListener("click", () => {
        currentSoldiers = parseInt(myArmyHtml.children[i].id);
        actionText.textContent = "Теперь выберите отряд противника для атаки";
      });
    }

    for (let i = 0; enemyArmyHtml.children.length > i; i++) {
      enemyArmyHtml.children[i].addEventListener("click", () => {
        currentEnemy = parseInt(enemyArmyHtml.children[i].id);
        actionText.textContent = "Выбери свой отряд, который будет атаковать";
        myAction();
        enemyAction();
        addEventListenerArmy(myArmyHtml, enemyArmyHtml);
      });
    }
  };

  const checkWin = (darkForces, lightForces) => {
    if(!darkForces.length) {
      battle.push("<div class='light'>Победа сил света</div>");
      drawBattleText(battle, battleText);
      actionText.textContent = "Победа сил света";
      return true
    } else if(!lightForces.length) { 
        battle.push("<div class='dark'>Победа сил тьмы</div>")
        drawBattleText(battle, battleText)
        actionText.textContent = "Победа сил тьмы";
        return true
    }

    return false
  }


  return {
    start,
    end,
  };
};
