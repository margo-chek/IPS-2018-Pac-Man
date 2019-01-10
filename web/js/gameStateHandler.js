'use strict';

const CONTROLLER = document.getElementById('controller');
const MODAL = document.getElementById('winMod');
const CONTINUE_BUTTON = document.getElementById('continueButton');

export default function GameStateHandler() {
    this.state = 'game';

    this.turnPauseOff = () => {
        if (this.state === 'game') return;

        MODAL.style.display = 'none';

        this.state = 'game';
    };

    this.turnPauseOn = () => {
        if (this.state === 'pause') return;

        MODAL.style.display = 'block';

        this.state = 'pause';
    };

    CONTROLLER.addEventListener('click', this.turnPauseOn);
    CONTINUE_BUTTON.addEventListener('click', this.turnPauseOff);
}
