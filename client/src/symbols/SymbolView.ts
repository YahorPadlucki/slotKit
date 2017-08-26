import Container = PIXI.Container;

export class SymbolView extends Container {


    private symbolWidth: number = 100;
    private symbolHeight: number = 100;

    constructor() {
        super();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFF3300);

        graphics.drawRect(0, 0, this.symbolWidth, this.symbolHeight);
        graphics.endFill();
        graphics.pivot.set(this.symbolWidth / 2, this.symbolHeight / 2);

        this.addChild(graphics);

    }
}