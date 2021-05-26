let totalTurns = 0;
let finalTurn;
let diceCounter = [0, 0, 0, 0, 0, 0, 0];
let tagList = ["AcesVal", "DucesVal", "TreesVal", "FoursVal", "FivesVal", "SixesVal"];
let tagList2 = ["ChoiceVal", "fourofaKindVal", "FullhouseVal", "v15", "v30", "Yacht"];
let playerList = ["A"];
let playerNum;
let whosTurn = 0;

//popup창 관련
let popup = document.querySelector("#popup");
let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let four = document.querySelector("#four");
let board = document.querySelector("#board");
let scoreboard = document.querySelector('#scoreboard');

one.addEventListener("click", () => {
  popup.classList.add("popupClose");
  playerNum = 1;
  addPlayer();
  appendListener();
  finalTurn = playerNum * 12;

  //size 조절
  let size = 85 * (playerNum - 1) + 250;
  scoreboard.setAttribute("style", "width: " + size + "px");
  board.classList.add('fade-in');
})

two.addEventListener("click", () => {
  popup.classList.add("popupClose");
  playerNum = 2;
  addPlayer();
  appendListener();
  finalTurn = playerNum * 12;

  //size 조절
  let size = 85 * (playerNum - 1) + 250;
  scoreboard.setAttribute("style", "width: " + size + "px");
  board.classList.add('fade-in');
})

three.addEventListener("click", () => {
  popup.classList.add("popupClose");
  playerNum = 3;
  addPlayer();
  appendListener();
  finalTurn = playerNum * 12;

  //size 조절
  let size = 85 * (playerNum - 1) + 250;
  scoreboard.setAttribute("style", "width: " + size + "px");
  board.classList.add('fade-in');
})

four.addEventListener("click", () => {
  popup.classList.add("popupClose");
  playerNum = 4;
  addPlayer();
  appendListener();
  finalTurn = playerNum * 12;

  //size 조절
  let size = 85 * (playerNum - 1) + 250;
  scoreboard.setAttribute("style", "width: " + size + "px");
  board.classList.add('fade-in');
})

//apply playerNum to board
let tableHead = document.querySelector("#t-head");
let tUbody = document.querySelector("#upper-body");
let tLbody = document.querySelector("#lower-body");

let nameList = ["B", "C", "D"];

function addPlayer() {
  for (let i = 0; i < (playerNum - 1); i++) {
    playerList.push(nameList[i]);
  }

  for (let i = 0; i < (playerNum - 1); i++) {
    let tHeadElement = document.createElement("th");
    tHeadElement.setAttribute("scope", "col");
    tHeadElement.id = "player" + nameList[i];
    tHeadElement.textContent = "Player " + nameList[i];
    tableHead.appendChild(tHeadElement);

    addCategories(i);

    let totalList = document.querySelector("#totalList");
    let totalElement = document.createElement("td");
    totalElement.id = "total" + nameList[i];
    totalElement.classList.add("confirm");
    totalList.appendChild(totalElement);
  }
}

function addCategories(i) {
  for (let j = 0; j < 6; j++) {
    let tUbodyRow = tUbody.children[j];
    let tUbodyElement = document.createElement("td");
    tUbodyElement.id = tagList[j] + nameList[i];
    tUbodyRow.appendChild(tUbodyElement);


    let tLbodyRow = tLbody.children[j];
    let tLbodyElement = document.createElement("td");
    tLbodyElement.id = tagList2[j] + nameList[i];
    tLbodyRow.appendChild(tLbodyElement);
  }
}
//popup창 끝


function countDice() {
  for (let dice of diceVal) {
    diceCounter[dice]++;
  }
}

function eraser(eturn) {
  for (let tagName of tagList.concat(tagList2)) {
    let blank2 = document.querySelector("#" + tagName + eturn);
    if (blank2.classList.contains("confirm") === false) blank2.textContent = "";
  }
}

function resetActive() { //마우스오버시 효과주는 active class를 주사위 굴릴때마다 전부 제거, draw할때 다시 추가
  for (let tagName of tagList.concat(tagList2)) {
    for (let turn of playerList) {
      let blank = document.querySelector("#" + tagName + turn);
      blank.classList.remove("active");
    }
  }
}

function drawScore() {
  let tbody = document.querySelector("#upper-body");
  let scoreSpace;
  let choice = 0;
  let straight = 0; let v15 = 0; let v30 = 0;

  // Upper Categories
  for (let i = 0; i < 6; i++) {
    scoreSpace = tbody.children[i].querySelector("#" + tagList[i] + playerList[whosTurn]);
    scoreSpace.classList.add("active");
    if ((scoreSpace.classList.contains("confirm")) === false) scoreSpace.textContent = (i + 1) * diceCounter[i + 1]; //confirm 아닌 경우에만 표시

    choice = choice + (i + 1) * diceCounter[i + 1];
  }

  //Lower Categories
  let player = playerList[whosTurn];
  scoreSpace = document.querySelector("#ChoiceVal" + player);
  scoreSpace.classList.add("active");
  if (scoreSpace.classList.contains("confirm") === false) scoreSpace.textContent = choice;

  scoreSpace = document.querySelector("#fourofaKindVal" + player);
  scoreSpace.classList.add("active");
  if (scoreSpace.classList.contains("confirm") === false) {
    diceCounter.some(val => val >= 4) ? choice : 0;
  };

  scoreSpace = document.querySelector("#FullhouseVal" + player);
  scoreSpace.classList.add("active");
  if (scoreSpace.classList.contains("confirm") === false) scoreSpace.textContent = fullhouseCheck();

  straight = StraightCheck();
  if (straight === 30) {
    v15 = 15; v30 = 30;
  } else if (straight === 15) {
    v15 = 15; v30 = 0;
  } else {
    v15 = 0; v30 = 0;
  }
  scoreSpace = document.querySelector("#v" + 30 + player);
  scoreSpace.classList.add("active");
  if (scoreSpace.classList.contains("confirm") === false) scoreSpace.textContent = v30;
  scoreSpace = document.querySelector("#v" + 15 + player);
  scoreSpace.classList.add("active");
  if (scoreSpace.classList.contains("confirm") === false) scoreSpace.textContent = v15;

  scoreSpace = document.querySelector("#Yacht" + player);
  scoreSpace.classList.add("active");
  scoreSpace.textContent = diceCounter.indexOf(5) > 0 ? 50 : 0;

  diceCounter = [0, 0, 0, 0, 0, 0, 0]; // 카운터 초기화
}

