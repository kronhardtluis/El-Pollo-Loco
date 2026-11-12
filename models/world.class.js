//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { LEVEL1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Statusbar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
//#endregion

// für Splashanimation und Löschen der Flasche ein Ticket

export class World {
    //#region Attributes
    character = new Character();
    level = LEVEL1;
    canvas;
    ctx;
    camera_x = 0;
    healthbar = new Statusbar({
        images: ImageHub.bars.health,
        _percentage: 100,
    });
    coinbar = new Statusbar({ images: ImageHub.bars.coins, _percentage: 0 });
    bottlebar = new Statusbar({ images: ImageHub.bars.bottle, _percentage: 0 });
    throwableObjects = [];
    static cooldown = false;
    imageCache = {};
    currentImage = 0;
    //#endregion

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.run, 1000 / 60);
    }

    setWorld() {
        this.character.world = this; // fügt dem Attribut world der instanzierten Klasse Character die Instanz von der erstellten Welt hinzu
        this.level.enemies.forEach((enemy) => (enemy.world = this));
    }

    // Sammlung der dauerhaften Checks
    run = () => {
        this.checkCharacterCollisions();
        this.checkBottle();
        if (this.throwableObjects.length > 0) {
            this.checkBottleCollision();
        }
    };

    //#region Collisions
    // überprüft Charactercollision mit Gegnern
    checkCharacterCollisions() {
        LEVEL1.enemies.forEach((enemy) => {
            if (this.jumpOnAliveChicken(enemy)) {
                this.character.speedY =
                    (enemy.speedY +
                        this.character.jumpStrength -
                        this.character.speedY) /
                    2;
                enemy.die();
            } else if (this.hitByAliveChicken(enemy)) {
                this.character.hit();
                this.healthbar.setPercentage(
                    ImageHub.bars.health,
                    this.character.energy,
                );
            }
        });
    }

    jumpOnAliveChicken(enemy) {
        return (
            this.character.jumpOnEnemy(enemy) &&
            this.character.speedY < 0 &&
            enemy instanceof Chicken &&
            !enemy.isDead
        );
    }

    hitByAliveChicken(enemy) {
        return (
            this.character.isColliding(enemy) &&
            !this.character.isHurt() &&
            !enemy.isDead
        );
    }

    checkBottleCollision() {
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            let bottleRef = this.throwableObjects[i];
            let hitEnemy = false;
            LEVEL1.enemies.forEach((enemy) => {
                if (bottleRef.isColliding(enemy) && !enemy.isDead) {
                    hitEnemy = true;
                    if (enemy instanceof Chicken) enemy.die();
                }
            });
            if (bottleRef.isSplashing) {
                bottleRef.splashAnimation(this.throwableObjects, i);
            } else {
                if (bottleRef.y >= 380 || hitEnemy) {
                    bottleRef.isSplashing = true;
                    bottleRef.currentImage = 0;
                    bottleRef.frameCount = 0;
                }
            }
        }
    }
    //#endregion

    // Werfen der Flasche + Cooldown
    checkBottle() {
        if (Keyboard.SPACE && World.cooldown == false) {
            const bottle = new ThrowableObject(
                this.character.x,
                this.character.y,
                this.character.otherDirection,
                this.character.throwStrength,
            );
            this.throwableObjects.push(bottle);
            World.cooldown = true;
            setTimeout(() => {
                World.cooldown = false;
            }, 1000 / 3);
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
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
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
        mo.drawFrame(this.ctx); // löschen
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
        mo.rX = mo.rX * -1; // am Ende löschen
    }

    // spiegelt das Bild wieder zurück
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        mo.rX = mo.rX * -1; // am Ende löschen
        this.ctx.restore();
    }
    // #endregion
}
