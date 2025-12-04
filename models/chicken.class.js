//#region Attributes
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class Chicken extends MovableObject {
    //#region Attributes
    x = 500 + Math.random() * 700;
    y = 345;
    height = 80;
    width = 80;
    rX;
    rY;
    rW;
    rH;
    offset = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 5,
    };
    speed = 50 + Math.random() * 50;
    //#endregion

    constructor() {
        super();
        this.getRealFrame();
        this.loadImage(ImageHub.chicken.walk[0]);
        this.loadImages(ImageHub.chicken.walk);
        IntervalHub.startInterval(this.animate, this.speed); //geschwindigkeit und animation verschnellern sich gleichzeitig
    }

    // wird zufällig schnell ausgeführt
    animate = () => {
        this.moveLeft(3);
        this.playAnimation(ImageHub.chicken.walk);
    };

    getRealFrame(){
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }
}
