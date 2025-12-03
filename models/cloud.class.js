//#region Imports
import { IntervalHub } from "../js/intervalhub.js";
import { MovableObject } from "./moveable-object.class.js";
//#endregion

export class Cloud extends MovableObject {
    y = 0;
    x = Math.random() * 2400;
    width = 500;
    height = 300;

    constructor(){
        super();
        this.loadImage('img/5_background/layers/4_clouds/full.png');
        IntervalHub.startInterval(this.animate, 1000/60);
    }
    
    // wird 60x/sec ausgeführt
    animate = () => {
        this.moveLeft(Math.random() * 0.05);
        };
}