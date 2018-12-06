const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const pointCounter = document.getElementById('counter');
pointCounter.points = 0;

const rightKeyCode = 39;
const leftKeyCode = 37;
const topKeyCode = 38;
const bottomKeyCode = 40;

window.Field = {
    matrix: [
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
    ],
    blockageWidth: 20,
    blockageHeight: 20,
    draw: function () {
        let blockageX = 0;
        let blockageY = 0;
        const dBlockageX = 20;
        const dBlockageY = 20;
        Field.matrix.forEach(item => {
            item.forEach(number => {
                ctx.fillStyle = number === 1 ? 'brown' : 'green';
                ctx.fillRect(blockageX, blockageY, Field.blockageWidth, Field.blockageHeight);
                blockageX += dBlockageX;
            });
            blockageX = 0;
            blockageY += dBlockageY;
        });
    },
    getIndexes: function (elem, step = 0) {
        let deltaOX = 0;
        if (elem.direction.OX)
            deltaOX = keysMap.left ? -step : keysMap.right ? step : 0;

        let deltaOY = 0;
        if (elem.direction.OY)
            deltaOY = keysMap.up ? -step : keysMap.down ? step : 0;

        let row = Math.floor((elem.y + deltaOY) / Field.blockageHeight);
        let rowWide = Math.floor((elem.y + 19 + deltaOY) / Field.blockageHeight);
        let column = Math.floor((elem.x + deltaOX) / Field.blockageWidth);
        let columnWide = Math.floor((elem.x + 19 + deltaOX) / Field.blockageWidth);

        return { row: row, rowWide: rowWide, column: column, columnWide: columnWide };
    }
};

function initializeFruits() {
    let fruits = [];

    Field.matrix.forEach((row, index, arr) => {
        if (index === 0 || index === arr.length - 1) return;

        let cellNumber = Math.round(Math.random() * (1 - (row.length - 1))) + (row.length - 1);
        if (row[cellNumber] === 1) return;

        let fruit = new Fruit({ fruitX: cellNumber * 20, fruitY: index * 20 });
        fruits.push(fruit);
    });

    return fruits;
}

function clearFon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redraw(hero, enemies, fruits) {
    clearFon();
    Field.draw();
    for (const fruit of fruits) fruit && fruit.draw();
    hero.draw();
    for (const enemy of enemies) enemy.draw();
}

window.keysMap = {
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

function checkCollisionWithFruits(hero, fruits) {
    let heroLeftBound = hero.x + (10 - hero.r);
    let heroRightBound = hero.x + 20 - (10 - hero.r);
    let heroTopBound = hero.y + (10 - hero.r);
    let heroBottomBound = hero.y + 20 - (10 - hero.r);

    fruits.forEach((fruit, i, arr) => {
        if (!fruit) return;

        let fruitLeftBound = fruit.x + (10 - fruit.r);
        let fruitRightBound = fruit.x + 20 - (10 - fruit.r);
        let fruitTopBound = fruit.y + (10 - fruit.r);
        let fruitBottomBound = fruit.y + 20 - (10 - fruit.r);

        if (hero.y === fruit.y && ((heroLeftBound < fruitRightBound && heroLeftBound > fruitLeftBound)
            || (heroRightBound > fruitLeftBound && heroRightBound < fruitRightBound))) {
            arr[i] = null;
            increasePoints();
        }
        if (hero.x === fruit.x && ((heroTopBound < fruitBottomBound && heroTopBound > fruitTopBound)
            || (heroBottomBound > fruitTopBound && heroBottomBound < fruitBottomBound))) {
            arr[i] = null;
            increasePoints();
        }
    });
}

function update(hero, enemies, fruits, deltaTime) {
    let heroStep = Math.floor(100 * deltaTime);
    let enemyStep = Math.floor(200 * deltaTime);

    hero.update(heroStep);
    checkCollisionWithFruits(hero, fruits);
    for (const enemy of enemies) enemy.update(enemyStep);
}

function initializeCounter() {
    pointCounter.innerText = (pointCounter.points + "").padStart(6, "0");
}

function increasePoints() {
    let iterations = 20;

    let counterInterval = setInterval(function () {
        pointCounter.innerText = (++pointCounter.points + "").padStart(6, "0");
        iterations--;

        if (iterations === 0) {
            clearInterval(counterInterval);
        }
    })
}

function main() {
    document.addEventListener('keydown', keyDownHandler, false);

    initializeCounter();

    const heroX = (canvas.width - Hero.WIDTH) / 2 + Field.blockageWidth / 2;
    const heroY = (canvas.height - Hero.HEIGHT) / 2 - Field.blockageHeight / 2;
    const hero = new Hero({ heroX, heroY, heroR: 6 });

    const enemiesParams = [
        {
            enemyX: 2 * Field.blockageWidth,
            enemyY: 6 * Field.blockageWidth,
            enemyColor: 'red'
        },
        {
            enemyX: 2 * Field.blockageWidth,
            enemyY: 21 * Field.blockageWidth,
            enemyColor: 'blue'
        },
        {
            enemyX: 36 * Field.blockageWidth,
            enemyY: 6 * Field.blockageWidth,
            enemyColor: 'purple'
        },
        {
            enemyX: 36 * Field.blockageWidth,
            enemyY: 21 * Field.blockageWidth,
            enemyColor: 'white'
        }
    ];
    let enemies = enemiesParams.map(enemy => new Enemy(enemy));

    let fruits = initializeFruits();

    const deltaTime = 1 / 60;

    redraw(hero, enemies, fruits);
    const animateFn = () => {
        update(hero, enemies, fruits, deltaTime);

        if (fruits.every(fruit => !fruit)) fruits = initializeFruits();

        redraw(hero, enemies, fruits);

        setTimeout(animateFn, Math.floor(1000 / 60));
    }

    animateFn();
}

window.onload = () => {
    main();
}