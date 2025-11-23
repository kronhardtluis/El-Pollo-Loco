import { MovableObject } from "./moveable-object.class.js";

export class Character extends MovableObject {
    width = 100;
    height = 250;
    x = 120;
    y = 180;

    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    }

    moveRight() {}

    jump() {}
}
