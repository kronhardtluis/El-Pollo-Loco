//#region Imports
import { DrawableObject } from "./drawable-object.class.js";
//#endregion

export class Statusbar extends DrawableObject {
    percentage;
    width = 200;
    height = 50;

    constructor({_images, _percentage, _x, _barYLevel}={}) {
        super();
        this.x = _x;
        this.y = (this.height - 10) * _barYLevel - 10;
        this.setPercentage(_images, _percentage);
    }

    // setzt das entsprechende Bild ein
    setPercentage(images, percentage) {
        this.percentage = percentage;
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
        }else if(this.percentage > 5) {
            return 1;
        }else {
            return 0;
        }
    }
}