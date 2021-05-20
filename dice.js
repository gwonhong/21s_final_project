var cwidth = 1000;
var cheight = 1000;
var dicex = 50;
var dicey = 50;
var diceWidth = 100;
var diceHeight = 100;
var dotrad = 6;
var ctx = [];
var chk = [];
var dtx;
var bn = 0;
var dv = [];

function init() {
    for(var j = 0; j<5; j++){
        var ch = 1 + Math.floor(Math.random() * 6);
        drawFace(ch, j);
    }
    console.log("abc");
    
    dtx.disabled = false;
    for(var k = 0; k<5; k++){
      chk[k].disabled = false;
    }

    bn = 0;
}

function drawFace(n, i) {
    ctx[0] = document.getElementById("1d")
    ctx[1] = document.getElementById("2d")
    ctx[2] = document.getElementById("3d")
    ctx[3] = document.getElementById("4d")
    ctx[4] = document.getElementById("5d")
    //console.log("adfasdf");
    //console.log(ctx);

    switch(n) {
        case 1:
            ctx[i].setAttribute("class", "bi bi-dice-1-fill me-1");
            dv[i] = 1;
            break;

        case 2:
            ctx[i].setAttribute("class", "bi bi-dice-2-fill me-1");
            dv[i] = 2;
            break;

        case 3:
            ctx[i].setAttribute("class", "bi bi-dice-3-fill me-1");
            dv[i] = 3;
            break;

        case 4:
            ctx[i].setAttribute("class", "bi bi-dice-4-fill me-1");
            dv[i] = 4;
            break;

        case 5:
            ctx[i].setAttribute("class", "bi bi-dice-5-fill me-1");
            dv[i] = 5;
            break;

        case 6:
            ctx[i].setAttribute("class", "bi bi-dice-6-fill me-1");
            dv[i] = 6;
            break;
    }
    countDice();
    drawScore();
    isTurn = true;
}

function throwDices() {

    isTurn = false;
    
    chk[0] = document.querySelector("#\\31 dc");
    chk[1] = document.querySelector("#\\32 dc");
    chk[2] = document.querySelector("#\\33 dc");
    chk[3] = document.querySelector("#\\34 dc");
    chk[4] = document.querySelector("#\\35 dc");
    for(var j = 0; j<5; j++){
        if(!chk[j].checked){
            var ch = 1 + Math.floor(Math.random() * 6);
            drawFace(ch, j);
        }
    }
    bn++;
    console.log("bn");
    if(bn>1){
        dtx = document.getElementById("dice_button")
        dtx.setAttribute("disabled", "");
        for(var k = 0; k<5; k++){
            chk[k].setAttribute("disabled", "");
        }
        
    }
}