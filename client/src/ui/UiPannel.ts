import Container = PIXI.Container;
import {SpinButton} from "./SpinButton";
import {SpinButtonController} from "./SpinButtonController";

export class UiPannel extends Container {

    private spinButton: SpinButton;
    private spinButtonController: SpinButtonController;


    constructor() {
        super();
        this.spinButton = new SpinButton();
        this.spinButtonController = new SpinButtonController(this.spinButton);

        this.addChild(this.spinButton);

    }

    onResize(): void {
        // this.spinButton.x = this.minWidth / 2 - this.spinButton.width / 2;
        // this.spinButton.y = this.minHeight / 2 - this.spinButton.height / 2;
    }
}