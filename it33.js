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
 
let direction = { OY: true, OX: false };
 
let keysMap = {
    left: false,
    right: false,
    up: false,
    down: false
};
 
function keyDownHandler(e) {
    if (e.keyCode === rightKeyCode) {
        if (direction.OY && keysMap.left) keysMap.left = false;
 
        keysMap.right = true;
    }
    if (e.keyCode === leftKeyCode) {
        if (direction.OY && keysMap.right) keysMap.right = false;
 
        keysMap.left = true;
    }
    if (e.keyCode === topKeyCode) {
        if (direction.OX && keysMap.down) keysMap.down = false;
 
        keysMap.up = true;
    }
    if (e.keyCode === bottomKeyCode) {
        if (direction.OX && keysMap.up) keysMap.up = false;
 
        keysMap.down = true;
    }
}
 
function getHeroIndex(hero) {
    let row = Math.floor(hero.y / blockageHeight);
    let column = Math.floor(hero.x / blockageWidth);
 
    return { row: row, column: column };
}
 
function update(hero, deltaTime) {
    let heroStep = STEP * deltaTime;
 
    let collision = checkCollision(hero, heroStep);
 
    updateDirection(hero, collision);
    updatePosition(hero, heroStep);
}
 
function checkCollision(hero) {
    let indexes = getHeroIndex(hero);
    let collideSides = { left: false, right: false, up: false, down: false };
 
    if (keysMap.left && field[indexes.row][indexes.column] === 1) {
        collideSides.left = true;
 
        if (direction.OX) {
            keysMap.left = false;
            keysMap.up = false;
            keysMap.down = false;
 
            hero.y = indexes.row * 20;
            hero.x = (indexes.column + 1) * 20;
        }
    }
    if (keysMap.right && field[indexes.row][indexes.column + 1] === 1) {
        collideSides.right = true;
 
        if (direction.OX) {
            keysMap.right = false;
            keysMap.up = false;
            keysMap.down = false;
 
            hero.y = indexes.row * 20;
            hero.x = indexes.column * 20;
        }
    }
    if (keysMap.up && field[indexes.row][indexes.column] === 1) {
        collideSides.up = true;
 
        if (direction.OY) {
            keysMap.up = false;
            keysMap.left = false;
            keysMap.right = false;
 
            hero.y = (indexes.row + 1) * 20;
            hero.x = indexes.column * 20;
        }
    }
    if (keysMap.down && field[indexes.row + 1][indexes.column] === 1) {
        collideSides.down = true;
 
        if (direction.OY) {
            keysMap.down = false;
            keysMap.left = false;
            keysMap.right = false;
 
            hero.y = indexes.row * 20;
            hero.x = indexes.column * 20;
        }
    }
 
    return collideSides;
}
 
function updateDirection(collision) {
    if (direction.OY && (keysMap.left || keysMap.right)) {
        if ((keysMap.left && !collision.left)
            || (keysMap.right && !collision.right)) {
            direction.OY = false;
            direction.OX = true;
 
            keysMap.up = false;
            keysMap.down = false;
        }
 
        return;
    }
 
    if (direction.OX && (keysMap.up || keysMap.down)) {
        if ((keysMap.up && !collision.up)
            || (keysMap.down && !collision.down)) {
            direction.OX = false;
            direction.OY = true;
 
            keysMap.left = false;
            keysMap.right = false;
        }
    }
}
 
function updatePosition(hero, heroStep) {
    if (direction.OY) {
        if (!keysMap.up && !keysMap.down) return;
 
        if (keysMap.up) {
            hero.y -= heroStep;
        }
        if (keysMap.down) {
            hero.y += heroStep;
        }
 
        return;
    }
 
 
    if (!keysMap.left && !keysMap.right) return;
 
    if (keysMap.left) {
        hero.x -= heroStep;
    }
    if (keysMap.right) {
        hero.x += heroStep;
    }
}
 
function main() {
    document.addEventListener('keydown', keyDownHandler, false);
 
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