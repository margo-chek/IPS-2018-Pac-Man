window.Hero = function Hero({ heroX, heroY, heroR }) {
    this.x = Math.round(heroX);
    this.y = Math.round(heroY);
    this.r = heroR;
    this.direction = { OY: true, OX: false };

    const COLOR = "yellow";

    this.draw = function () {
        ctx.fillStyle = COLOR;
        ctx.beginPath();
        ctx.arc((this.x + Hero.WIDTH / 2), (this.y + Hero.HEIGHT / 2), this.r, 0, Math.PI * 2);
        ctx.fill();
    }

    this.update = function (step) {
        this.checkCollisionWithField(step);
        this.updateDirection(step);
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

        if (field[indexesWithStep.row][indexesWithStep.column] === 1 || field[indexesWithStep.rowWide][indexesWithStep.column] === 1) collideSides.left = true;
        if (field[indexesWithStep.row][indexesWithStep.columnWide] === 1 || field[indexesWithStep.rowWide][indexesWithStep.columnWide] === 1) collideSides.right = true;
        if (field[indexesWithStep.row][indexesWithStep.column] === 1 || field[indexesWithStep.row][indexesWithStep.columnWide] === 1) collideSides.up = true;
        if (field[indexesWithStep.rowWide][indexesWithStep.column] === 1 || field[indexesWithStep.rowWide][indexesWithStep.columnWide] === 1) collideSides.down = true;

        if (this.direction.OX && (collideSides.left || collideSides.right)) {
            this.x = currentIndexes.column * Field.blockageWidth;

            if (this.direction.left) this.x += 20;

            keysMap.left = collideSides.left ? false : keysMap.left;
            keysMap.right = collideSides.right ? false : keysMap.right;

            return;
        }

        if (this.direction.OY && (collideSides.up || collideSides.down)) {
            this.y = currentIndexes.row * Field.blockageHeight;

            if (this.direction.up) this.y += 20;

            keysMap.up = collideSides.up ? false : keysMap.up;
            keysMap.down = collideSides.down ? false : keysMap.down;
        }
    }

    this.updateDirection = function () {
        if (!Number.isInteger(this.x / 20) && this.direction.OX) return;
        if (!Number.isInteger(this.y / 20) && this.direction.OY) return;

        let collideDrections = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        let indexes = Field.getIndexes(this);

        let field = Field.matrix;
        if (field[indexes.row][indexes.column - 1] === 1) collideDrections.left = true;
        if (field[indexes.row][indexes.columnWide + 1] === 1) collideDrections.right = true;
        if (field[indexes.row - 1][indexes.column] === 1) collideDrections.up = true;
        if (field[indexes.rowWide + 1][indexes.column] === 1) collideDrections.down = true;

        if (this.direction.OY && (keysMap.left || keysMap.right)) {
            if ((keysMap.left && !collideDrections.left)
                || (keysMap.right && !collideDrections.right)) {
                this.direction.OY = false;
                this.direction.OX = true;

                keysMap.up = false;
                keysMap.down = false;
            }

            return;
        }

        if (this.direction.OX && (keysMap.up || keysMap.down)) {
            if ((keysMap.up && !collideDrections.up)
                || (keysMap.down && !collideDrections.down)) {
                this.direction.OX = false;
                this.direction.OY = true;

                keysMap.left = false;
                keysMap.right = false;
            }
        }
    }

    this.updatePosition = function (step) {
        if (this.direction.OY) {
            if (!keysMap.up && !keysMap.down) return;

            if (keysMap.up) {
                this.y -= step;
            }
            if (keysMap.down) {
                this.y += step;
            }

            return;
        }


        if (!keysMap.left && !keysMap.right) return;

        if (keysMap.left) {
            this.x -= step;
        }
        if (keysMap.right) {
            this.x += step;
        }
    }
}

Hero.WIDTH = 20;
Hero.HEIGHT = 20;