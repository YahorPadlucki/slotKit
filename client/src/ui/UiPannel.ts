import Container = PIXI.Container;
import {SpinButton} from "./SpinButton";

export class UiPannel extends Container {

    private spinButton: SpinButton;


    constructor() {
        super();
        this.spinButton = new SpinButton();
        this.addChild(this.spinButton);

    }

    onResize(): void {
        // this.spinButton.x = this.minWidth / 2 - this.spinButton.width / 2;
        // this.spinButton.y = this.minHeight / 2 - this.spinButton.height / 2;
    }
}