'use strict';

import {KEYS_MAP} from './keys.js';
import {MATRIX} from './matrix.js';

export default function Field() {}


Field.BLOCKAGESIZE = 20;
Field.WALL = 1;
Field.WALLCOLOR = '#FF8B00';
Field.FREESPACECOLOR = '#6C0AAB';

Field.isWall = function( number ) {
    return number === Field.WALL;
};

Field.draw = function( CTX ) {
    let blockageX = 0;
    let blockageY = 0;
    const dBlockageX = 20;
    const dBlockageY = 20;

    MATRIX.forEach( ( item ) => {
        item.forEach( ( number ) => {
            CTX.fillStyle = Field.isWall( number ) ? Field.WALLCOLOR : Field.FREESPACECOLOR;
            CTX.fillRect( blockageX, blockageY, Field.BLOCKAGESIZE, Field.BLOCKAGESIZE );
            blockageX += dBlockageX;
        } );
        blockageX = 0;
        blockageY += dBlockageY;
    } );
};

Field.getIndexes = function( elem, step = 0 ) {
    let deltaOX = 0;
    if (elem.direction.OX) {
        deltaOX = KEYS_MAP.left ? -step : KEYS_MAP.right ? step : 0;
    }

    let deltaOY = 0;
    if (elem.direction.OY) {
        deltaOY = KEYS_MAP.up ? -step : KEYS_MAP.down ? step : 0;
    }

    const row = Math.floor( (elem.y + deltaOY) / Field.BLOCKAGESIZE );
    const rowWide = Math.floor( (elem.y + Field.BLOCKAGESIZE - 1 + deltaOY) / Field.BLOCKAGESIZE );
    const column = Math.floor( (elem.x + deltaOX) / Field.BLOCKAGESIZE );
    const columnWide = Math.floor( (elem.x + Field.BLOCKAGESIZE - 1 + deltaOX) / Field.BLOCKAGESIZE );

    return {row: row, rowWide: rowWide, column: column, columnWide: columnWide};
};

Field.getFreeCell = function( enemies, hero ) {
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
};

const compileFreeCells = function( nonFreeCells ) {
    const freeCells = {
        column: [],
        row: [],
    };

    MATRIX.forEach( ( row, indexRow ) => {
        row.forEach( ( column, indexColumn ) => {
            if (Field.isWall( column )) return;
            if (nonFreeCells.column.includes( indexColumn ) && nonFreeCells.row.includes( indexRow )) return;

            freeCells.column.push( indexColumn );
            freeCells.row.push( indexRow );
        } );
    } );

    return freeCells;
};

const compileNonFreeCells = function( ...objects ) {
    const nonFreeCells = {
        column: [],
        row: [],
    };

    objects.forEach( ( object ) => {
        const pos = Field.getIndexes( object );

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
};
