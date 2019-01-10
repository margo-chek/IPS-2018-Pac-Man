'use strict';

import {KEYS_MAP} from './keys.js';
import {MATRIX} from './matrix.js';

export const BLOCKAGE_SIZE = 20;
const WALL = 1;
const WALL_COLOR = '#FF8B00';
const FREE_SPACE_COLOR = '#6C0AAB';

export function isWall( number ) {
    return number === WALL;
}

export function draw( CTX ) {
    let blockageX = 0;
    let blockageY = 0;
    const dBlockageX = 20;
    const dBlockageY = 20;

    MATRIX.forEach( ( item ) => {
        item.forEach( ( number ) => {
            CTX.fillStyle = isWall( number ) ? WALL_COLOR : FREE_SPACE_COLOR;
            CTX.fillRect( blockageX, blockageY, BLOCKAGE_SIZE, BLOCKAGE_SIZE );
            blockageX += dBlockageX;
        } );
        blockageX = 0;
        blockageY += dBlockageY;
    } );
}

function getDeltas( elem, step ) {
    let deltaOX = 0;
    if (elem.direction.OX) {
        deltaOX = KEYS_MAP.left ? -step : KEYS_MAP.right ? step : 0;
    }

    let deltaOY = 0;
    if (elem.direction.OY) {
        deltaOY = KEYS_MAP.up ? -step : KEYS_MAP.down ? step : 0;
    }

    return {deltaOX: deltaOX, deltaOY: deltaOY};
}

export function getIndexes( elem, step = 0 ) {
    const {deltaOX, deltaOY} = getDeltas(elem, step);

    const row = Math.floor( (elem.y + deltaOY) / BLOCKAGE_SIZE );
    const rowWide = Math.floor( (elem.y + BLOCKAGE_SIZE - 1 + deltaOY) / BLOCKAGE_SIZE );
    const column = Math.floor( (elem.x + deltaOX) / BLOCKAGE_SIZE );
    const columnWide = Math.floor( (elem.x + BLOCKAGE_SIZE - 1 + deltaOX) / BLOCKAGE_SIZE );

    return {row: row, rowWide: rowWide, column: column, columnWide: columnWide};
}

export function getFreeCell( enemies, hero ) {
    const nonFreeCells = compileNonFreeCells( ...enemies, hero );
    const freeCells = compileFreeCells( nonFreeCells );

    const cellsCount = freeCells.column.length - 1;
    const index = Math.round( Math.random() * cellsCount );
    // const index = Math.round(Math.random() * (0 - cellsCount)) + cellsCount;

    const result = {
        x: freeCells.column[index], // 7
        y: freeCells.row[index], // 14
    };
    console.log( result );

    return result;
}

function compileFreeCells( nonFreeCells ) {
    const freeCells = {
        column: [],
        row: [],
    };

    MATRIX.forEach( ( row, indexRow ) => {
        row.forEach( ( column, indexColumn ) => {
            if (isWall( column )) return;
            if (nonFreeCells.column.includes( indexColumn ) && nonFreeCells.row.includes( indexRow )) return;

            freeCells.column.push( indexColumn );
            freeCells.row.push( indexRow );
        } );
    } );

    return freeCells;
}

function compileNonFreeCells( ...objects ) {
    const nonFreeCells = {
        column: [],
        row: [],
    };

    objects.forEach( ( object ) => {
        const pos = getIndexes( object );

        nonFreeCells.column.push( pos.column );
        nonFreeCells.row.push( pos.row );

        nonFreeCells.column.push( pos.column );
        nonFreeCells.row.push( pos.rowWide );

        nonFreeCells.column.push( pos.columnWide );
        nonFreeCells.row.push( pos.row );

        nonFreeCells.column.push( pos.columnWide );
        nonFreeCells.row.push( pos.rowWide );
    } );

    return nonFreeCells;
}
