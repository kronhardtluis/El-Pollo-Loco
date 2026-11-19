//#region Imports
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class Cloud extends MovableObject {
    y = 0;
    width = 500;
    height = 300;

    constructor(levelEndX) {
        super();
        this.setX(levelEndX);
        this.loadImage("img/5_background/layers/4_clouds/full.png");
        IntervalHub.startInterval(this.animate, 1000 / 60);
    }

    animate = () => {
        this.moveLeft(Math.random() * 0.05);
    };

    setX(levelEndX) {
        this.x = Math.random() * levelEndX;
    }
}
