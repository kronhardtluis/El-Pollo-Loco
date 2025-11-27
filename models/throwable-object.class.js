import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./moveable-object.class.js";

export class ThrowableObject extends MovableObject {
    speed = 15;

    constructor() {
        super().loadImage(ImageHub.bottle.rotation[0]);
        this.loadImages(ImageHub.bottle.splash);
        this.throw(50, 310);
        this.height = 50;
        this.width = 40;
        IntervalHub.startInterval(this.animate, 30);
        IntervalHub.startInterval(this.applyGravity, 30);
    }

    throw(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    animate = () => {
        if(Keyboard.SPACE) {
            this.moveRight(this.speed);
        }
    }
}