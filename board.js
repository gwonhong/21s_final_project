let diceList = [];
let diceCounter = [0, 0, 0, 0, 0, 0, 0];
let tagList = ["AcesVal", "DucesVal", "TreesVal", "FoursVal", "FivesVal", "SixesVal"];
let tagList2 = ["ChoiceVal", "fourofaKindVal", "FullhouseVal", "v15", "v30", "Yacht"];
let playerList = ["A"];
let playerNum;
let whosTurn = 0;
let maxRole = 3;

//popup창 관련
let popup = document.querySelector("#popup");
let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let four = document.querySelector("#four");
let board = document.querySelector("#board");
let scoreboard = document.querySelector('#scoreboard');

one.addEventListener("click", () => {
  popup.remove();
  playerNum = 1;
  addPlayer();
  appendListener();

  //size 조절
  let size = 85 * (playerNum - 1) + 250;
  scoreboard.setAttribute("style", "width: " + size + "px");
  board.classList.add('fade-in');
})

two.addEventListener("click", () => {
  popup.remove();
  playerNum = 2;
  addPlayer();
  appendListener();

  //size 조절
  let size = 85 * (playerNum - 1) + 250;
  scoreboard.setAttribute("style", "width: " + size + "px");
  board.classList.add('fade-in');
})

three.addEventListener("click", () => {
  popup.remove();
  playerNum = 3;
  addPlayer();
  appendListener();

  //size 조절
  let size = 85 * (playerNum - 1) + 250;
  scoreboard.setAttribute("style", "width: " + size + "px");
  board.classList.add('fade-in');
})

four.addEventListener("click", () => {
  popup.remove();
  playerNum = 4;
  addPlayer();
  appendListener();

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
  console.log(diceCounter);
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
  if ((scoreSpace.classList.contains("confirm")) === false) scoreSpace.textContent = choice;

  scoreSpace = document.querySelector("#fourofaKindVal" + player);
  scoreSpace.classList.add("active");
  scoreSpace.textContent = (!(scoreSpace.classList.contains("confirm"))) && diceCounter.some(val => { val >= 4; }) ? choice : 0;

  scoreSpace = document.querySelector("#FullhouseVal" + player);
  scoreSpace.classList.add("active");
  if ((scoreSpace.classList.contains("confirm")) === false) scoreSpace.textContent = fullhouseCheck();

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
  if ((scoreSpace.classList.contains("confirm")) === false) scoreSpace.textContent = v30;
  scoreSpace = document.querySelector("#v" + 15 + player);
  scoreSpace.classList.add("active");
  if ((scoreSpace.classList.contains("confirm")) === false) scoreSpace.textContent = v15;

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
  console.log(total);
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
        console.log("ClickedSpace: " + tagName + " now: " + turn + " next: " + playerList[whosTurn]);
        if (rolled > 2) {
          rollButton.disabled = false;
        }
        for (var k = 0; k < 5; k++) {
          diceHold[k].checked = false;
        }
        init();
        eraser(turn);
      })
    }
  }
}