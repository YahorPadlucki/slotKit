import Container = PIXI.Container;

export class SymbolView extends Container {


    public symbolWidth: number = 100;
    public symbolHeight: number = 100;

    constructor() {
        super();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFF3300);

        graphics.drawRect(0, 0, this.symbolWidth, this.symbolHeight);
        graphics.endFill();
        this.addChild(graphics);

    }
}