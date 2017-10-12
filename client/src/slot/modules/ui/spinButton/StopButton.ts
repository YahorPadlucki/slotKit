import {Button} from "../generic/Button";

export class StopButton extends Button {

    constructor() {
        super();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x432700);

        graphics.drawCircle(0, 0, 45);
        graphics.endFill();
        this.addChild(graphics);
    }
}