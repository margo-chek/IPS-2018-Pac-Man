window.Fruit = function Fruit({ fruitX, fruitY }) {
    this.x = Math.round(fruitX);
    this.y = Math.round(fruitY);
    this.r = 3;
    const heroSprite = new Image();
    heroSprite.src = 'image/fru.png';

    const COLOR = "pink";

    this.draw = function () {
        ctx.drawImage(
            heroSprite,
            0,
            0,
            506,
            506,
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