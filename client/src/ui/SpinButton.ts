import Container = PIXI.Container;

export class SpinButton extends Container {

    constructor() {
        super();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xB3650C);

        graphics.drawCircle(0, 0, 45);
        graphics.endFill();
        this.addChild(graphics);
    }
}