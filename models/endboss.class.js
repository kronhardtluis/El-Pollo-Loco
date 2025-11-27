import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";

export class Endboss extends MovableObject{   
        width = 400;
        height = 450;
        x = 700;
        y = 5;

    constructor(){
        super().loadImage(ImageHub.boss.alert[0]);
        this.loadImages(ImageHub.boss.alert);
        IntervalHub.startInterval(this.animate, 100);
    }

    animate = () => {
        this.playAnimation(ImageHub.boss.alert);
    }
}