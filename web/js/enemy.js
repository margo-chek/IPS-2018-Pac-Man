'use strict';
import {wall} from './ctx.js';
import {MATRIX} from './matrix.js';
import * as Field from './field.js';

const getStartEnemies = function() {
    return [
        {
            enemyX: 2 * Field.BLOCKAGE_SIZE,
            enemyY: 6 * Field.BLOCKAGE_SIZE,
        },
        {
            enemyX: 2 * Field.BLOCKAGE_SIZE,
            enemyY: 21 * Field.BLOCKAGE_SIZE,
        },
        {
            enemyX: 36 * Field.BLOCKAGE_SIZE,
            enemyY: 6 * Field.BLOCKAGE_SIZE,
        },
        {
            enemyX: 36 * Field.BLOCKAGE_SIZE,
            enemyY: 21 * Field.BLOCKAGE_SIZE,
        },
    ];
};

const isCollide = function(row, column) {
    if (row < 0 || row >= 30) return true;
    if (column < 0 || column >= 40) return true;

    return MATRIX[row][column] === 1;
};

const isCollideLeft = function(indexes, isDirection = false) {
    if (isDirection) return isCollide(indexes.row, indexes.column - 1);

    return isCollide(indexes.row, indexes.column) || isCollide(indexes.rowWide, indexes.column);
};

const isCollideRight = function(indexes, isDirection = false) {
    if (isDirection) return isCollide(indexes.row, indexes.columnWide + 1);

    return isCollide(indexes.row, indexes.columnWide) || isCollide(indexes.rowWide, indexes.columnWide);
};

const isCollideUp = function(indexes, isDirection = false) {
    if (isDirection) return isCollide(indexes.row - 1, indexes.column);

    return isCollide(indexes.row, indexes.column) || isCollide(indexes.row, indexes.columnWide);
};

const isCollideDown = function(indexes, isDirection = false) {
    if (isDirection) return isCollide(indexes.rowWide + 1, indexes.column);

    return isCollide(indexes.row, indexes.column) || isCollide(indexes.rowWide, indexes.columnWide);
};

const ENEMY_WIDTH = 20;
const ENEMY_HEIGHT = 20;
const ENEMY_START = 0;
const ENEMY_SIZE = 504;

// let enemyId = 0;

