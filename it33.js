const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
const blockageWidth = 20;
const blockageHeight = 20;
const heroWidth = 20;
const heroHeight = 20;
const enemyWidth = 20;
const enemyHeight = 20;
const rightKeyCode = 39;
const leftKeyCode = 37;
const topKeyCode = 38;
const bottomKeyCode = 40;

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
    hero.r = 6;
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc((hero.x + heroWidth / 2), (hero.y + heroHeight / 2), hero.r, 0, Math.PI * 2);
    ctx.fill();
}

function Enemy({
    enemyX,
    enemyY
}) {
    this.x = Math.round(enemyX);
    this.y = Math.round(enemyY);
}

function drawEnemy(enemy) {
    ctx.fillStyle = "blue";
    ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
}

function redraw(hero, enemy) {
    clearFon();
    drawBlockage();
    drawHero(hero);
    drawEnemy(enemy);
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
        if (keysMap.left) keysMap.left = false;

        keysMap.right = true;
    }
    if (e.keyCode === leftKeyCode) {
        if (keysMap.right) keysMap.right = false;

        keysMap.left = true;
    }
    if (e.keyCode === topKeyCode) {
        if (keysMap.down) keysMap.down = false;

        keysMap.up = true;
    }
    if (e.keyCode === bottomKeyCode) {
        if (keysMap.up) keysMap.up = false;

        keysMap.down = true;
    }
}

function getHeroIndex(hero, heroStep = 0) {
    let deltaOX = 0;
    if (direction.OX)
        deltaOX = keysMap.left ? -heroStep : keysMap.right ? heroStep : 0;

    let deltaOY = 0;
    if (direction.OY)
        deltaOY = keysMap.up ? -heroStep : keysMap.down ? heroStep : 0;

    let row = Math.floor((hero.y + deltaOY) / blockageHeight);
    let rowWide = Math.floor((hero.y + 19 + deltaOY) / blockageHeight);
    let column = Math.floor((hero.x + deltaOX) / blockageWidth);
    let columnWide = Math.floor((hero.x + 19 + deltaOX) / blockageWidth);

    return { row: row, rowWide: rowWide, column: column, columnWide: columnWide };
}

function checkCollision(hero, heroStep) {
    let indexes = getHeroIndex(hero, heroStep);
    let collideSides = {
        left: false,
        right: false,
        up: false,
        down: false
    };

    if (field[indexes.row][indexes.column] === 1 || field[indexes.rowWide][indexes.column] === 1) collideSides.left = true;
    if (field[indexes.row][indexes.columnWide] === 1 || field[indexes.rowWide][indexes.columnWide] === 1) collideSides.right = true;
    if (field[indexes.row][indexes.column] === 1 || field[indexes.row][indexes.columnWide] === 1) collideSides.up = true;
    if (field[indexes.rowWide][indexes.column] === 1 || field[indexes.rowWide][indexes.columnWide] === 1) collideSides.down = true;

    if (direction.OX && (collideSides.left || collideSides.right)) {
        keysMap.left = collideSides.left ? false : keysMap.left;
        keysMap.right = collideSides.right ? false : keysMap.right;
    }

    if (direction.OY && (collideSides.up || collideSides.down)) {
        keysMap.up = collideSides.up ? false : keysMap.up;
        keysMap.down = collideSides.down ? false : keysMap.down;
    }
}

function updateDirection(hero) {
    if (!Number.isInteger(hero.x / 20) && direction.OX) return;
    if (!Number.isInteger(hero.y / 20) && direction.OY) return;

    let collideDrections = {
        left: false,
        right: false,
        up: false,
        down: false
    };

    let indexes = getHeroIndex(hero);

    if (field[indexes.row][indexes.column - 1] === 1) collideDrections.left = true;
    if (field[indexes.row][indexes.columnWide + 1] === 1) collideDrections.right = true;
    if (field[indexes.row - 1][indexes.column] === 1) collideDrections.up = true;
    if (field[indexes.rowWide + 1][indexes.column] === 1) collideDrections.down = true;

    if (direction.OY && (keysMap.left || keysMap.right)) {
        if ((keysMap.left && !collideDrections.left)
            || (keysMap.right && !collideDrections.right)) {
            direction.OY = false;
            direction.OX = true;

            keysMap.up = false;
            keysMap.down = false;
        }

        return;
    }

    if (direction.OX && (keysMap.up || keysMap.down)) {
        if ((keysMap.up && !collideDrections.up)
            || (keysMap.down && !collideDrections.down)) {
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

function update(hero) {
    let heroStep = 1;

    checkCollision(hero, heroStep);
    updateDirection(hero);
    updatePosition(hero, heroStep);
}

function main() {
    document.addEventListener('keydown', keyDownHandler, false);

    const heroX = (canvas.width - heroWidth) / 2 + blockageWidth / 2;
    const heroY = (canvas.height - heroHeight) / 2 - blockageHeight / 2;
    const hero = new Hero({ heroX, heroY });
    const enemyX = blockageWidth;
    const enemyY = blockageHeight * 6;
    const enemy = new Enemy({ enemyX, enemyY });
    redraw(hero, enemy);
    let lastTimeStamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimeStamp) * 0.001; //секунд прошло с прошлого кадра
        lastTimeStamp = currentTimeStamp;

        update(hero, deltaTime);

        redraw(hero, enemy);

        requestAnimationFrame(animateFn);
    }

    animateFn();
}

window.onload = () => {
    main();
}