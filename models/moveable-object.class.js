import { DrawableObject } from "./drawable-object.class.js";

export class MovableObject extends DrawableObject {
    //#region Attributes
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    damage = 2;
    lastHit = 0;
    animationStarted = false;
    onceIndex;
    onceIndexInterval = [];
    //#endregion

    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.y + this.height > 430) {
                this.y = 430 - this.height;
            }
        }
    };

    isAboveGround() {
        return this.y + this.height < 430;
    }

    // collisiondetecting
    isColliding(mo) {
        return (
            this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
        );
    }

    //#region Character-Schaden
    hit() {
        this.energy -= this.damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // timer für Schadensanimation
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }
    //#endregion

    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images, iStart, iEnd) {
        if(!this.animationStarted) {
            this.onceIndex = iStart;
            const intervalRef = this.onceIndexInterval;
            const newInterval = setInterval(this.getIndex(iEnd), 300);
            intervalRef.push(newInterval); //Intervall läuft nur einmal durch
            this.animationStarted = true;
        }
        const path = images[this.onceIndex];
        this.img = this.imageCache[path];
    }

    getIndex(iEnd) {
        console.log("Intervall läuft");
        if(this.onceIndex < iEnd) {
            this.onceIndex++;
        } else {
            this.animationStarted = false;
            clearInterval(this.onceIndexInterval);
            this.onceIndexInterval = [];
        };
    }

    moveRight(speed) {
        this.x += speed;
    }

    moveLeft(speed) {
        this.x -= speed;
    }

    jump() {
        this.speedY = 30;
    }
}
