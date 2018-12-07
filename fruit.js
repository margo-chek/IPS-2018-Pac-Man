window.Fruit = function Fruit({ fruitX, fruitY }) {
    this.x = Math.round(fruitX);
    this.y = Math.round(fruitY);
    this.r = 3;
    const bonusSprite = new Image();
    bonusSprite.src = 'image/fru.png';

    const COLOR = "pink";

    this.draw = function () {
        ctx.drawImage(
            bonusSprite,
            Fruit.START,
            Fruit.START,
            Fruit.IMG_WIDTH,
            Fruit.IMG_HEIGHT,
            this.x,
            this.y,
            Fruit.WIDTH,
            Fruit.HEIGHT,
        );
        //ctx.fillStyle = COLOR;
        //ctx.beginPath();
        //ctx.arc((this.x + Fruit.WIDTH / 2), (this.y + Fruit.HEIGHT / 2), this.r, 0, Math.PI * 2);
        //ctx.fill();
    }
}

Fruit.WIDTH = 20;
Fruit.HEIGHT = 20;
Fruit.IMG_WIDTH = 506;
Fruit.IMG_HEIGHT = 506;
Fruit.START = 0;