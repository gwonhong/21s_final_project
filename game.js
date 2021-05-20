let diceList = [];
let diceCounter = [0, 0, 0, 0, 0, 0, 0];
let tagList = ["AcesVal", "DucesVal", "TreesVal", "FoursVal", "FivesVal", "SixesVal"];
let tagList2 = ["ChoiceVal", "fourofaKindVal", "FullhouseVal", "v15", "v30", "Yacht"];
let playerList = ["A"];
let playerNum;
let whosTurn = 0;
let maxRole = 3;

function countDice() {
  for (let dice of dv) {
    diceCounter[dice]++;
  }
}

function eraser(eturn) {
  for (let tagName of tagList.concat(tagList2)) {
    let blank2 = document.querySelector("#" + tagName + eturn);
    if (!blank2.className) blank2.textContent = "";
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
    if (!scoreSpace.className) scoreSpace.textContent = diceCounter[i + 1]; // class에 암것도 없으면 draw
    else console.log('Oops this value is confirmed');

    choice = choice + (i + 1) * diceCounter[i + 1];
  }

  //Lower Categories
  let player = playerList[whosTurn];
  scoreSpace = document.querySelector("#ChoiceVal" + player);
  if (!scoreSpace.className) scoreSpace.textContent = choice;

  scoreSpace = document.querySelector("#fourofaKindVal" + player);
  scoreSpace.textContent = !scoreSpace.className && diceCounter.some(val => { val >= 4; }) ? choice : 0;

  scoreSpace = document.querySelector("#FullhouseVal" + player);
  if (!scoreSpace.className) scoreSpace.textContent = fullhouseCheck();

  straight = StraightCheck();
  if (straight === 30) {
    v15 = 15; v30 = 30;
  } else if (straight === 15) {
    v15 = 15; v30 = 0;
  } else {
    v15 = 0; v30 = 0;
  }
  scoreSpace = document.querySelector("#v" + 30 + player);
  if (!scoreSpace.className) scoreSpace.textContent = v30;
  scoreSpace = document.querySelector("#v" + 15 + player);
  if (!scoreSpace.className) scoreSpace.textContent = v15;

  scoreSpace = document.querySelector("#Yacht" + player);
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

  for (let val of diceCounter.slice(1, 7)) {
    if (isStart === true && val === 0) break;
    if (val > 0) {
      isStart = true;
      straight++;
    }
  }

  return straight >= 4 ? straight >= 5 ? 30 : 15 : 0;
}


//listener
let isTurn = false;
function appendListener() {
  for (let tagName of tagList.concat(tagList2)) {
    for (let turn of playerList) {
      let blank = document.querySelector("#" + tagName + turn);
      blank.addEventListener("click", () => {
        if (blank.className) return; // 확정 되면 눌러도 반응X
        if (!isTurn) return; // 턴이 아니면 눌러도 반응x
        if (turn != playerList[whosTurn]) return; //자신 턴 아니면 반응x
        blank.className = "confirm bg-info";
        isTurn = false;
        whosTurn = ++whosTurn % playerNum;
        console.log("ClickedSpace: " + tagName + " now: " + turn + " next: " + playerList[whosTurn]);
        if(bn>2){
          dtx.disabled = false;
        }
        for(var k = 0; k<5; k++){
          chk[k].checked = false;
        }
        init();
        eraser(turn);
      })
    }
  }
}