//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class Endboss extends MovableObject {
    //#region Attributes
    width = 400;
    height = 450;
    x = 720;
    y = 5;
    rX;
    rY;
    rW;
    rH;
    offset = {
        top: 175,
        right: 50,
        bottom: 120,
        left: 80,
    };
    bossSpawned = false;
    frameCount = 0;
    //#endregion

    constructor() {
        super();
        this.getRealFrame();
        this.loadImage(ImageHub.boss.alert[0]);
        this.loadImages(ImageHub.boss.alert);
        IntervalHub.startInterval(this.animate, 1000/60);
    }

    animate = () => {
        this.setBossX();
        this.determineAnimation();                // muss noch alles gemacht werden
        this.moveLeft(0);
    };

    determineAnimation() {
        if (this.frameCount % 8 === 0) {
            this.frameCount = 1;
            this.playAnimation(ImageHub.boss.alert);
        } else {
            this.frameCount++;
        }
    }

    setBossX() {
        if (this.world && this.bossSpawned === false) {
            this.x = this.world.level.levelEndX;
            this.bossSpawned = true;
            this.rX = this.x + this.offset.left;
        }
    }

    // offset der Hitbox
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }
}
