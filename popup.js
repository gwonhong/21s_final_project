//popup input to playerNum
let popup = document.querySelector("#popup");
let closeMenu = document.querySelector("#confirmBtn");
let board = document.querySelector("#board");
let form = document.querySelector("#Input1");

//popUp창 닫는 리스너
closeMenu.addEventListener("click", () => {
  popup.remove();
  if (form.value === "") playerNum = 1;
  else playerNum = form.value;
  addPlayer();
  appendListener();

  //size 조절
  let size = 85 * (playerNum - 1) + 1000;
  board.setAttribute("style", "width: " + size + "px");
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
    tHeadElement.textContent = "Player " + nameList[i];
    tableHead.appendChild(tHeadElement);

    addCategories(i);

    let totalList = document.querySelector("#totalList");
    let totalElement = document.createElement("td");
    totalElement.id = "total" + nameList[i];
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