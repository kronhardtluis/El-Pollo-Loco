import { IntervalHub } from "../js/intervalhub.js";

export class MovableObject {
    x;
    y;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight(){
        console.log('moving right');
    }

    moveLeft(speed){
        IntervalHub.startInterval()
            setInterval(() => {
            this.x -= speed;
            },100/6);
    }
}