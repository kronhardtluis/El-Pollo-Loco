import { MovableObject } from "./moveable-object.class.js";

export class Backgroundobject extends MovableObject {
    //#region Attributes
    width = 720;
    height = 480;
    x = 0;
    y = 0;
    //#endregion

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}