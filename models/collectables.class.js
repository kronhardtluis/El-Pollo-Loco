import { DrawableObject } from "./drawable-object.class";

export class Collectables extends DrawableObject {
    // #region Attributes
    static worldItems = [];
    worldItemCount = 10;
    collected;
    // #endregion
}
