'use strict';

import {CTX, KEYS_MAP} from './const.js';
import {MATRIX} from './matrix.js';

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
                CTX.fillStyle = number === 1 ? '#FF8B00' : '#6C0AAB';
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
        const rowWide = Math.floor((elem.y + this.blockageHeight - 1 + deltaOY) / this.blockageHeight);
        const column = Math.floor((elem.x + deltaOX) / this.blockageWidth);
        const columnWide = Math.floor((elem.x + this.blockageWidth - 1 + deltaOX) / this.blockageWidth);

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
        const index = Math.round(Math.random() * cellsCount);
        // const index = Math.round(Math.random() * (0 - cellsCount)) + cellsCount;


        const result = {
            x: freeCells.column[index], // 7
            y: freeCells.row[index], // 14
        };
        console.log(result);

        return result;
    };
}
