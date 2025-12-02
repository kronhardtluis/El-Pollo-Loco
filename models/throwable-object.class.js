//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { LEVEL1 } from "../levels/level1.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class ThrowableObject extends MovableObject {
    speed = 15;

    constructor(_x, _y) {
        super();
        this.loadImage(ImageHub.salsaBottle.rotation[0]);
        this.loadImages(ImageHub.salsaBottle.splash);
        this.throw(_x, _y);
        this.height = 50;
        this.width = 40;
        IntervalHub.startInterval(this.animate, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 30);
    }

    // Methode zum werfen der Flasche
    throw(_x, _y) {
        this.x = _x + 40;
        this.y = _y + 130;
        this.speedY = 25;
    }

    animate = () => {
        if (this.checkCollision()) {
            console.log("hit");
        } else {
            this.x += 8;
        }
    };

    splash() {}

    checkCollision() {
        if(this.x > 180) {
            LEVEL1.enemies.forEach((enemy) => this.isColliding(enemy));
        }
    }
}

// flaschen nach dem platzen/level wieder löschen
