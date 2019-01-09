'use strict';

export default function GameStateHandler() {
    const controller = document.getElementById('controller');
    controller.addEventListener('click', this.handleClick);

    this.state = 'game';

    this.handleClick = () => {
        //Тут нужна вся обработка изменения самого DOM элемента

        this.state = this.state === 'game' ? 'pause' : 'game';
    };
}
