let rightPressed = false;
let leftPressed = false;
let topPressed = false;
let spacePressed = false;
let bottomPressed = false;

const rightKeyCode = 39;
const leftKeyCode = 37;
const topKeyCode = 38;
const bottomKeyCode = 40;
const spaceKeyCode = 32;

function keyDownHandler(e) {
  // TODO: switch case
  if (e.keyCode === rightKeyCode) {
    rightPressed = true;
  } else if (e.keyCode === leftKeyCode) {
    leftPressed = true;
  } else if (e.keyCode === topKeyCode) {
    topPressed = true;
  } else if (e.keyCode === bottomKeyCode) {
    bottomPressed = true;
  } else if (e.keyCode === spaceKeyCode) {
    spacePressed = true;
  }
}

function keyUpHandler(e) {
  // TODO: switch case
  if (e.keyCode === rightKeyCode) {
    rightPressed = false;
  } else if (e.keyCode === leftKeyCode) {
    leftPressed = false;
  } else if (e.keyCode === topKeyCode) {
    topPressed = false;
  } else if (e.keyCode === bottomKeyCode) {
    bottomPressed = false;
  } else if (e.keyCode === spaceKeyCode) {
    spacePressed = false;
  }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

export const isRightPressed = () => rightPressed;
export const isLeftPressed = () => leftPressed;
export const isTopPressed = () => topPressed;
export const isSpacePressed = () => spacePressed;
export const isBottomPressed = () => bottomPressed;