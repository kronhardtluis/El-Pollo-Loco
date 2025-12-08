//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

// für anyKey (Space-taste ein Ticket)

export class Character extends MovableObject {
    // #region Attributes
    width = 100;
    height = 250;
    x = 100;
    y = 180;
    rX;
    rY;
    rW;
    rH;
    offset = {
        top: 120,
        right: 27,
        bottom: 30,
        left: 15,
    };
    speed = 25;
    world;
    doingNothing = false;
    lastAction = 0;
    idleDate = 0;
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
        this.getRealFrame();
        IntervalHub.startInterval(this.applyGravity, 30);
        IntervalHub.startInterval(this.animate, 1000 / 12);
    }

    //#region animation
    // tot-abfrage + Spring-/Laufanimation
    animate = () => {
        // if (this.isDead()) {
            // this.playAnimation(ImageHub.character.dead);                 // stoppt alle Intervalle wenn tot
        //     setTimeout(IntervalHub.stopAllIntervals, 370);
        // } else {
        if (Keyboard.RIGHT && this.x < Level.levelEndX + 90) {
            this.moveRight(this.speed);
            this.otherDirection = false;
        }
        if (Keyboard.LEFT && this.x > -600) {
            this.moveLeft(this.speed);
            this.otherDirection = true;
        }
        if (Keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }
        if (this.anyKey()) {
            this.resetIdle();
        }
        this.determineAnimation();
        this.idleTimeout();
        this.world.camera_x = -this.x + 100;
        // }
    };

    anyKey() {
        return Keyboard.UP || Keyboard.LEFT || Keyboard.RIGHT || Keyboard.SPACE;
    }

    resetIdle() {
        this.idleDate = 0;
        this.doingNothing = false;
    }

    idleTimeout() {
        if (!this.doingNothing) {
            this.lastAction = new Date().getTime();
        } else {
            let timepassed = new Date().getTime() - this.lastAction;
            timepassed = timepassed / 1000;
            this.idleDate = timepassed;
        }
    }

    // Bestimmen der jeweiligen Animation
    determineAnimation() {
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
            this.doingNothing = true;
            this.idleAnimation();
        }
    }

    idleAnimation() {
        if (this.idleDate < 3) {
            this.playAnimation(ImageHub.character.idle);
        }
        if (this.idleDate > 3) {
            this.playAnimation(ImageHub.character.idleLong);
        }
    }
    //#endregion

    // offset der Hitbox
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }
}