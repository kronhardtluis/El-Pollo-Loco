import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./moveable-object.class.js";

export class Character extends MovableObject {
    width = 100;
    height = 250;
    x = 120;
    y = 180;

    constructor() {
        super().loadImage(ImageHub.character.idle[0]);
        this.loadImages(ImageHub.character.walk);
        IntervalHub.startInterval(this.animate, 90);
    }

    animate() {
        if (Keyboard.RIGHT) {
            const i = this.currentImage % ImageHub.character.walk.length;
            const path = ImageHub.character.walk[i];
            console.log(path);
            console.log(i);
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    moveRight() {}

    jump() {}
}