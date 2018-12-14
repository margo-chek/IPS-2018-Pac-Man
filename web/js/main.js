'use strict';

import Hero from './hero.js';
import Fruit from './fruit.js';
import Enemy from './enemy.js';
import Field from './field.js';
import PointCounter from './pointCounter.js';
import * as Const from './const.js';

function clearFon() {
    Const.CTX.clearRect(0, 0, Const.CANVAS.width, Const.CANVAS.height);
}

function redraw({field, hero, enemies, fruits}) {
    clearFon();
    field.draw();
    for (const fruit of fruits) fruit && fruit.draw();
    hero.draw();
    for (const enemy of enemies) enemy.draw();
}

function addNewEnemy(hero, enemies, field) {
    const {x, y} = field.getFreeCell(enemies, hero);

    enemies.push(new Enemy({
        enemyX: x * field.blockageWidth,
        enemyY: y * field.blockageHeight,
        field: field,
    }));
}

function update({hero, enemies, fruits, field, pointCounter}, deltaTime) {
    const heroStep = Math.floor(150 * deltaTime);
    const enemyStep = Math.floor(150 * deltaTime);
    const previousPoints = pointCounter.getCurrPoints();

    hero.update(heroStep, field);
    if (hero.checkCollisionWithOtherObjects(fruits)) pointCounter.increasePoints();

    const doAddNewEnemy = pointCounter.getCurrPoints() > previousPoints && pointCounter.getCurrPoints() % 300 === 0;
    if (doAddNewEnemy) addNewEnemy(hero, enemies, field);
    for (const enemy of enemies) enemy.update(enemyStep, field);

    return hero.checkCollisionWithOtherObjects(enemies);
}

function initializeGameObjects() {
    const gameObjects = {};
    gameObjects.pointCounter = new PointCounter();
    gameObjects.field = new Field();
    gameObjects.hero = Hero.initializeHero(gameObjects.field);
    gameObjects.enemies = Enemy.initializeEnemies(gameObjects.field);
    gameObjects.fruits = Fruit.initializeFruits();

    return gameObjects;
}

function main() {
    const gameObjects = initializeGameObjects();
    const deltaTime = 1 / 60;

    redraw(gameObjects);
    const animateFn = () => {
        const isEndGame = update(gameObjects, deltaTime);
        if (isEndGame) return;

        if (gameObjects.fruits.every((fruit) => !fruit)) gameObjects.fruits = Fruit.initializeFruits();

        redraw(gameObjects);

        setTimeout(animateFn, Math.floor(1000 / 60));
    };

    animateFn();
}

window.onload = () => {
    main();
};
