//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class ThrowableObject extends MovableObject {
    speed = 15;
    height = 50;
    width = 40;
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

    constructor(_x, _y) {
        super();
        this.loadImage(ImageHub.salsaBottle.rotation[0]);
        this.loadImages(ImageHub.salsaBottle.rotation);  // wie wird richtig animiert?
        this.loadImages(ImageHub.salsaBottle.splash);  // muss das hier hin?
        this.throw(_x, _y);
        this.getRealFrame();
        IntervalHub.startInterval(this.animate, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 30);
    }

    // Methode zum werfen bzw Startpunkt und Gravitationskraft der Flasche
    throw(_x, _y) {
        this.x = _x + 40;
        this.y = _y + 130;
        this.speedY = 25;
    }

    // bewegung
    animate = () => {
            this.rX += 8;
            this.x += 8;
    };

    // vielleicht muss splash hier hin
    // splash() {
    //     this.currentImage = 0;
    //     this.splashAnimation(ImageHub.salsaBottle.splash);
    // }

    // offset der Hitbox
    getRealFrame(){
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }
}

// flaschen nach dem platzen/level wieder löschen
