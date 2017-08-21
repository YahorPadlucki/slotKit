import Point = PIXI.Point;
export class MainScene extends PIXI.Container {

    private minWidth: number = 800;
    private minHeight: number = 600;

    private reelsPlaceholder: PIXI.Graphics;

    constructor() {
        super();
        console.log("Main scene inited");
        this.reelsPlaceholder = this.drawTempPlaceHolder();

        this.addChild(this.reelsPlaceholder);

    }

    private drawTempPlaceHolder() {

        const graphics =  new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.drawRect(-this.minWidth / 2, -this.minHeight / 2, this.minWidth, this.minHeight);
        graphics.endFill();

        return graphics;

    }

    resize(width: number, height: number) {
        const scale = Math.min(Math.min(width, this.minWidth) / this.minWidth, Math.min(height, this.minHeight) / this.minHeight);
        this.scale.set(scale);
    }
}