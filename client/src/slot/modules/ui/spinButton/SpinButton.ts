import {Button} from "../generic/Button";
import Graphics = PIXI.Graphics;

export class SpinButton extends Button {

    private activeGraphics: Graphics;
    private disableGraphics: Graphics;

    constructor() {
        super();
        this.activeGraphics = this.prepareState(0x15ee86);
        this.addChild(this.activeGraphics);

        this.disableGraphics = this.prepareState(0xaab6b1);
        this.addChild(this.disableGraphics);

        this.disableGraphics.visible = false;
    }

    public disable(): void {
        super.disable();
        this.activeGraphics.visible = false;
        this.disableGraphics.visible = true;
    }

    public enable(): void {
        super.enable();
        this.activeGraphics.visible = true;
        this.disableGraphics.visible = false;
    }

    private prepareState(color: number): Graphics {
        const state = new PIXI.Graphics();
        state.beginFill(color);

        state.drawCircle(0, 0, 45);
        state.endFill();

        return state;
    }

}