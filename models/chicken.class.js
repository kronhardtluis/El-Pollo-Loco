//#region Attributes
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class Chicken extends MovableObject {
    //#region Attributes
    x = 500;
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
    speed = 10 + Math.random() * 15;
    jumpStrength = this.getJStr();
    frameCount = 0;
    xSet = false;
    //#endregion

    constructor() {
        super();
        this.loadImage(ImageHub.chicken.walk[0]);
        this.loadImages(ImageHub.chicken.walk);
        IntervalHub.startInterval(this.applyGravity, 43);               //Fallgeschwindigkeit
        IntervalHub.startInterval(this.animate, this.speed);            //Geschwindigkeit und Animation verschnellern sich gleichzeitig
    }

    // wird zufällig schnell ausgeführt
    animate = () => {
        this.moveLeft(1);
        if (!this.xSet) this.setX();
        if (this.x < -750) {
            this.x = this.world.level.levelEndX + 750;
            this.rX = this.world.level.levelEndX + 750;
        };
        this.determineAnimation();
        if(this.y == 350 && this.jumpStrength != 0) {
            this.jump(this.jumpStrength);
        }
        this.getRealFrame();
    }

    setX() {
        let calcX = 500 + Math.random() * this.world.level.levelEndX;
        this.x = calcX;
        this.rX = calcX;
        this.xSet = true;
    }

    determineAnimation() {
        if (this.frameCount % 6 === 0) {
            this.frameCount = 1;
            this.playAnimation(ImageHub.chicken.walk);
        } else {
            this.frameCount++;
        }
    }

    // offset der Hitbox
    getRealFrame(){
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    getJStr() {
        let jumping = Math.random();
        if (jumping < 0.3) {
            return 0;
        } else {
            return jumping * 30;
        }
    }
}
