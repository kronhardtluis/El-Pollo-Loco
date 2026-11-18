export class Keyboard {
    // #region Attributes
    static UP = false;
    static LEFT = false;
    static RIGHT = false;
    static SPACE = false;
    //#endregion

    // aktivieren und zurücksetzen bei Tastendruck
    static setControls() {
        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
                Keyboard.UP = true;
            }
            if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
                Keyboard.LEFT = true;
            }
            if (e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
                Keyboard.RIGHT = true;
            }
            if (e.key == " ") {
                Keyboard.SPACE = true;
            }
        });
        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
                Keyboard.UP = false;
            }
            if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
                Keyboard.LEFT = false;
            }
            if (e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
                Keyboard.RIGHT = false;
            }
            if (e.key == " ") {
                Keyboard.SPACE = false;
            }
        });
    }
}

Keyboard.setControls();