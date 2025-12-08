// Superclass von: MoveableObject, Statusbar und Collectables
export class DrawableObject {
    //#region Attributes
    img;
    imageCache = {};
    currentImage = 0;
    x;
    y;
    height = 150;
    width = 100;
    //#endregion

    // fügt ein Bild dem Speicher hinzu
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // fügt jedes einzelne Bild aus dem Array dem Speicher hinzu
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    // Bild wird in canvas eingefügt (MALEN/ZEICHNEN)
    draw(ctx) {
        try{
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);           // am Ende nur diese Zeile stehen lassen
    } catch(e) {
        console.warn("Error loading image ", e);
        console.log("Could not load Image, ", this.img.src);
    }
}

    // Rahmen werden eingefügt
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "cyan";
        ctx.rect(this.rX, this.rY, this.rW, this.rH);                           // drawFrame am Ende löschen
        ctx.stroke();
    }
}