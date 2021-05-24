let diceIcon = [];
let diceHold = [];
let rolled = 0;
let diceVal = [];
let rollButton = document.getElementById("rollButton");
let chanceText = document.getElementById("chanceText");
let dices = document.querySelectorAll('label');

diceIcon[0] = document.getElementById("1d")
diceIcon[1] = document.getElementById("2d")
diceIcon[2] = document.getElementById("3d")
diceIcon[3] = document.getElementById("4d")
diceIcon[4] = document.getElementById("5d")
diceHold[0] = document.querySelector("#\\31 dc");
diceHold[1] = document.querySelector("#\\32 dc");
diceHold[2] = document.querySelector("#\\33 dc");
diceHold[3] = document.querySelector("#\\34 dc");
diceHold[4] = document.querySelector("#\\35 dc");

function init() {
  for (let i = 0; i < 5; i++) {
    diceIcon[i].setAttribute("class", "bi bi-question-square");
  }
  for (let i = 0; i < 5; i++) {
    diceHold[i].disabled = true;
  }
  chanceText.textContent = "총 3번 굴릴 수 있습니다!";
  rolled = 0;
}

function throwDices() {
  isTurn = false;
  for (let i = 0; i < 5; i++) {
    diceHold[i].disabled = false;
  }
  for (let i = 0; i < 5; i++) {
    if (!diceHold[i].checked) {
      let randomNum = 1 + Math.floor(Math.random() * 6);

      /*drawface*/
      diceIcon[i].setAttribute("class", "bi bi-dice-" + randomNum + "-fill rotate");
      diceVal[i] = randomNum;
      dices[i].classList.add('rotate');
    }
    setTimeout(() => {
      dices.forEach(element=>element.classList.remove('rotate'));
    }, 800);
  }

  rolled++;
  if (rolled === 1) {
    chanceText.textContent = "2번 남았습니다!";
  }
  else if (rolled === 2) {
    chanceText.textContent = "1번 남았습니다!";
  }
  else if (rolled === 3) {
    rollButton.disabled = true;
    for (let i = 0; i < 5; i++) {
      diceHold[i].setAttribute("disabled", "");
    }
    chanceText.textContent = "점수판에 클릭해서 기록해주세요!";
  }
  countDice();
  drawScore();
  isTurn = true;
}