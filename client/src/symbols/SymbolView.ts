import Container = PIXI.Container;
import Sprite = PIXI.Sprite;

export class SymbolView extends Container {


    public width: number = 300;
    public height: number = 300;

    constructor() {
        super();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x00FF00);
        graphics.drawRect(-this.width / 2, -this.height / 2, this.width, this.height);
        graphics.endFill();

        this.addChild(graphics);
    }
}