function fullhouseCheck() {
  let num2 = 0;
  let num3 = 0;
  let fullhouse = 0;

  for (let i = 1; i <= 6; i++) {
    if (diceCounter[i] === 2) {
      num2 = i * 2;
    } else if (diceCounter[i] === 3) {
      num3 = i * 3;
    }
  }

  if (num2 && num3) fullhouse = num2 + num3
  return fullhouse;
}

function StraightCheck() {
  let isStart = false;
  let straight = 0;
  let maxLength = 0;

  // 1 0 1 1 1 1
  // 1 1 1 1 1 0 <-- 주사위값 6 체크할때 straight값을 0으로 처리해버리는 문제
  // 1 1 1 1 0 0
  for (let val of diceCounter.slice(1, 7)) {
    if (isStart === true && val === 0) straight = 0;
    if (val > 0) {
      isStart = true;
      straight++;
      if (straight > maxLength) maxLength = straight;
    }
  }

  return maxLength >= 4 ? maxLength >= 5 ? 30 : 15 : 0;
}

function updateTotal(turn) {
  let totalElement = document.querySelector("#total" + turn);
  let total = 0;

  for (let tagName of tagList.concat(tagList2)) {
    let element = document.querySelector("#" + tagName + turn);
    if (element.classList.contains("confirm")) total += parseFloat(element.textContent);
  }

  totalElement.textContent = total;
}

function saveRecords(record) {
  let lastRecords = localStorage.getItem("records");
  let records = [];
  if (lastRecords) { //don't parse if lastRecords is empty
    records = JSON.parse(lastRecords);
  }
  records.push(record);
  records = records.sort((a, b) => {
    return b.score - a.score;
  });
  for (let i = records.length; i >= 10; i--) { //delete except top 10
    records[i].pop;
  }
  localStorage.setItem("records", JSON.stringify(records));
}

function endGame() {
  let finalScores = [];//최종 점수들 기록
  for (let i = 0; i < playerNum; i++)
    finalScores.push(parseInt(document.querySelector("#total" + playerList[i]).textContent));
  let winnerScore = Math.max.apply(null, finalScores);//최고점 찾기

  let winners = [];//최고점이랑 같은 점수 가진 사람들(동점자 발생 대비)
  let fromIndex = finalScores.indexOf(winnerScore);
  while (fromIndex != -1) {
    winners.push(playerList[fromIndex]);
    fromIndex = finalScores.indexOf(winnerScore, fromIndex + 1);
  }

  let now = new Date();
  let time = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + ("0" + now.getHours()).slice(-2) + ':' + ("0" + now.getMinutes()).slice(-2);//시, 분 한자리 일 때 앞에 0 채우기
  let record = {
    time: time,
    score: winnerScore
  };
  saveRecords(record);

  document.querySelector("#winnerMsg").textContent = "플레이어 " + winners.join(', ') + "가 우승했습니다!";
  document.querySelector("#winnerScore").textContent = "최고점: " + winnerScore + "점";
  let endPopup = document.querySelector("#endPopup")
  endPopup.classList.remove("popupClose");
  endPopup.classList.add("fade-in");
}

//listener
let isTurn = false;
function appendListener() {
  for (let tagName of tagList.concat(tagList2)) {
    for (let turn of playerList) {
      let blank = document.querySelector("#" + tagName + turn);
      blank.addEventListener("click", () => {
        if (blank.classList.contains("confirm")) return; // 확정 되면 눌러도 반응X
        if (!isTurn) return; // 턴이 아니면 눌러도 반응x
        if (turn != playerList[whosTurn]) return; //자신 턴 아니면 반응x
        blank.className = "confirm bg-info";
        updateTotal(turn);
        isTurn = false;
        document.querySelector("#player" + playerList[whosTurn]).classList.remove("bg-primary");//현재턴 사람 지우기
        whosTurn = ++whosTurn % playerNum;
        document.querySelector("#player" + playerList[whosTurn]).classList.add("bg-primary");//자기턴인지 표시
        if (rolled > 2) {
          rollButton.disabled = false;
        }
        for (var k = 0; k < 5; k++) {
          diceHold[k].checked = false;
        }
        if (++totalTurns === finalTurn) endGame();
        init();
        resetActive();
        eraser(turn);
      })
    }
  }
}

/*dice.js*/
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

window.onload = function () {
  init();
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
      diceIcon[i].setAttribute("class", "bi bi-dice-" + randomNum + "-fill");
      diceVal[i] = randomNum;
      dices[i].classList.add('rotate');
    }
  }
  setTimeout(() => {
    dices.forEach(dice => dice.classList.remove('rotate'));
  }, 500);


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