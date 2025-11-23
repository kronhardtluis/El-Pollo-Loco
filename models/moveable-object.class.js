export class MovableObject {
    img;
    width;
    height;
    x;
    y;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){
        console.log('moving right');
    }

    moveLeft(){}
}