'use strict';
import * as Keys from './keys.js';
import * as Field from './field.js';
import {MATRIX} from './matrix.js';
import {CANVAS_WIDTH, CANVAS_HEIGHT} from './ctx.js';

const isCollide = function(row, column) {
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

const HERO_WIDTH = 20;
const HERO_HEIGHT = 20;
const HERO_START = 0;
const HERO_SIZE = 480;
const HERO_RADIUS = 6;

const HERO_IMAGES_DIRECTIONS_SRC = {
    down: '/pacman/web/image/pacDown.png',
    up: '/pacman/web/image/pacUp.png',
    right: '/pacman/web/image/pacRight.png',
    left: '/pacman/web/image/pacLeft.png',
};

const IMAGE_RIGHT = new Image(HERO_SIZE, HERO_SIZE);
IMAGE_RIGHT.src = HERO_IMAGES_DIRECTIONS_SRC.right;

const IMAGE_LEFT = new Image(HERO_SIZE, HERO_SIZE);
IMAGE_LEFT.src = HERO_IMAGES_DIRECTIONS_SRC.left;

const IMAGE_UP = new Image(HERO_SIZE, HERO_SIZE);
IMAGE_UP.src = HERO_IMAGES_DIRECTIONS_SRC.up;

const IMAGE_DOWN = new Image(HERO_SIZE, HERO_SIZE);
IMAGE_DOWN.src = HERO_IMAGES_DIRECTIONS_SRC.down;

export default function Hero({heroX, heroY}) {
    this.x = Math.round(heroX);
    this.y = Math.round(heroY);
    this.r = HERO_RADIUS;
    this.direction = {OY: false, OX: true};
    this.isCollided = false;
    this.currImage = IMAGE_RIGHT;

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

    const fixWhenOXCollision = function(indexes, collision) {
        this.x = indexes.column * HERO_WIDTH;
        if (this.direction.left) this.x += HERO_WIDTH;

        Keys.KEYS_MAP.left = collision.left ? false : Keys.KEYS_MAP.left;
        Keys.KEYS_MAP.right = collision.right ? false : Keys.KEYS_MAP.right;
    }.bind(this);

    const fixWhenOYCollision = function(indexes, collision) {
        this.y = indexes.row * HERO_HEIGHT;
        if (this.direction.up) this.y += HERO_HEIGHT;

        Keys.KEYS_MAP.up = collision.up ? false : Keys.KEYS_MAP.up;
        Keys.KEYS_MAP.down = collision.down ? false : Keys.KEYS_MAP.down;
    }.bind(this);

    const checkCollisionWithField = function(step = 0) {
        const currentIndexes = Field.getIndexes(this);
        const collideSides = getCollideSides('withField', step);

        const isCollideByOX = this.direction.OX && (collideSides.left || collideSides.right);
        const isCollideByOY = this.direction.OY && (collideSides.up || collideSides.down);

        if (isCollideByOX) {
            fixWhenOXCollision(currentIndexes, collideSides);
            this.isCollided = true;

            return;
        }

        if (isCollideByOY) {
            fixWhenOYCollision(currentIndexes, collideSides);
            this.isCollided = true;
        }
    }.bind(this);

    const isCollideByOX = function(object, objectBounds) {
        const isCollideByLeft = this.rightBound > objectBounds.left && this.rightBound < objectBounds.right;
        const isCollideByRight = this.leftBound < objectBounds.right && this.leftBound > objectBounds.left;

        return this.y === object.y && (isCollideByLeft || isCollideByRight);
    }.bind(this);

    const isCollideByOY = function(object, objectBounds) {
        const isCollideByTop = this.bottomBound > objectBounds.top && this.bottomBound < objectBounds.bottom;
        const isCollideByBottom = this.topBound < objectBounds.bottom && this.topBound > objectBounds.top;

        return this.x === object.x && (isCollideByTop || isCollideByBottom);
    }.bind(this);

    const getObjectBounds = function(object) {
        return {
            left: object.x,
            right: object.x + HERO_WIDTH,
            top: object.y,
            bottom: object.y + HERO_HEIGHT,
        };
    };

    const compileHeroBounds = function() {
        this.leftBound = this.x + (HERO_WIDTH / 2 - this.r);
        this.rightBound = this.x + HERO_WIDTH - (HERO_WIDTH / 2 - this.r);
        this.topBound = this.y + (HERO_HEIGHT / 2 - this.r);
        this.bottomBound = this.y + HERO_HEIGHT - (HERO_HEIGHT / 2 - this.r);
    }.bind(this);

    const doCanChangeDirectionToOX = function(collideDirections) {
        const doCanToGoLeft = Keys.KEYS_MAP.left && !collideDirections.left;
        const doCanToGoRight = Keys.KEYS_MAP.right && !collideDirections.right;

        return this.direction.OY && (doCanToGoLeft || doCanToGoRight);
    }.bind(this);

    const doCanChangeDirectionToOY = function(collideDirections) {
        const doCanToGoUp = Keys.KEYS_MAP.up && !collideDirections.up;
        const doCanToGoDown = Keys.KEYS_MAP.down && !collideDirections.down;

        return this.direction.OX && (doCanToGoUp || doCanToGoDown);
    }.bind(this);

    const changeDirectionToOX = function() {
        this.direction.OY = false;
        this.direction.OX = true;

        Keys.KEYS_MAP.up = false;
        Keys.KEYS_MAP.down = false;
    }.bind(this);

    const changeDirectionToOY = function() {
        this.direction.OX = false;
        this.direction.OY = true;

        Keys.KEYS_MAP.left = false;
        Keys.KEYS_MAP.right = false;
    }.bind(this);

    const updateDirection = function() {
        if (!Number.isInteger(this.x / HERO_WIDTH) && this.direction.OX) return;
        if (!Number.isInteger(this.y / HERO_HEIGHT) && this.direction.OY) return;

        const collideDirections = getCollideSides('direction');

        if (doCanChangeDirectionToOX(collideDirections)) {
            changeDirectionToOX();
            this.isCollided = false;

            return;
        }

        if (doCanChangeDirectionToOY(collideDirections)) {
            changeDirectionToOY();
            this.isCollided = false;
        }
    }.bind(this);

    const updatePosition = function(step) {
        if (this.direction.OY) {
            if (!Keys.KEYS_MAP.up && !Keys.KEYS_MAP.down) return;
            if (Keys.KEYS_MAP.up) {
                this.y -= step;

                this.isCollided = false;
            }
            if (Keys.KEYS_MAP.down) {
                this.y += step;

                this.isCollided = false;
            }

            return;
        }

        if (!Keys.KEYS_MAP.left && !Keys.KEYS_MAP.right) return;
        if (Keys.KEYS_MAP.left) {
            this.x -= step;

            this.isCollided = false;
        }
        if (Keys.KEYS_MAP.right) {
            this.x += step;

            this.isCollided = false;
        }
    }.bind(this);

    this.update = function(step) {
        checkCollisionWithField(step);
        updateDirection();
        updatePosition(step);
    };

    this.checkCollisionWithObject = (object, i, arr) => {
        if (!object) return false;

        const objectBounds = getObjectBounds(object);
        compileHeroBounds();

        if (isCollideByOX(object, objectBounds) || isCollideByOY(object, objectBounds)) {
            if (object.isFruit) arr[i] = null;

            return true;
        }

        return false;
    };

    this.checkCollisionWithOtherObjects = function(objects) {
        return objects.some(this.checkCollisionWithObject);
    };

    this.draw = function(CTX) {
        if (this.isCollided) {
            CTX.drawImage(this.currImage, HERO_START, HERO_START, HERO_SIZE, HERO_SIZE,
                this.x, this.y, HERO_WIDTH, HERO_HEIGHT);

            return;
        }

        if (this.direction.OX) {
            if (Keys.KEYS_MAP.left) {
                this.currImage = IMAGE_LEFT;
            } else {
                this.currImage = IMAGE_RIGHT;
            }
        } else {
            if (Keys.KEYS_MAP.down) {
                this.currImage = IMAGE_DOWN;
            } else {
                this.currImage = IMAGE_UP;
            }
        }

        CTX.drawImage(this.currImage, HERO_START, HERO_START, HERO_SIZE, HERO_SIZE,
            this.x, this.y, HERO_WIDTH, HERO_HEIGHT);
    };
}

Hero.initializeHero = function() {
    const heroX = (CANVAS_WIDTH - HERO_WIDTH) / 2 + HERO_WIDTH / 2;
    const heroY = (CANVAS_HEIGHT - HERO_HEIGHT) / 2 - HERO_HEIGHT / 2;

    return new Hero({heroX, heroY});
};
