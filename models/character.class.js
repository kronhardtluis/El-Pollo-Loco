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
    // #endregion

    constructor() {
        super().loadImage(ImageHub.character.idle[0]);
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
        //     setTimeout(IntervalHub.stopAllIntervals, 2000);
        // } else {
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
        if (this.isHurt()) {
            this.playAnimation(ImageHub.character.hurt);
        } else if (this.isAboveGround() || this.speedY > 0) {
            this.playAnimationOnce(ImageHub.character.jump, 0, 3);
        }else if (this.isAboveGround() || this.speedY < 0){
            this.playAnimationOnce(ImageHub.character.jump, 4, 8);
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(ImageHub.character.walk);
        } else {
            this.doingNothing = true;
            this.loadImage(ImageHub.character.idle[0])
        }
        this.world.camera_x = -this.x + 100;
        // }
    };
}
