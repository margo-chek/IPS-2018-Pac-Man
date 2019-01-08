'use strict';

import {MATRIX} from './matrix.js';

export default function Fruit({fruitX, fruitY}) {
    this.x = Math.round(fruitX);
    this.y = Math.round(fruitY);
    this.isFruit = true;

    const IMAGE = new Image(Fruit.SIZE, Fruit.SIZE);
    IMAGE.src = '/pacman/web/image/fru.png';

    this.draw = function(CTX) {
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

        const fruit = new Fruit({fruitX: cellNumber * Fruit.WIDTH, fruitY: index * Fruit.HEIGHT});
        fruits.push(fruit);
    });

    return fruits;
};
