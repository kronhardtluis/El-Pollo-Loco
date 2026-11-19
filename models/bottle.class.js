import { ImageHub } from "../js/imagehub.js";
import { Collectables } from "./collectables.class.js";
import { UPGRADES } from "./upgrades.js";

export class Bottle extends Collectables {
    // #region Attributes
    width = 50;
    height = 50;
    y = 380;
    type = this.getRandomNumber();
    // #endregion

    constructor(levelX) {
        super();
        this.loadImage(ImageHub.collectables.salsaBottle[this.type]);
        this.x = levelX;
        this.setOffset();
    }

    getRandomNumber() {
        let picNumber = Math.round(Math.random());
        return picNumber;
    }

    setOffset() {
        this.rW = this.width - 10;
        this.rH = this.height - 0;
        this.rY = this.y + 0;
        if (this.type == 0) this.rX = this.x + 10;
        if (this.type == 1) this.rX = this.x + 5;
    }

    setCollectTimer() {
        this.width = 0;
        setTimeout(() => {
            this.collected = false;
            this.width = 50;
        }, UPGRADES.bottleSpawnCooldown);
    }
}
