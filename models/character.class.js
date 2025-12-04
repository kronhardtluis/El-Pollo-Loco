import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./moveable-object.class.js";

export class Character extends MovableObject {
    // #region Attributes
    width = 100;
    height = 250;
    x = 100;
    y = 180;
    speed = 25;
    world;
    doingNothing = false;
    sleeping = false;
    // #endregion

    constructor() {
        super();
        this.loadImage(ImageHub.character.idle[0]);
        this.loadImages(ImageHub.character.idle);
        this.loadImages(ImageHub.character.idleLong);
        this.loadImages(ImageHub.character.walk);
        this.loadImages(ImageHub.character.jump);
        this.loadImages(ImageHub.character.hurt);
        this.loadImages(ImageHub.character.dead);
        IntervalHub.startInterval(this.applyGravity, 30);
        IntervalHub.startInterval(this.animate, 1000 / 12);
    }

    // tot-abfrage + Spring-/Laufanimation
    animate = () => {
        // if (this.isDead()) {
        //     this.playAnimation(ImageHub.character.dead);
        //     setTimeout(IntervalHub.stopAllIntervals, 370);
        // } else {
        if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.resetIdle();
            this.moveRight(this.speed);
            this.otherDirection = false;
        }
        if (Keyboard.LEFT && this.x > -615) {
            this.resetIdle();
            this.moveLeft(this.speed);
            this.otherDirection = true;
        }
        if (Keyboard.UP && !this.isAboveGround()) {
            this.resetIdle();
            this.jump();
        }
        if (this.isHurt()) {
            this.resetIdle();
            this.playAnimation(ImageHub.character.hurt);
        } else if (this.speedY > 0) {
            this.jumpAnimation(ImageHub.character.jump, 4);
        } else if (this.speedY < 0) {
            this.jumpAnimation(ImageHub.character.jump, 8);
            if (!this.isAboveGround()) {
                this.speedY = 0;
            }
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(ImageHub.character.walk);
        } else {
            if (!this.doingNothing && !this.sleeping) {
                this.loadImage(ImageHub.character.idle[0]);
                setTimeout(this.doingNothing = true, 2000);
            }
            if (this.doingNothing && !this.sleeping) {
                this.playAnimation(ImageHub.character.idle);
                setTimeout(this.sleeping = true, 3000);
            }
            if (this.doingNothing && this.sleeping) {
                this.playAnimation(ImageHub.character.idleLong);
            }
        }
        this.world.camera_x = -this.x + 100;
        // }
    };

    resetIdle() {
        this.doingNothing = false;
        this.sleeping = false;
    }
}
