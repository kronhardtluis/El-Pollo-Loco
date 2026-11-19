import { DrawableObject } from "./drawable-object.class.js";

export class hudNumbers extends DrawableObject {
    //#region Attributes
    value;
    x = 205;
    height = 24;
    color;
    //#endregion

    constructor({ _barYLevel, _color } = {}) {
        super();
        this.y = 40 * _barYLevel + 32;
        this.color = _color;
    }

    draw(ctx) {
        if (this.value == undefined) return;
        ctx.save();
        ctx.font = "bold " + this.height + "px sans-serif";
        ctx.fillStyle = this.color;
        ctx.fillText(this.value, this.x, this.y);
        ctx.restore();
    }
}
