import { ImageHub } from "../js/imagehub.js";
import { Collectables } from "./collectables.class.js";

export class Coins extends Collectables {
    // #region Attributes
    y = 180;
    width = 100;
    height = 100;
    static counter = 0;
    // #endregion

    constructor(levelX) {
        super();
        this.loadImage(ImageHub.collectables.coin);
        this.setCoordinates(levelX);
        this.setOffset();
    }

    setCoordinates(levelX) {
        if(Coins.counter >= 3) Coins.counter = 0;
        this.x = levelX + Coins.counter * 80;
        if(Coins.counter == 1) this.y -= 20;
        Coins.counter++;
    }

    setOffset() {
        this.rW = this.width - 60;
        this.rH = this.height - 60;
        this.rX = this.x + 30;
        this.rY = this.y + 30;
    }
}
