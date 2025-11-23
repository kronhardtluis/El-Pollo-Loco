import { MovableObject } from "./moveable-object.class.js";

export class Chicken extends MovableObject{
    x = 200 + Math.random() * 500;
    y = 345;
    height = 80;
    width = 80;
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}