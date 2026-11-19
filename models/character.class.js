//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./moveable-object.class.js";
import { UPGRADES } from "./upgrades.class.js";
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
        right: 30,
        bottom: 30,
        left: 20,
    };
    doingNothing = false;
    lastAction = 0;
    idleDate = 0;
    frameCount = 0;
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
        IntervalHub.startInterval(this.animate, 1000 / 60);
        this.energy = UPGRADES.energy;
    }

    //#region animation
    // tot-abfrage + Spring-/Laufanimation
    animate = () => {
        // if (this.energy == 0) {
        // IntervalHub.stopAllIntervals();
        // IntervalHub.startInterval(this.playAnimation(ImageHub.character.dead), 100);                 // stoppt alle Intervalle wenn tot
        // } else {
        if (Keyboard.RIGHT && this.x < this.world.level.levelEndX + 90) {
            this.moveRight(UPGRADES.speed);
            this.otherDirection = false;
        }
        if (Keyboard.LEFT && this.x > -600) {
            this.moveLeft(UPGRADES.speed);
            this.otherDirection = true;
        }
        if (Keyboard.UP && !this.isAboveGround()) {
            this.jump(UPGRADES.jumpStrength);
        }
        if (this.anyKey()) {
            this.resetIdle();
        }
        this.getRealFrame();
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
        if (this.frameCount % 6 === 0) {
            this.frameCount = 1;
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
        } else {
            this.frameCount++;
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
