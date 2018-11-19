const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
const blockageWidth = 20;
const blockageHeight = 20;
const heroWidth = 20;
const heroHeight = 20;
let x = canvas.width / 2;
let y = canvas.height - blockageHeight;
const dx = 2;
const dy = 2;
let rightPressed = false;
let leftPressed = false;
let topPressed = false;
let bottomPressed = false;
const rightKeyCode = 39;
const leftKeyCode = 37;
const topKeyCode = 38;
const bottomKeyCode = 40;
const STEP = 100;
 
let field = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
 
/*
field = field.reduce((acc, row) => {
    row = row.reduce((accRow, value) => {
        accRow.push(value, value);
        return accRow;
    }, [])
    acc.push(row, row);
    return acc;
}, []);
*/
 
function clearFon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
 
function drawBlockage() {
    let blockageX = 0;
    let blockageY = 0;
    const dBlockageX = 20;
    const dBlockageY = 20;
    field.forEach(item => {
        item.forEach(number => {
            ctx.fillStyle = number === 1 ? 'brown' : 'green';
            ctx.fillRect(blockageX, blockageY, blockageWidth, blockageHeight);
            blockageX += dBlockageX;
        });
        blockageX = 0;
        blockageY += dBlockageY;
    });
}
 
function Hero({
    heroX,
    heroY,
    heroR
}) {
    this.x = Math.round(heroX);
    this.y = Math.round(heroY);
    this.r = heroR;
}
 
function drawHero(hero) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(hero.x, hero.y, heroWidth, heroHeight);
}
 
let keysMap  = { up: false, down: false, left: false, right: false};

function keyDownHandler(e) {
    if (e.keyCode === rightKeyCode) {
        keysMap.right = true;
    } 
    if (e.keyCode === leftKeyCode) {
        leftPressed = true;
    }
    if (e.keyCode === topKeyCode) {
        topPressed = true;
    }
    if (e.keyCode === bottomKeyCode) {
        bottomPressed = true;
    }
}
 
function keyUpHandler(e) {
    if (e.keyCode === rightKeyCode) {
        keysMap.right = false;
    }
    if (e.keyCode === leftKeyCode) {
        leftPressed = false;
    }
    if (e.keyCode === topKeyCode) {
        topPressed = false;
    }
    if (e.keyCode === bottomKeyCode) {
        bottomPressed = false;
    }
}
 
function drawHero(hero) {
    hero.r = 6;
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc((hero.x + heroWidth / 2), (hero.y + heroHeight / 2), hero.r, 0, Math.PI * 2);
    ctx.fill();
}
 
function redraw(hero) {
    clearFon();
    drawBlockage();
    drawHero(hero);
}
 
function getHeroIndex(hero, heroStep) {
    let row;
    let column;
    if (keysMap.right) {
        row = Math.floor(hero.y / blockageHeight);
        column = Math.ceil((hero.x + heroStep + heroWidth) / blockageWidth) - 1
    } else if (leftPressed) {
        row = Math.floor(hero.y / blockageHeight);
        column = Math.ceil((hero.x - heroStep) / blockageWidth) - 1
    } else if (bottomPressed) {
        row = Math.ceil((hero.y + heroStep + heroHeight) / blockageHeight - 1);
        column = Math.floor(hero.x / blockageWidth)
    } else if (topPressed) {
        row = Math.ceil((hero.y - heroStep) / blockageHeight) - 1;
        column = Math.floor(hero.x / blockageWidth)
    } else {
        row = Math.ceil(hero.y / blockageHeight);
        column = Math.ceil(hero.x / blockageWidth)
    }

    return { row: row, column: column };
}
 
function isCollision(hero, heroStep) {
    let deltaX = 0;
    let deltaY = 0;
    let pos = getHeroIndex(hero, heroStep);
    if ((pos.row >= 30) || (pos.row < 0) || (pos.column >= 40) || (pos.column < 0)) {

        return true;
    } else {
        let elem = field[pos.row][pos.column];
 
        if (elem === 1) {
            hero.x = Math.round(hero.x / 20) * 20;
            hero.y = Math.round(hero.y / 20) * 20;
 
            return true;
        }
 
        return false;
    }
}
 
function update(hero, deltaTime) {
    let heroStep = STEP * deltaTime;
    if (isCollision(hero, heroStep)) {

        return;
    }
    else {
        if (rightPressed) {
            hero.x += heroStep;
        }
        if (leftPressed) {
            hero.x -= heroStep;
        }
        if (bottomPressed) {
            hero.y += heroStep;
        }
        if (topPressed) {
            hero.y -= heroStep;
        }
    }
 
    hero.x = Math.round(hero.x);
    hero.y = Math.round(hero.y);
    console.log(hero.x, hero.y);
}
 
function main() {
 
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
 
    const heroX = (canvas.width - heroWidth) / 2 + 10;
    const heroY = (canvas.height - heroHeight) / 2 - 10;
    const hero = new Hero({ heroX, heroY });
    redraw(hero);
    let lastTimeStamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimeStamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimeStamp = currentTimeStamp;
 
        update(hero, deltaTime);
 
        redraw(hero);
 
        requestAnimationFrame(animateFn);
    }
 
    animateFn();
}
 
window.onload = () => {
    main();
}