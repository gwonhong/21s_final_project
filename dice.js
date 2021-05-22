let diceIcon = [];
let diceHold = [];
let rolled = 0;
let diceVal = [];
let rollButton = document.getElementById("rollButton");
let chanceText= document.getElementById("chanceText");

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
  chanceText.textContent="총 3번 굴릴 수 있습니다!";
  rolled = 0;
}

function drawFace(n, i) {


  switch (n) {
    case 1:
      diceIcon[i].setAttribute("class", "bi bi-dice-1-fill");
      diceVal[i] = 1;
      break;

    case 2:
      diceIcon[i].setAttribute("class", "bi bi-dice-2-fill");
      diceVal[i] = 2;
      break;

    case 3:
      diceIcon[i].setAttribute("class", "bi bi-dice-3-fill");
      diceVal[i] = 3;
      break;

    case 4:
      diceIcon[i].setAttribute("class", "bi bi-dice-4-fill");
      diceVal[i] = 4;
      break;

    case 5:
      diceIcon[i].setAttribute("class", "bi bi-dice-5-fill");
      diceVal[i] = 5;
      break;

    case 6:
      diceIcon[i].setAttribute("class", "bi bi-dice-6-fill");
      diceVal[i] = 6;
      break;
  }

}

function throwDices() {
  isTurn = false;
  for (let i = 0; i < 5; i++) {
    diceHold[i].disabled = false;
  }
  for (let i = 0; i < 5; i++) {
    if (!diceHold[i].checked) {
      let randomNum = 1 + Math.floor(Math.random() * 6);
      drawFace(randomNum, i);
    }
  }
  rolled++;
  console.log("bn");
  if(rolled===1){
    chanceText.textContent="2번 남았습니다!";
  }
  else if(rolled===2){
    chanceText.textContent="1번 남았습니다!";
  }
  if (rolled > 2) {
    rollButton.disabled = true;
    for (let i = 0; i < 5; i++) {
      diceHold[i].setAttribute("disabled", "");
    }
    chanceText.textContent="점수판에 클릭해서 기록해주세요!";
  }
  countDice();
  drawScore();
  isTurn = true;
}