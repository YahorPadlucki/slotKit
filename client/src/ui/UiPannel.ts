import Container = PIXI.Container;
import {SpinButton} from "./SpinButton";
import {SpinButtonController} from "./SpinButtonController";
import Graphics = PIXI.Graphics;

export class UiPanel extends Container {

    private spinButton: SpinButton;
    private spinButtonController: SpinButtonController;
    private panelHeight: number = 100;
    private panelWidth: number = 800;


    constructor() {
        super();
        this.spinButton = new SpinButton();
        this.spinButtonController = new SpinButtonController(this.spinButton);
        this.spinButton.y = this.panelHeight / 2;
        this.spinButton.x = this.panelWidth -this.spinButton.width;

        const back = new Graphics();
        back.beginFill(0x706F6D, 0.5);
        back.drawRect(0, 0, this.panelWidth, this.panelHeight);
        back.endFill();

        this.addChild(back);

        this.addChild(this.spinButton);

    }

    onResize(): void {
        // this.spinButton.x = this.minWidth / 2 - this.spinButton.width / 2;
        // this.spinButton.y = this.minHeight / 2 - this.spinButton.height / 2;
    }
}