export default function Enemy({enemyX, enemyY, enemyDirection = ''}) {
    // this.id = 'enemy' + (++enemyId);
    this.x = Math.round(enemyX);
    this.y = Math.round(enemyY);

    const IMAGE = new Image(ENEMY_SIZE, ENEMY_SIZE);
    IMAGE.src = '/pacman/web/image/ene.png';

    this.direction = {OY: false, OX: false, left: false, right: false, up: false, down: false};
    this.directionChangeInterval = null;

    const initializeUpDirection = function() {
        this.direction.up = true;
        this.direction.OY = true;
    }.bind(this);

    const initializeDownDirection = function() {
        this.direction.down = true;
        this.direction.OY = true;
    }.bind(this);

    const initializeLeftDirection = function() {
        this.direction.left = true;
        this.direction.OX = true;
    }.bind(this);

    const initializeRightDirection = function() {
        this.direction.right = true;
        this.direction.OX = true;
    }.bind(this);

    const initializeDirection = function(direction, collision) {
        switch (direction) {
            case 'up':
                if (!collision.up) initializeUpDirection();
                break;
            case 'down':
                if (!collision.down) initializeDownDirection();
                break;
            case 'left':
                if (!collision.left) initializeLeftDirection();
                break;
            case 'right':
                if (!collision.right) initializeRightDirection();
                break;
        }
    };

    const setUpDirection = function() {
        this.direction.up = true;
        this.direction.down = false;

        this.direction.OY = true;
        this.direction.OX = false;
    }.bind(this);

    const setDownDirection = function() {
        this.direction.down = true;
        this.direction.up = false;

        this.direction.OY = true;
        this.direction.OX = false;
    }.bind(this);

    const setLeftDirection = function() {
        this.direction.left = true;
        this.direction.right = false;

        this.direction.OX = true;
        this.direction.OY = false;
    }.bind(this);

    const setRightDirection = function() {
        this.direction.right = true;
        this.direction.left = false;

        this.direction.OX = true;
        this.direction.OY = false;
    }.bind(this);

    const setDirection = function(direction) {
        switch (direction) {
            case 'up':
                setUpDirection();
                break;
            case 'down':
                setDownDirection();
                break;
            case 'left':
                setLeftDirection();
                break;
            case 'right':
                setRightDirection();
                break;
        }
    };

    const getDirectionsArray = function(collision) {
        const directionsArray = [];
        if (!collision.left && !this.direction.OX) {
            directionsArray.push('left');
        }
        if (!collision.right && !this.direction.OX) {
            directionsArray.push('right');
        }
        if (!collision.up && !this.direction.OY) {
            directionsArray.push('up');
        }
        if (!collision.down && !this.direction.OY) {
            directionsArray.push('down');
        }

        return directionsArray;
    }.bind(this);

    const reflectByOX = function() {
        if (this.direction.left) {
            setDirection('right');

            return;
        }

        setDirection('left');
    }.bind(this);

    const reflectByOY = function() {
        if (this.direction.up) {
            setDirection('down');

            return;
        }

        setDirection('up');
    }.bind(this);

    const setReflectiveDirection = function() {
        if (this.direction.OX) return reflectByOX();

        if (this.direction.OY) reflectByOY();
    }.bind(this);

    const getRandomDirection = function() {
        clearInterval(this.directionChangeInterval);
        this.directionChangeInterval = null;

        const directionsArray = getDirectionsArray(getCollideSides('direction'));
        if (!directionsArray.length) return setReflectiveDirection();

        this.direction = {OY: false, OX: false, left: false, right: false, up: false, down: false};
        const index = Math.round(Math.random() * (directionsArray.length - 1));
        setDirection(directionsArray[index]);
    }.bind(this);

    const getCollideSides = function(type, step = 0) {
        const indexes = Field.getIndexes(this, step);

        const isDirection = type === 'direction';

        return {
            left: isCollideLeft(indexes, isDirection),
            right: isCollideRight(indexes, isDirection),
            up: isCollideUp(indexes, isDirection),
            down: isCollideDown(indexes, isDirection),
        };
    }.bind(this);

    const fixWhenOXCollision = function(indexes) {
        this.x = indexes.column * Field.BLOCKAGE_SIZE;
        if (this.direction.left) this.x += Field.BLOCKAGE_SIZE;

        getRandomDirection();
    }.bind(this);

    const fixWhenOYCollision = function(indexes) {
        this.y = indexes.row * Field.BLOCKAGE_SIZE;
        if (this.direction.up) this.y += Field.BLOCKAGE_SIZE;

        getRandomDirection();
    }.bind(this);

    const checkCollisionWithField = function(step = 0) {
        const currentIndexes = Field.getIndexes(this);
        const collideSides = getCollideSides('withField', step);

        const isCollideByOX = this.direction.OX && (collideSides.left || collideSides.right);
        const isCollideByOY = this.direction.OY && (collideSides.up || collideSides.down);

        if (isCollideByOX) {
            fixWhenOXCollision(currentIndexes);

            return collideSides;
        }

        if (isCollideByOY) fixWhenOYCollision(currentIndexes);

        return collideSides;
    }.bind(this);

    const chooseNewOXDirection = function() {
        if (!this.direction.left && !this.direction.right) {
            const directions = ['left', 'right'];
            const index = Math.round(Math.random());
            setDirection(directions[index]);
        } else {
            const directions = ['up', 'down'];

            const index = Math.round(Math.random());
            setDirection(directions[index]);
        }

        this.direction.OX = true;
        this.direction.OY = false;
    }.bind(this);

    const chooseNewOYDirection = function() {
        if (!this.direction.up && !this.direction.down) {
            const directions = ['up', 'down'];
            const index = Math.round(Math.random());
            setDirection(directions[index]);
        } else {
            const directions = ['left', 'right'];
            const index = Math.round(Math.random());
            setDirection(directions[index]);
        }

        this.direction.OX = false;
        this.direction.OY = true;
    }.bind(this);

    const chooseNewDirection = function() {
        if (this.direction.OX) {
            chooseNewOXDirection();

            return;
        }

        chooseNewOYDirection();
    }.bind(this);

    const doCanChangeDirectionToOX = function(collideDirections) {
        const doCanToGoLeft = this.direction.left && !collideDirections.left;
        const doCanToGoRight = this.direction.right && !collideDirections.right;

        return this.direction.OY && (doCanToGoLeft || doCanToGoRight);
    }.bind(this);

    const doCanChangeDirectionToOY = function(collideDirections) {
        const doCanToGoUp = this.direction.up && !collideDirections.up;
        const doCanToGoDown = this.direction.down && !collideDirections.down;

        return this.direction.OX && (doCanToGoUp || doCanToGoDown);
    }.bind(this);

    const changeDirectionToOX = function() {
        this.direction.OY = false;
        this.direction.OX = true;

        this.direction.up = false;
        this.direction.down = false;
    }.bind(this);

    const changeDirectionToOY = function() {
        this.direction.OX = false;
        this.direction.OY = true;

        this.direction.left = false;
        this.direction.right = false;
    }.bind(this);

    const updateDirection = function() {
        if (!this.directionChangeInterval) {
            this.directionChangeInterval = setInterval(() => chooseNewDirection(), 300);
        }

        if (!Number.isInteger(this.x / wall) && this.direction.OX) return;
        if (!Number.isInteger(this.y / wall) && this.direction.OY) return;

        const collideDirections = getCollideSides('direction');

        if (doCanChangeDirectionToOX(collideDirections)) {
            changeDirectionToOX();

            return;
        }

        if (doCanChangeDirectionToOY(collideDirections)) changeDirectionToOY();
    }.bind(this);

    const updatePosition = function(step) {
        // console.log(this);
        if (this.direction.OY) {
            if (this.direction.up) {
                this.y -= step;
            }
            if (this.direction.down) {
                this.y += step;
            }

            return;
        }

        if (this.direction.left) {
            this.x -= step;
        }
        if (this.direction.right) {
            this.x += step;
        }
    }.bind(this);

    this.initialize = function(expectedDirection = '') {
        const collision = getCollideSides('direction');

        if (expectedDirection !== '') {
            getRandomDirection();
        } else {
            initializeDirection(expectedDirection, collision);
        }
    };

    this.update = function(step) {
        checkCollisionWithField(step);
        updateDirection();
        updatePosition(step);
    };

    this.draw = function(CTX) {
        CTX.drawImage(IMAGE, ENEMY_START, ENEMY_START, ENEMY_SIZE, ENEMY_SIZE, this.x,
            this.y, ENEMY_WIDTH, ENEMY_HEIGHT);
    };

    this.initialize(enemyDirection);
}

Enemy.initializeEnemies = function() {
    return getStartEnemies().map((enemy) => new Enemy(enemy));
};
