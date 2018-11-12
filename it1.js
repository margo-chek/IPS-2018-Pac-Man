const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
let x = canvas.width / 2;
let y = canvas.height - 30;
const dx = 2;
const dy = 2;
const heroHeight = 30;
const heroWidth = 30;
let heroX = (canvas.width - heroWidth) / 2;
let heroY = (canvas.height - heroHeight) / 2;
let rightPressed = false;
let leftPressed = false;
let topPressed = false;
let spacePressed = false;
const rightKeyCode = 39;
const leftKeyCode = 37;
const topKeyCode = 38;
const bottomKeyCode = 40;
const intervalTime = 10;
const step = 7;

function keyDownHandler(e) {
  if (e.keyCode === rightKeyCode) {
    rightPressed = true;
  } else if (e.keyCode === leftKeyCode) {
    leftPressed = true;
  } else if (e.keyCode === topKeyCode) {
    topPressed = true;
  } else if (e.keyCode === bottomKeyCode) {
    bottomPressed = true;
  } else if (e.keyCode === spaceKeyCode) {
    spacePressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === rightKeyCode) {
    rightPressed = false;
  } else if (e.keyCode === leftKeyCode) {
    leftPressed = false;
  } else if (e.keyCode === topKeyCode) {
    topPressed = false;
  } else if (e.keyCode === bottomKeyCode) {
    bottomPressed = false;
  } else if (e.keyCode === spaceKeyCode) {
    spacePressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function drawHero() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(heroX, heroY, heroWidth, heroHeight);
  }
  
/*
function drawHero() {
  ctx.beginPath();
  ctx.fillRect(heroX, heroY, heroWidth, heroHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
*/

function drawFon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  drawFon();
  drawHero();
  if (rightPressed && heroX < canvas.width - heroWidth) {
    heroX += step;
  } else if (leftPressed && heroX > 0) {
    heroX -= step;
  }
  if (bottomPressed && heroY < canvas.height - heroHeight) {
    heroY += step;
  } else if (topPressed && heroY > 0) {
    heroY -= step;
  }
  x += dx;
  y += dy;
}

setInterval(draw, intervalTime);