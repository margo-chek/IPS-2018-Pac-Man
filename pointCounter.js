'use strict';

export default function PointCounter() {
    this.currCount = 0;
    this.currPoints = 0;

    const counter = document.getElementById('counter');
    counter.innerText = (this.currCount + '').padStart(8, '0');

    this.getCurrPoints = function() {
        return this.currPoints;
    };

    let counterInterval = null;
    this.increasePoints = function() {
        this.currPoints += 200;

        if (counterInterval !== null) return;
        counterInterval = setInterval(() => {
            counter.innerText = (++this.currCount + '').padStart(8, '0');

            if (this.currCount === this.currPoints) {
                clearInterval(counterInterval);
                counterInterval = null;
            }
        });
    };
}
