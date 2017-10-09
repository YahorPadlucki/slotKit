import {Button} from "../Button";

export class SpinButton extends Button {

    constructor() {
        super();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xB3650C);

        graphics.drawCircle(0, 0, 45);
        graphics.endFill();
        this.addChild(graphics);
    }
}