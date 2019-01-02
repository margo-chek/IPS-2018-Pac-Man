'use strict';

import {CTX, MATRIX, KEYS_MAP} from './const.js';

export default function Field() {
    this.blockageWidth = 20;
    this.blockageHeight = 20;

    this.draw = function() {
        let blockageX = 0;
        let blockageY = 0;
        const dBlockageX = 20;
        const dBlockageY = 20;

        MATRIX.forEach((item) => {
            item.forEach((number) => {
                CTX.fillStyle = number === 1 ? '#9717ff' : '#6cff3f';
                CTX.fillRect(blockageX, blockageY, this.blockageWidth, this.blockageHeight);
                blockageX += dBlockageX;
            });
            blockageX = 0;
            blockageY += dBlockageY;
        });
    };

    this.getIndexes = function(elem, step = 0) {
        let deltaOX = 0;
        if (elem.direction.OX) {
            deltaOX = KEYS_MAP.left ? -step : KEYS_MAP.right ? step : 0;
        }

        let deltaOY = 0;
        if (elem.direction.OY) {
            deltaOY = KEYS_MAP.up ? -step : KEYS_MAP.down ? step : 0;
        }

        const row = Math.floor((elem.y + deltaOY) / this.blockageHeight);
        const rowWide = Math.floor((elem.y + 19 + deltaOY) / this.blockageHeight);
        const column = Math.floor((elem.x + deltaOX) / this.blockageWidth);
        const columnWide = Math.floor((elem.x + 19 + deltaOX) / this.blockageWidth);

        return {row: row, rowWide: rowWide, column: column, columnWide: columnWide};
    };

    const compileNonFreeCells = function(...objects) {
        const nonFreeCells = {
            column: [],
            row: [],
        };

        objects.forEach((object) => {
            const pos = this.getIndexes(object);

            nonFreeCells.column.push(pos.column);
            nonFreeCells.row.push(pos.row);

            nonFreeCells.column.push(pos.column);
            nonFreeCells.row.push(pos.rowWide);

            nonFreeCells.column.push(pos.columnWide);
            nonFreeCells.row.push(pos.row);

            nonFreeCells.column.push(pos.columnWide);
            nonFreeCells.row.push(pos.rowWide);
        });

        return nonFreeCells;
    }.bind(this);

    const compileFreeCells = function(nonFreeCells) {
        const freeCells = {
            column: [],
            row: [],
        };

        MATRIX.forEach((row, indexRow) => {
            row.forEach((column, indexColumn) => {
                if (column === 1) return;
                if (nonFreeCells.column.includes(indexColumn) && nonFreeCells.row.includes(indexRow)) return;

                freeCells.column.push(indexColumn);
                freeCells.row.push(indexRow);
            });
        });

        return freeCells;
    };

    this.getFreeCell = function(enemies, hero) {
        const nonFreeCells = compileNonFreeCells(...enemies, hero);
        const freeCells = compileFreeCells(nonFreeCells);

        const cellsCount = freeCells.column.length - 1;
        const index = Math.round(Math.random() * (0 - cellsCount)) + cellsCount;


        const result = {
            x: 7,//freeCells.column[index],
            y: 14,//freeCells.row[index],
        };
        console.log(result)

        return result;
    };
}
