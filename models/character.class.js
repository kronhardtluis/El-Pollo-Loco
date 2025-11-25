import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./moveable-object.class.js";
import { World } from "./world.class.js";

export class Character extends MovableObject {
    width = 100;
    height = 250;
    x = 0;
    y = 180;
    speed = 10;

    constructor() {
        super().loadImage(ImageHub.character.idle[0]);
        this.loadImages(ImageHub.character.walk);
        IntervalHub.startInterval(this.animate, 50);
    }

    animate = () => {
        if (Keyboard.RIGHT) {
            this.x += this.speed;
            this.otherDirection = false;
        }
        if (Keyboard.LEFT) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
        if (Keyboard.RIGHT || Keyboard.LEFT) {
            const i = this.currentImage % ImageHub.character.walk.length;
            const path = ImageHub.character.walk[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
        this.world.camera_x = -this.x;
        // if () {
        //     this.x -= this.speed;
        //     const i = this.currentImage % ImageHub.character.walk.length;
        //     const path = ImageHub.character.walk[i];
        //     this.img = this.imageCache[path];
        //     this.currentImage++;
        // }
    };

    moveRight() {}

    jump() {}
}


    // idle = () => {
    //     if (
    //         Keyboard.RIGHT == false &&
    //         Keyboard.UP == false &&
    //         Keyboard.LEFT == false &&
    //         Keyboard.SPACE == false
    //     ) {
    //         const i = this.currentImage % ImageHub.character.idle.length;
    //         const path = ImageHub.character.idle[i];
    //         this.img = this.imageCache[path];
    //         this.currentImage++;
    //     }
    // }