export class Keyboard {
    static UP = false;
    static LEFT = false;
    static RIGHT = false;
    static SPACE = false;

    static setControls() {
        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp" || e.key == "w") {
                Keyboard.UP = true;
            }
            if (e.key == "ArrowLeft" || e.key == "a") {
                Keyboard.LEFT = true;
            }
            if (e.key == "ArrowRight" || e.key == "d") {
                Keyboard.RIGHT = true;
            }
            if (e.key == " ") {
                Keyboard.SPACE = true;
            }
        });
        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp" || e.key == "w") {
                Keyboard.UP = false;
            }
            if (e.key == "ArrowLeft" || e.key == "a") {
                Keyboard.LEFT = false;
            }
            if (e.key == "ArrowRight" || e.key == "d") {
                Keyboard.RIGHT = false;
            }
            if (e.key == " ") {
                Keyboard.SPACE = false;
            }
        });
    }
}

Keyboard.setControls();