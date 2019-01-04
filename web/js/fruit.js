'use strict';

import {CTX, MATRIX} from './const.js';

export default function Fruit({fruitX, fruitY}) {
    this.x = Math.round(fruitX);
    this.y = Math.round(fruitY);
    this.isFruit = true;

    const IMAGE = new Image(Fruit.SIZE, Fruit.SIZE);
    IMAGE.src = '/pacman/image/fru.png';

    this.draw = function() {
        CTX.drawImage(IMAGE, Fruit.START, Fruit.START, Fruit.SIZE, Fruit.SIZE,
            this.x, this.y, Fruit.WIDTH, Fruit.HEIGHT);
    };
}

Fruit.WIDTH = 20;
Fruit.HEIGHT = 20;
Fruit.START = 0;
Fruit.SIZE = 506;

Fruit.initializeFruits = function() {
    const fruits = [];

    MATRIX.forEach((row, index, arr) => {
        if (index === 0 || index === arr.length - 1) return;

        const cellNumber = Math.round(Math.random() * (1 - (row.length - 1))) + (row.length - 1);
        if (row[cellNumber] === 1) return;

        const fruit = new Fruit({fruitX: cellNumber * field.WIDTH, fruitY: index * field.HEIGHT});
        fruits.push(fruit);
    });

    return fruits;
};
