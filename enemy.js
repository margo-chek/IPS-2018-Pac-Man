window.Enemy = function Enemy({ enemyX, enemyY, enemyColor, enemyDirection = "" }) {
    this.x = Math.round(enemyX);
    this.y = Math.round(enemyY);
    this.r = 7;
    this.direction = { OY: false, OX: false, left: false, right: false, up: false, down: false };
    this.directionChangeInterval = null;

    this.initialize = function (expectedDirection = '') {
        let collision = this.checkCurrentCollision();

        switch (expectedDirection) {
            case 'up':
                if (!collision.up) {
                    this.direction.up = true;
                    this.direction.OY = true;

                    return;
                }
                break;
            case 'down':
                if (!collision.down) {
                    this.direction.down = true;
                    this.direction.OY = true;

                    return;
                }
                break;
            case 'left':
                if (!collision.left) {
                    this.direction.left = true;
                    this.direction.OX = true;

                    return;
                }
                break;
            case 'right':
                if (!collision.right) {
                    this.direction.right = true;
                    this.direction.OX = true;

                    return;
                }
                break;
        }

        this.getRandomDirection();
    }

    this.setDirection = function (direction) {
        switch (direction) {
            case 'up':
                this.direction.up = true;
                this.direction.down = false;

                this.direction.OY = true;
                this.direction.OX = false;
                break;
            case 'down':
                this.direction.down = true;
                this.direction.up = false;

                this.direction.OY = true;
                this.direction.OX = false;
                break;
            case 'left':
                this.direction.left = true;
                this.direction.right = false;

                this.direction.OX = true;
                this.direction.OY = false;
                break;
            case 'right':
                this.direction.right = true;
                this.direction.left = false;

                this.direction.OX = true;
                this.direction.OY = false;
                break;
        }
    }

    this.getRandomDirection = function () {
        let directionsArray = [];
        clearInterval(this.directionChangeInterval);
        this.directionChangeInterval = null;
        this.direction = { OY: false, OX: false, left: false, right: false, up: false, down: false };
        let collision = this.checkCurrentCollision();

        if (!collision.left) {
            directionsArray.push("left");
        }
        if (!collision.right) {
            directionsArray.push("right");
        }
        if (!collision.up) {
            directionsArray.push("up");
        }
        if (!collision.down) {
            directionsArray.push("down");
        }

        let index = Math.round(Math.random() * (0 - (directionsArray.length - 1))) + (directionsArray.length - 1);
        this.setDirection(directionsArray[index]);
    }

    const COLOR = enemyColor;
    this.draw = function () {
        ctx.fillStyle = COLOR;
        ctx.fillStyle = COLOR;
        ctx.beginPath();
        ctx.arc((this.x + Enemy.WIDTH / 2), (this.y + Enemy.HEIGHT / 2), this.r, 0, Math.PI * 2);
        ctx.fill();
    }

    this.update = function (step) {
        this.checkCollisionWithField(step);
        this.updateDirection();
        this.updatePosition(step);
    }

    this.checkCollisionWithField = function (step = 0) {
        let indexesWithStep = Field.getIndexes(this, step);
        let currentIndexes = Field.getIndexes(this);
        let collideSides = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        let field = Field.matrix;

        if (indexesWithStep.row < 0 || indexesWithStep.rowWide > 30 || indexesWithStep.column < 0 || indexesWithStep.columnWide > 40) {
            if (indexesWithStep.row < 0) thix.y = 20;
            if (indexesWithStep.rowWide > 30) thix.y = 580;
            if (indexesWithStep.column < 0) thix.x = 20;
            if (indexesWithStep.columnWide > 40) thix.x = 780;

            this.getRandomDirection();

            return;
        }

        if (field[indexesWithStep.row][indexesWithStep.column] === 1 || field[indexesWithStep.rowWide][indexesWithStep.column] === 1) collideSides.left = true;
        if (field[indexesWithStep.row][indexesWithStep.columnWide] === 1 || field[indexesWithStep.rowWide][indexesWithStep.columnWide] === 1) collideSides.right = true;
        if (field[indexesWithStep.row][indexesWithStep.column] === 1 || field[indexesWithStep.row][indexesWithStep.columnWide] === 1) collideSides.up = true;
        if (field[indexesWithStep.rowWide][indexesWithStep.column] === 1 || field[indexesWithStep.rowWide][indexesWithStep.columnWide] === 1) collideSides.down = true;

        if (this.direction.OX && (collideSides.left || collideSides.right)) {
            this.x = currentIndexes.column * Field.blockageWidth;

            if (this.direction.left) this.x += 20;

            this.getRandomDirection();

            return collideSides;
        }

        if (this.direction.OY && (collideSides.up || collideSides.down)) {
            this.y = currentIndexes.row * Field.blockageHeight;

            if (this.direction.up) this.y += 20;

            this.getRandomDirection();
        }

        return collideSides;
    }

    this.checkCurrentCollision = function () {
        let collision = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        let indexes = Field.getIndexes(this);

        let field = Field.matrix;
        if (field[indexes.row][indexes.column - 1] === 1) collision.left = true;
        if (field[indexes.row][indexes.columnWide + 1] === 1) collision.right = true;
        if (field[indexes.row - 1][indexes.column] === 1) collision.up = true;
        if (field[indexes.rowWide + 1][indexes.column] === 1) collision.down = true;

        return collision;
    }

    this.changeDirection = function () {
        if (this.direction.OX) {
            let directions = ['up', 'down'];

            let index = Math.round(Math.random());
            this.setDirection(directions[index]);

            this.direction.OX = true;
            this.direction.OY = false;

            return;
        }

        let directions = ['left', 'right'];

        let index = Math.round(Math.random());
        this.setDirection(directions[index]);

        this.direction.OX = false;
        this.direction.OY = true;
    }

    this.updateDirection = function () {
        if (!this.directionChangeInterval) {
            this.directionChangeInterval = setInterval(() => this.changeDirection(), 1000);
        }

        if (!Number.isInteger(this.x / 20) && this.direction.OX) return;
        if (!Number.isInteger(this.y / 20) && this.direction.OY) return;

        let collideDirections = this.checkCurrentCollision();

        if (this.direction.OY && (this.direction.left || this.direction.right)) {
            if ((this.direction.left && !collideDirections.left)
                || (this.direction.right && !collideDirections.right)) {
                this.direction.OY = false;
                this.direction.OX = true;

                this.direction.up = false;
                this.direction.down = false;
            }

            return;
        }

        if (this.direction.OX && (this.direction.up || this.direction.down)) {
            if ((this.direction.up && !collideDirections.up)
                || (this.direction.down && !collideDirections.down)) {
                this.direction.OX = false;
                this.direction.OY = true;

                this.direction.left = false;
                this.direction.right = false;
            }
        }
    }

    this.updatePosition = function (step) {
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
    }

    this.initialize(enemyDirection);
}

Enemy.WIDTH = 20;
Enemy.HEIGHT = 20;