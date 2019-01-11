'use strict';

import {MATRIX} from './matrix.js';

const FRUIT_WIDTH = 20;
const FRUIT_HEIGHT = 20;
const FRUIT_START = 0;
const FRUIT_SIZE = 506;

export default function Fruit({fruitX, fruitY}) {
    this.x = Math.round(fruitX);
    this.y = Math.round(fruitY);
    this.isFruit = true;

    const imageFruit = new Image(FRUIT_SIZE, FRUIT_SIZE);
    imageFruit.src = '/pacman/web/image/fru.png';

    this.draw = function(ctx) {
        ctx.drawImage(imageFruit, FRUIT_START, FRUIT_START, FRUIT_SIZE, FRUIT_SIZE,
            this.x, this.y, FRUIT_WIDTH, FRUIT_HEIGHT);
    };
}

Fruit.initializeFruits = function() {
    const fruits = [];

    MATRIX.forEach((row, index, arr) => {
        if (index === 0 || index === arr.length - 1) return;

        const cellNumber = Math.round(Math.random() * ((row.length - 1) - 1)) + 1;
        if (row[cellNumber] === 1) return;

        const fruit = new Fruit({fruitX: cellNumber * FRUIT_WIDTH, fruitY: index * FRUIT_HEIGHT});
        fruits.push(fruit);
    });

    return fruits;
};
