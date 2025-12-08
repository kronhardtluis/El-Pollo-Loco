//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class Endboss extends MovableObject {
    //#region Attributes
    width = 400;
    height = 450;
    x = Level.levelEndX;
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
    //#endregion

    constructor() {
        super();
        this.getRealFrame();
        this.loadImage(ImageHub.boss.alert[0]);
        this.loadImages(ImageHub.boss.alert);
        IntervalHub.startInterval(this.animate, 100);
    }

    animate = () => {
        this.playAnimation(ImageHub.boss.alert);                    // muss noch alles gemacht werden
    };

    // offset der Hitbox
    getRealFrame(){
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }
}
