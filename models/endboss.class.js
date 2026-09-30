//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class Endboss extends MovableObject {
    //#region Attributes
    width = 400;
    height = 450;
    world;
    x = 0;
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
        // this.setBossX();
        this.playAnimation(ImageHub.boss.alert);                    // muss noch alles gemacht werden
    };

    // setBossX() {
        // this.x = this.world.levelEndX;               //funktioniert so nicht
    // }

    // offset der Hitbox
    getRealFrame(){
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }
}
