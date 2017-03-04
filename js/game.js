const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var isOver = false;
var mouse = {x: 135, y: 185};
var rattraps = [];
var intervalID;

const mouseImg = new Image();
const rattrapImg = new Image();


mouseImg.src = 'http://peps-deratisation.com/images/icon_27457-300x300.png';
rattrapImg.src = 'http://i0.hdslb.com/bfs/archive/b1a3cf16937a21eefb6189f5df474201f86ff678.jpg';

const up = 38, down = 40, left = 37, right = 39;
const pressedKeys = {};

intervalID = setInterval(changeY, 10);

function changeY() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveMouse();
    creatMouse(mouse.x, mouse.y);
    randomChips();
    isTouch();
    if (isOver) Over();

}

function creatMouse(x, y) {
    ctx.drawImage(mouseImg, x, y, 40, 40);
}

function creatRattrap(x, y) {
    ctx.drawImage(rattrapImg, x, y, 40, 40);
}

function randomChips() {
    var newChips = rattraps.filter(rattrap => rattrap.y < canvas.height);
    rattraps = newChips;
    var x1 = parseInt(Math.random() * canvas.width);
    ctx.fillStyle = "pink";
    if (x1 % 20 === 0) {
        rattraps.push({x: x1, y: -5});
    }

    for (var i = 0; i < rattraps.length; i++) {
        rattraps[i].y += 1;
        creatRattrap(rattraps[i].x, rattraps[i].y);
    }

}

function moveMouse() {

    if (pressedKeys[left]) { //左
        if (mouse.x === 0) {
            mouse.x = canvas.width - 30;
        }
        else {
            mouse.x -= 5;
        }

    }
    else if (pressedKeys[up] && mouse.y > 0) { // 上
        mouse.y -= 5;
    }
    else if (pressedKeys[right]) { //右
        if (mouse.x === canvas.width - 30) {
            mouse.x = 0;
        }
        else {
            mouse.x += 5;
        }

    }
    else if (pressedKeys[down] && mouse.y < canvas.height - 40) { //下
        mouse.y += 5;
    }

}

function isTouch() {
    for (var i = 0; i < rattraps.length; i++) {
        if (Math.abs(rattraps[i].x - mouse.x) <= 30 && Math.abs(rattraps[i].y - mouse.y) <= 30) {
            isOver = true;

        }
    }
    return isOver;
}

$(document).keydown(function (event) {
    if (event.keyCode === up
        || event.keyCode === down
        || event.keyCode === left
        || event.keyCode === right) {
        pressedKeys[event.keyCode] = true;
    }
});

$(document).keyup(function (event) {
    if (event.keyCode === up
        || event.keyCode === down
        || event.keyCode === left
        || event.keyCode === right) {
        pressedKeys[event.keyCode] = false;
    }
});

function Over(isOver) {
    clearInterval(intervalID);
    showMessage();
}

function showMessage() {
    ctx.fillStyle = "#FF7043"
    ctx.font = "50px Arial";
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
} 