//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { DrawableObject } from "./drawable-object.class.js";
//#endregion

export class Statusbar extends DrawableObject {
    static count = 0;
    percentage;

    constructor({images, _percentage}={}) {
        super();
        this.x = 0;
        this.width = 200;
        this.height = 50;
        this.y = (this.height - 10) * Statusbar.count - 10;
        this.setPercentage(images, _percentage);
        Statusbar.count++;
    }

    // setzt das entsprechende Bild ein
    setPercentage(images, _percentage) {
        this.percentage = _percentage;
        this.loadImage(images[this.resolveImageIndex()]);
    }

    // ändert das Bild anhand des Prozentsatzes
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