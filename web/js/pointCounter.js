'use strict';

export default function PointCounter() {
    this.currCount = 0;
    this.currPoints = 0;

    const counter = document.getElementById('counter');
    counter.innerText = (this.currCount + '').padStart(PointCounter.NumberOfDigits, '0');

    this.getCurrPoints = function() {
        return this.currPoints;
    };

    let counterInterval = null;
    this.increasePoints = function() {
        this.currPoints += PointCounter.Score;

        if (counterInterval !== null) return;
        counterInterval = setInterval(() => {
            counter.innerText = (++this.currCount + '').padStart(PointCounter.NumberOfDigits, '0');

            if (this.currCount === this.currPoints) {
                clearInterval(counterInterval);
                counterInterval = null;
            }
        }, PointCounter.Delay);
    };
}

PointCounter.NumberOfDigits = 8;
PointCounter.Score = 300;
PointCounter.Delay = 1;
