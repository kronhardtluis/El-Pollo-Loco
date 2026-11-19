//#region Imports
import { ImageHub } from "../js/imagehub.js";
import { IntervalHub } from "../js/intervalhub.js";
import { LEVEL1 } from "../levels/level1.js";
import { Bottle } from "./bottle.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Coins } from "./coins.class.js";
import { hudNumbers } from "./hud-numbers.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Statusbar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { UPGRADES } from "./upgrades.js";
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
        _images: ImageHub.bars.health,
        _percentage: 100,
        _x: 0,
        _barYLevel: 0,
    });
    coinbar = new Statusbar({
        _images: ImageHub.bars.coins,
        _percentage: 0,
        _x: 0,
        _barYLevel: 1,
    });
    bottlebar = new Statusbar({
        _images: ImageHub.bars.bottle,
        _percentage: 0,
        _x: 0,
        _barYLevel: 2,
    });
    healthNumber = new hudNumbers({
        _barYLevel: 0,
        _color: "#EB4C88",
    });
    coinNumber = new hudNumbers({
        _barYLevel: 1,
        _color: "#FFCC01",
    });
    bottleNumber = new hudNumbers({
        _barYLevel: 2,
        _color: "#BF0000",
    });
    throwableObjects = [];
    cooldown = false;
    imageCache = {};
    currentImage = 0;
    bottleCounter = 0;
    coinCounter = 0;
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
    }

    // Sammlung der dauerhaften Checks
    run = () => {
        this.checkCharacterCollisions();
        this.checkBottle();
        if (this.throwableObjects.length > 0) {
            this.checkBottleCollision();
        }
        this.checkCollectables();
        this.healthNumber.value = this.character.energy / 20;
        this.coinNumber.value = this.coinCounter;
        this.bottleNumber.value = this.bottleCounter;
    };

    //#region Collisions
    // überprüft Charactercollision mit Gegnern
    checkCharacterCollisions() {
        LEVEL1.enemies.forEach((enemy) => {
            if (this.jumpOnAliveChicken(enemy)) {
                this.backbounce(enemy);
                enemy.die();
            } else if (this.hitByAliveChicken(enemy)) {
                this.character.hit(20);
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

    backbounce(enemy) {
        this.character.speedY =
            (enemy.speedY + UPGRADES.jumpStrength - this.character.speedY) / 2;
    }

    hitByAliveChicken(enemy) {
        return (
            this.character.isColliding(enemy) &&
            !this.character.isHurt() &&
            !enemy.isDead
        );
    }

    checkCollectables() {
        LEVEL1.collectables.forEach((collectable, i) => {
            if (this.collectConditions(collectable, i)) {
                if (collectable instanceof Coins) {
                    this.collectCoin(i);
                }
                if (this.bottleCollectConditions(collectable)) {
                    this.bottleCounter++;
                    this.setBottlebar();
                    collectable.setCollectTimer();
                }
                collectable.collected = true;
            }
        });
    }

    collectConditions(collectable, i) {
        return (
            collectable.collected == false &&
            this.character.isColliding(collectable)
        );
    }

    bottleCollectConditions(collectable) {
        return (
            collectable instanceof Bottle &&
            this.bottleCounter < UPGRADES.bottleCapacity
        );
    }

    collectCoin(index) {
        this.coinCounter++;
        let percentage;
        if (this.coinCounter >= UPGRADES.coinCapacity) percentage = 100;
        else percentage = (100 / UPGRADES.coinCapacity) * this.coinCounter;
        this.coinbar.setPercentage(ImageHub.bars.coins, percentage);
        LEVEL1.collectables.splice(index, 1);
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
        if (this.throwingConditions()) {
            const bottle = new ThrowableObject(
                this.character.x,
                this.character.y,
                this.character.otherDirection,
            );
            this.throwableObjects.push(bottle);
            this.bottleCounter--;
            this.cooldown = true;
            this.setBottlebar();
            setTimeout(() => {
                this.cooldown = false;
            }, UPGRADES.throwCooldown);
        }
    }

    throwingConditions() {
        return (
            Keyboard.SPACE && !this.cooldown && this.bottleCounter > 0
        );
    }

    setBottlebar() {
        const percentage = (100 / UPGRADES.bottleCapacity) * this.bottleCounter;
        this.bottlebar.setPercentage(ImageHub.bars.bottle, percentage);
    }

    // #region Bilder einfügen
    // leeren und wieder einfügen der Bilder ins Canvas
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.healthNumber);
        this.addToMap(this.coinNumber);
        this.addToMap(this.bottleNumber);
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
