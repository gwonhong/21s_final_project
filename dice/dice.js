var cwidth = 1000;
var cheight = 1000;
var dicex = 50;
var dicey = 50;
var diceWidth = 100;
var diceHeight = 100;
var dotrad = 6;
var ctx;

function init() {
    for(var j = 0; j<6; j++){
        var ch = 1 + Math.floor(Math.random() * 6);
        drawFace(ch, j);
    }
}

function drawFace(n, i) {
    ctx = document.getElementById("canvas").getContext("2d");
    ctx.lineWidth = 5;
    ctx.clearRect(dicex+150*i, dicey, diceWidth, diceHeight);
    ctx.strokeRect(dicex+150*i, dicey, diceWidth, diceHeight);
    ctx.fillStyle = "#009966";

    switch(n) {
        case 1:
            draw1(i);
            break;

        case 2:
            draw2(i);
            break;

        case 3:
            draw2(i);
            draw1(i);
            break;

        case 4:
            draw4(i);
            break;

        case 5:
            draw4(i);
            draw1(i);
            break;

        case 6:
            draw4(i);
            draw2mid(i);
            break;
    }
}

function draw1(i) {
    var dotx;
    var doty;

    ctx.beginPath();

    dotx = dicex+150*i + 0.5 * diceWidth;
    doty = dicey + 0.5 * diceHeight;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();
}

function draw2(i) {
    var dotx;
    var doty;

    ctx.beginPath();

    dotx = dicex+150*i + 3 * dotrad;
    doty = dicey + 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    dotx = dicex+150*i + diceWidth - 3 * dotrad;
    doty = dicey + diceHeight - 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();
}

function draw4(i) {
    var dotx;
    var doty;

    ctx.beginPath();

    dotx = dicex+150*i + 3 * dotrad;
    doty = dicey + 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    dotx = dicex+150*i + diceWidth - 3 * dotrad;
    doty = dicey + diceHeight - 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();
    ctx.beginPath();

    dotx = dicex+150*i + 3 * dotrad;
    doty = dicey + diceHeight - 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    dotx = dicex+150*i + diceWidth - 3 * dotrad;
    doty = dicey + 3 * dotrad;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();
}

function draw2mid(i) {
    var dotx;
    var doty;

    ctx.beginPath();

    dotx = dicex+150*i + 3 * dotrad;
    doty = dicey + 0.5 * diceHeight;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    dotx = dicex+150*i + diceWidth - 3 * dotrad;
    doty = dicey + 0.5 * diceHeight;
    ctx.arc(dotx, doty, dotrad, 0, Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();
}

function throwDices() {
    for(var j = 0; j<6; j++){
        var ch = 1 + Math.floor(Math.random() * 6);
        drawFace(ch, j);
    }
}