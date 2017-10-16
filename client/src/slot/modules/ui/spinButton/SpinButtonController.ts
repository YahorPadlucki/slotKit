import {SpinButton} from "./SpinButton";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../../../SlotEvent";
import {StopButton} from "./StopButton";

export class SpinButtonController {


    constructor(private spinButton: SpinButton, private stopButton: StopButton) {
        this.spinButton.on('pointerdown', this.onSpinClick, this);
        this.stopButton.on('pointerdown', this.onStopClick, this);

        EventDispatcher.addListener(SlotEvent.ENABLE_SPIN_BUTTON, this.enableSpin, this); //TODO slot state changed

        EventDispatcher.addListener(SlotEvent.SERVER_RESPONSE_RECEIVED, this.onServerResponse,this);


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
        this.stopButton.enable();
        this.stopButton.visible = true;

    }

    private disableStop(): void {
        this.stopButton.disable();
        this.stopButton.visible = false;
    }

    private onSpinClick(): void {
        this.disableSpin();
        EventDispatcher.dispatch(SlotEvent.SPIN_CLICK);
    }

    onServerResponse(): any {
    }

    private onStopClick(): void {
        EventDispatcher.dispatch(SlotEvent.STOP_CLICK);
    }
}