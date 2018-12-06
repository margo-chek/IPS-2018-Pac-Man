const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
const heroHeight = 30;
const heroWidth = 30;
let heroX = (canvas.width - heroWidth) / 2;
let heroY = (canvas.height - heroHeight) / 2;
//const intervalTime = 10;

function drawHero() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(heroX, heroY, heroWidth, heroHeight);
}

function drawFon() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  drawFon();
  drawHero();
}

window.onload = function() {
    draw();
};