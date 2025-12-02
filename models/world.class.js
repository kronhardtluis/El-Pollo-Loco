//#region Imports
import { IntervalHub } from "../js/intervalhub.js";
import { LEVEL1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Statusbar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
//#endregion

export class World {
    //#region Attributes
    character = new Character();
    level = LEVEL1;
    canvas;
    ctx;
    camera_x = 0;
    statusbar = new Statusbar();
    throwableObjects = [];
    static cooldown = false;
    //#endregion

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.run, 100);
    }

    setWorld() {
        this.character.world = this;
    }

    // Sammlung der dauerhaften Checks
    run = () => {
        this.checkCollisions();
        this.checkBottle();
    }

    checkCollisions() {
        LEVEL1.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    };

    // werfen der Flasche + Cooldown
    checkBottle() {
        if(Keyboard.SPACE && World.cooldown == false) {
            const bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            World.cooldown = true;
            setTimeout(()=>{World.cooldown = false}, 685);
        }
    }

    // #region Bilder einfügen
    // leeren und wieder einfügen der Bilder ins Canvas
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    // spiegelt das Bild
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    // spiegelt das Bild wieder zurück
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    // #endregion
}
