'use strict';

export default function GameStateHandler() {
    const controller = document.getElementById('controller');
    controller.addEventListener('click', this.handleClick);

    this.state = 'game';

    this.handleClick = () => {
        //Тут нужна вся обработка изменения самого DOM элемента
        const infoWindow = document.getElementById('winMod');
        infoWindow.style.display = 'block';


        this.state = this.state === 'game' ? 'pause' : 'game';
    };
}
