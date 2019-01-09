'use strict';

import Hero from './hero.js';
import Fruit from './fruit.js';
import Enemy from './enemy.js';
import Field from './field.js';
import PointCounter from './pointCounter.js';
import GameStateHandler from './gameStateHandler.js';
import {CANVAS_WIDTH, CANVAS_HEIGHT} from './ctx.js';

function clearFon(CTX) {
    CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function redraw(CTX, {hero, enemies, fruits}) {
    clearFon(CTX);
    Field.draw(CTX);
    for (const fruit of fruits) fruit && fruit.draw(CTX);
    hero.draw(CTX);
    for (const enemy of enemies) enemy.draw(CTX);
}

function addNewEnemy(hero, enemies) {
    const {x, y} = Field.getFreeCell(enemies, hero);

    enemies.push(new Enemy({
        enemyX: x * Field.BLOCKAGESIZE,
        enemyY: y * Field.BLOCKAGESIZE,
    }));

    console.log(enemies[enemies.length - 1]); // debugger;
}

function update({hero, enemies, fruits, pointCounter}, deltaTime) {
    const heroStep = Math.floor(150 * deltaTime);
    const enemyStep = Math.floor(150 * deltaTime);
    const previousPoints = pointCounter.getCurrPoints();

    hero.update(heroStep);
    if (hero.checkCollisionWithOtherObjects(fruits)) pointCounter.increasePoints();

    const doAddNewEnemy = pointCounter.getCurrPoints() > previousPoints &&
        pointCounter.getCurrPoints() % PointCounter.Score === 0;
    if (doAddNewEnemy) addNewEnemy(hero, enemies);
    for (const enemy of enemies) enemy.update(enemyStep);

    return hero.checkCollisionWithOtherObjects(enemies);
}

function initializeGameObjects() {
    const gameObjects = {};
    gameObjects.pointCounter = new PointCounter();
    gameObjects.hero = Hero.initializeHero();
    gameObjects.enemies = Enemy.initializeEnemies();
    gameObjects.fruits = Fruit.initializeFruits();

    return gameObjects;
}

function sendScore(score) {
    $.ajax({
        url: 'actions/save_score.php',
        type: 'POST',
        dataType: 'json',
        data: ({score}),
        success: function(data) {
            $('#counter').text(data);
        },
    });
}

function popupEndGame(score) {
    const infoWindow = document.getElementById('winModal');
    infoWindow.style.display = 'block';

    sendScore(score);
}

function main() {
    const CANVAS = document.getElementById('Canvas');
    CANVAS.width = CANVAS_WIDTH;
    CANVAS.height = CANVAS_HEIGHT;
    const CTX = CANVAS.getContext('2d');
    const deltaTime = 1 / 60;
    const delayTime = Math.floor(1000 / 60);
    const gameObjects = initializeGameObjects();

    const gameStateHandler = new GameStateHandler();

    redraw(CTX, gameObjects);
    const animateFn = () => {
        if (gameStateHandler.state === 'pause') {
            //Тут нужна обработка при паузе (модальные окна или что-то подобное),
            // если что-то подобное вообще должно быть

            setTimeout(animateFn, delayTime);

            return;
        }

        const isEndGame = update(gameObjects, deltaTime);
        if (isEndGame) return popupEndGame(gameObjects.pointCounter.getCurrPoints());

        if (gameObjects.fruits.every((fruit) => !fruit)) gameObjects.fruits = Fruit.initializeFruits();

        redraw(CTX, gameObjects);

        setTimeout(animateFn, delayTime);
    };

    animateFn();
}

window.onload = () => {
    main();
};
