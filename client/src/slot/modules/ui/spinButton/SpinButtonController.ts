import {SpinButton} from "./SpinButton";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../../../SlotEvent";
import {StopButton} from "./StopButton";

export class SpinButtonController {

    constructor(private spinButton: SpinButton, private stopButton: StopButton) {
        this.spinButton.on('pointerdown', this.onSpinClick, this);
        this.stopButton.on('pointerdown', this.onStopClick, this);

        EventDispatcher.addListener(SlotEvent.ENABLE_SPIN_BUTTON, this.enableSpin, this);


        this.enableSpin();
    }

    private enableSpin(): void {
        this.disableStop();

        this.spinButton.enable();
        this.spinButton.visible = true;
    }

    private disableSpin(): void {
        this.spinButton.disable();
        this.spinButton.visible = false;
    }

    private enableStop(): void {
        this.disableSpin();

        this.stopButton.enable();
        this.stopButton.visible = true;

    }

    private disableStop(): void {
        this.stopButton.disable();
        this.stopButton.visible = false;
    }


    private onSpinClick(): void {
        this.enableStop(); //TODO: should be disable all until server response;
        EventDispatcher.dispatch(SlotEvent.SPIN_CLICK);
    }

    private onStopClick(): void {
        EventDispatcher.dispatch(SlotEvent.STOP_CLICK);
    }
}