import {SpinButton} from "./SpinButton";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../SlotEvent";

export class SpinButtonController {

    constructor(private spinButton: SpinButton) {
        spinButton.interactive = true;
        spinButton.buttonMode = true;
        spinButton.on('pointerdown', this.onSpinClick);
    }

    private onSpinClick(): void {
        EventDispatcher.dispatch(SlotEvent.SPIN_CLICK);
    }
}