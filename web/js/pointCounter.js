'use strict';

const COUNTER = document.getElementById( 'counter' );
const NUMBER_OF_DIGITS = 8;
const SCORE_STEP = 300;
const DELAY = 10;

export default function PointCounter() {
    this.currCount = 0;
    this.currPoints = 0;

    COUNTER.innerText = (this.currCount + '').padStart( NUMBER_OF_DIGITS, '0' );

    this.getScoreStep = function() {
        return SCORE_STEP;
    };

    this.getCurrPoints = function() {
        return this.currPoints;
    };

    let counterInterval = null;
    this.increasePoints = function() {
        this.currPoints += SCORE_STEP;

        if (counterInterval !== null) return;
        counterInterval = setInterval( () => {
            COUNTER.innerText = (++this.currCount + '').padStart( NUMBER_OF_DIGITS, '0' );

            if (this.currCount === this.currPoints) {
                clearInterval( counterInterval );
                counterInterval = null;
            }
        }, DELAY );
    };
}
