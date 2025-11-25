import { MovableObject } from "./moveable-object.class.js";

export class Backgroundobject extends MovableObject {
    width = 720;
    height = 480;
    x = 0;
    y = 480 - this.height;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}