import { ImageHub } from "../js/imagehub.js";
import { MovableObject } from "./moveable-object.class.js";

export class Chicken extends MovableObject {
    x = 700 + Math.random() * 500;
    y = 345;
    height = 80;
    width = 80;

    constructor() {
        super().loadImage(
            "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
        this.loadImages(ImageHub.chicken.walk);
        this.animate();
    }

    animate() {
        this.moveLeft(0.3 + Math.random());
        setInterval(() => {
            const i = this.currentImage % ImageHub.chicken.walk.length;
            const path = ImageHub.chicken.walk[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }
}
