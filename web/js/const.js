export const CANVAS = document.getElementById('Canvas');
export const CTX = CANVAS.getContext('2d');
CANVAS.width = 800;
CANVAS.height = 600;
export const wall = 20;
export const step = Math.floor(150 / 60);

export const KEYS_MAP = {
    left: false,
    right: false,
    up: false,
    down: false,
};

const RIGHT_KEY_CODE = 39;
const LEFT_KEY_CODE = 37;
const TOP_KEY_CODE = 38;
const BOTTOM_KEY_CODE = 40;

function keyDownHandler(e) {
    if (e.which === RIGHT_KEY_CODE) {
        if (KEYS_MAP.left) KEYS_MAP.left = false;

        KEYS_MAP.right = true;
    }
    if (e.which === LEFT_KEY_CODE) {
        if (KEYS_MAP.right) KEYS_MAP.right = false;

        KEYS_MAP.left = true;
    }
    if (e.which === TOP_KEY_CODE) {
        if (KEYS_MAP.down) KEYS_MAP.down = false;

        KEYS_MAP.up = true;
    }
    if (e.which === BOTTOM_KEY_CODE) {
        if (KEYS_MAP.up) KEYS_MAP.up = false;

        KEYS_MAP.down = true;
    }
    e.preventDefault();
}

document.addEventListener('keydown', keyDownHandler, false);
