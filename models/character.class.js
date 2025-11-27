import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./moveable-object.class.js";

export class Character extends MovableObject {
    width = 100;
    height = 250;
    x = 0;
    y = 180;
    speed = 15;
    world;

    constructor() {
        super().loadImage(ImageHub.character.idle[0]);
        this.loadImages(ImageHub.character.walk);
        this.loadImages(ImageHub.character.jump);
        this.loadImages(ImageHub.character.hurt);
        this.loadImages(ImageHub.character.dead);
        IntervalHub.startInterval(this.applyGravity, 30);
        IntervalHub.startInterval(this.animate, 1000 / 30);
    }

    animate = () => {
        if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight(this.speed);
            this.otherDirection = false;
        }
        if (Keyboard.LEFT && this.x > -615) {
            this.moveLeft(this.speed);
            this.otherDirection = true;
        }
        if (Keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }
        if (this.isDead()) {
            this.playAnimation(ImageHub.character.dead);
        }else if (this.isHurt()) {
            this.playAnimation(ImageHub.character.hurt);
        }else if (this.isAboveGround() || this.speedY > 0) {
            this.playAnimation(ImageHub.character.jump);
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(ImageHub.character.walk);
        }
        this.world.camera_x = -this.x + 100;
    };
}

// idle() {
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

// if () {
//     this.x -= this.speed;
//     const i = this.currentImage % ImageHub.character.walk.length;
//     const path = ImageHub.character.walk[i];
//     this.img = this.imageCache[path];
//     this.currentImage++;
// }
