import Container = PIXI.Container;

export class SpinButton extends Container {

    constructor() {
        super();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xff00);

        graphics.drawCircle(0, 0, 50);
        graphics.endFill();
        this.addChild(graphics);
    }
}