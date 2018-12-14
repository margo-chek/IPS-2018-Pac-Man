'use strict';

import {CTX, MATRIX} from './const.js';

export default function Fruit({fruitX, fruitY}) {
    this.x = Math.round(fruitX);
    this.y = Math.round(fruitY);
    this.isFruit = true;

    const IMAGE = new Image(506, 506);
    IMAGE.src = '/pacman/image/fru.png';

    this.draw = function() {
        CTX.drawImage(IMAGE, 0, 0, 506, 506, this.x, this.y, Fruit.WIDTH, Fruit.HEIGHT);
    };
}

Fruit.WIDTH = 20;
Fruit.HEIGHT = 20;

Fruit.initializeFruits = function() {
    const fruits = [];

    MATRIX.forEach((row, index, arr) => {
        if (index === 0 || index === arr.length - 1) return;

        const cellNumber = Math.round(Math.random() * (1 - (row.length - 1))) + (row.length - 1);
        if (row[cellNumber] === 1) return;

        const fruit = new Fruit({fruitX: cellNumber * 20, fruitY: index * 20});
        fruits.push(fruit);
    });

    return fruits;
};
