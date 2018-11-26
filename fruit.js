window.Fruit = function Fruit({ fruitX, fruitY }) {
    this.x = Math.round(fruitX);
    this.y = Math.round(fruitY);
    this.r = 3;

    const COLOR = "pink";

    this.draw = function () {
        ctx.fillStyle = COLOR;
        ctx.beginPath();
        ctx.arc((this.x + Fruit.WIDTH / 2), (this.y + Fruit.HEIGHT / 2), this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

Fruit.WIDTH = 20;
Fruit.HEIGHT = 20;