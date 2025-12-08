import { DrawableObject } from "./drawable-object.class";

// Superclass von: Bottle und Coins
export class Collectables extends DrawableObject {
    // #region Attributes
    static worldItems = [];
    worldItemCount = 10;
    collected;
    // #endregion
}
