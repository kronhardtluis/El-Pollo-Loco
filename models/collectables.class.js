import { DrawableObject } from "./drawable-object.class.js";

// Superclass von: Bottle und Coins
export class Collectables extends DrawableObject {
    // #region Attributes
    collected = false;
    rW;
    rH;
    rX;
    rY;
    // #endregion
}
