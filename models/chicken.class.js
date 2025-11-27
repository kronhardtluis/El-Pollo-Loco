import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";

export class Chicken extends MovableObject {
    x = 500 + Math.random() * 700;
    y = 345;
    height = 80;
    width = 80;
    speed = 50 + Math.random() * 50;

    constructor() {
        super().loadImage(ImageHub.chicken.walk[0]);
        this.loadImages(ImageHub.chicken.walk);
        IntervalHub.startInterval(this.animate, this.speed);     //geschwindigkeit und animation verschnellern sich gleichzeitig
    }

    animate = () => {
        this.moveLeft(3);
        this.playAnimation(ImageHub.chicken.walk);
    };
}