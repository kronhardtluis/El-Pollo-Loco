//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { DrawableObject } from "./drawable-object.class.js";
//#endregion

export class Statusbar extends DrawableObject {
    percentage = 100;
    static count = 0;

    constructor() {
        super();
        this.loadImages(ImageHub.bars.health);
        this.x = 0;
        this.y = (-10 + this.height) * Statusbar.count;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
        Statusbar.count++;
    }

    setPercentage(_percentage) {
        this.percentage = _percentage;
        const path = ImageHub.bars.health[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    // ändert das Bild anhand der Lebensanzahl
    resolveImageIndex(){
        if(this.percentage == 100) {
            return 5;
        }else if(this.percentage >= 80) {
            return 4;
        }else if(this.percentage >= 60) {
            return 3;
        }else if(this.percentage >= 40) {
            return 2;
        }else if(this.percentage >=20) {
            return 1;
        }else {
            return 0;
        }
    }
}