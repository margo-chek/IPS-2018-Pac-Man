'use strict';
import * as Const from './const.js';
import {CTX} from './const.js';
import {MATRIX} from './matrix.js';

export default function Hero({heroX, heroY, heroR}) {
    this.x = Math.round(heroX);
    this.y = Math.round(heroY);
    this.r = heroR;
    this.direction = {OY: true, OX: false};

    const IMAGE = new Image(Hero.SIZE, Hero.SIZE);
    IMAGE.src = '/pacman/web/image/pac.png';

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

    const getCollideSides = function(field, type, step = 0) {
        const indexes = field.getIndexes(this, step);

        const isDirection = type === 'direction';

        return {
            left: isCollideLeft(indexes, isDirection),
            right: isCollideRight(indexes, isDirection),
            up: isCollideUp(indexes, isDirection),
            down: isCollideDown(indexes, isDirection),
        };
    }.bind(this);

    const fixWhenOXCollision = function(indexes, field, collision) {
        this.x = indexes.column * Hero.WIDTH;
        if (this.direction.left) this.x += Hero.WIDTH;

        Const.KEYS_MAP.left = collision.left ? false : Const.KEYS_MAP.left;
        Const.KEYS_MAP.right = collision.right ? false : Const.KEYS_MAP.right;
    }.bind(this);

    const fixWhenOYCollision = function(indexes, field, collision) {
        this.y = indexes.row * Hero.HEIGHT;
        if (this.direction.up) this.y += Hero.HEIGHT;

        Const.KEYS_MAP.up = collision.up ? false : Const.KEYS_MAP.up;
        Const.KEYS_MAP.down = collision.down ? false : Const.KEYS_MAP.down;
    }.bind(this);

    const checkCollisionWithField = function(field, step = 0) {
        const currentIndexes = field.getIndexes(this);
        const collideSides = getCollideSides(field, 'withField', step);

        const isCollideByOX = this.direction.OX && (collideSides.left || collideSides.right);
        const isCollideByOY = this.direction.OY && (collideSides.up || collideSides.down);

        if (isCollideByOX) {
            fixWhenOXCollision(currentIndexes, field, collideSides);

            return;
        }

        if (isCollideByOY) fixWhenOYCollision(currentIndexes, field, collideSides);
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
            right: object.x + Hero.WIDTH,
            top: object.y,
            bottom: object.y + Hero.HEIGHT,
        };
    };

    const compileHeroBounds = function() {
        this.leftBound = this.x + (Hero.WIDTH / 2 - this.r);
        this.rightBound = this.x + Hero.WIDTH - (Hero.WIDTH / 2 - this.r);
        this.topBound = this.y + (Hero.HEIGHT / 2 - this.r);
        this.bottomBound = this.y + Hero.HEIGHT - (Hero.HEIGHT / 2 - this.r);
    }.bind(this);

    const doCanChangeDirectionToOX = function(collideDirections) {
        const doCanToGoLeft = Const.KEYS_MAP.left && !collideDirections.left;
        const doCanToGoRight = Const.KEYS_MAP.right && !collideDirections.right;

        return this.direction.OY && (doCanToGoLeft || doCanToGoRight);
    }.bind(this);

    const doCanChangeDirectionToOY = function(collideDirections) {
        const doCanToGoUp = Const.KEYS_MAP.up && !collideDirections.up;
        const doCanToGoDown = Const.KEYS_MAP.down && !collideDirections.down;

        return this.direction.OX && (doCanToGoUp || doCanToGoDown);
    }.bind(this);

    const changeDirectionToOX = function() {
        this.direction.OY = false;
        this.direction.OX = true;

        Const.KEYS_MAP.up = false;
        Const.KEYS_MAP.down = false;
    }.bind(this);

    const changeDirectionToOY = function() {
        this.direction.OX = false;
        this.direction.OY = true;

        Const.KEYS_MAP.left = false;
        Const.KEYS_MAP.right = false;
    }.bind(this);

    const updateDirection = function(field) {
        if (!Number.isInteger(this.x / Hero.WIDTH) && this.direction.OX) return;
        if (!Number.isInteger(this.y / Hero.HEIGHT) && this.direction.OY) return;

        const collideDirections = getCollideSides(field, 'direction');

        if (doCanChangeDirectionToOX(collideDirections)) {
            changeDirectionToOX();

            return;
        }

        if (doCanChangeDirectionToOY(collideDirections)) changeDirectionToOY();
    }.bind(this);

    const updatePosition = function(step) {
        if (this.direction.OY) {
            if (!Const.KEYS_MAP.up && !Const.KEYS_MAP.down) return;
            if (Const.KEYS_MAP.up) {
                this.y -= step;
            }
            if (Const.KEYS_MAP.down) {
                this.y += step;
            }

            return;
        }

        if (!Const.KEYS_MAP.left && !Const.KEYS_MAP.right) return;
        if (Const.KEYS_MAP.left) {
            this.x -= step;
        }
        if (Const.KEYS_MAP.right) {
            this.x += step;
        }
    }.bind(this);

    this.update = function(step, field) {
        checkCollisionWithField(field, step);
        updateDirection(field);
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

    this.draw = function() {
        CTX.drawImage(IMAGE, Hero.START, Hero.START, Hero.SIZE, Hero.SIZE, this.x, this.y, Hero.WIDTH, Hero.HEIGHT);
    };
}

Hero.WIDTH = 20;
Hero.HEIGHT = 20;
Hero.START = 0;
Hero.SIZE = 480;

Hero.initializeHero = function(field) {
    const heroX = (Const.CANVAS.width - Hero.WIDTH) / 2 + Hero.WIDTH / 2;
    const heroY = (Const.CANVAS.height - Hero.HEIGHT) / 2 - Hero.HEIGHT / 2;

    return new Hero({heroX, heroY, heroR: 6});
};
