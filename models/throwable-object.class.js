//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";
import { UPGRADES } from "./upgrades.js";
//#endregion

export class ThrowableObject extends MovableObject {
    height = 50;
    width = 50;
    x;
    y;
    rX;
    rY;
    rW;
    rH;
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
    };
    speedX = 0;
    isSplashing = false;
    frameCount = 0;
    direction = "";

    constructor(_x, _y, _direction) {
        super();
        this.loadImage(ImageHub.salsaBottle.rotation[0]);
        this.loadImages(ImageHub.salsaBottle.rotation);
        this.loadImages(ImageHub.salsaBottle.splash);
        this.throw(_x, _y, _direction);
        IntervalHub.startInterval(this.animate, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 30);
    }

    // Methode zum werfen bzw Startpunkt und Wurfkraft der Flasche
    throw(_x, _y, _direction) {
        this.speedY = 20 - UPGRADES.throwStrength / 2;
        this.y = _y + 130;
        if (_direction) {
            this.x = _x + 10;
            this.speedX = (8 + UPGRADES.throwStrength) * -1;
        } else {
            this.x = _x + 40;
            this.speedX = 8 + UPGRADES.throwStrength;
        }
    }

    // bewegung
    animate = () => {
        this.getRealFrame();
        if (!this.isSplashing) {
            this.x += this.speedX;
            this.rX += this.speedX;
            this.determineAnimation();
        } else {
            this.speedY = 0;
        }
    };

    // offset der Hitbox
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    determineAnimation() {
        if (this.frameCount % 5 === 0) {
            this.frameCount = 1;
            this.playAnimation(ImageHub.salsaBottle.rotation);
        } else {
            this.frameCount++;
        }
    }

    throwDirection() {
        console.log(this.otherDirection);

        if (this.direction == "right") {
            this.rX += 8;
            this.x += 8;
        } else if (this.direction == "left") {
            this.rX -= 8;
            this.x -= 8;
        } else if (!this.otherDirection && this.direction == "") {
            this.direction = "right";
        } else if (this.otherDirection && this.direction == "") {
            this.direction = "left";
        }
    }

    splashAnimation(array, index) {
        this.splashScaling();
        if (this.currentImage < ImageHub.salsaBottle.splash.length) {
            if (this.frameCount % 6 === 0) {
                this.frameCount = 1;
                const path = ImageHub.salsaBottle.splash[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else this.frameCount++;
        } else {
            array.splice(index, 1);
        }
    }

    splashScaling() {
        const sS = UPGRADES.splashScale;
        this.height += sS;
        this.width += sS;
        this.x -= sS / 2;
        this.y -= sS / 2;
    }
}

// flaschen nach dem platzen/level wieder löschen
