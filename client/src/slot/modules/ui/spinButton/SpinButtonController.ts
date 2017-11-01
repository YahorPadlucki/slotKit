import {SpinButton} from "./SpinButton";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../../../SlotEvent";
import {StopButton} from "./StopButton";
import {SlotModel, SlotState} from "../../../SlotModel";
import {get} from "../../utils/locator/locator";

export class SpinButtonController {


    private slotModel: SlotModel = get(SlotModel);

    constructor(private spinButton: SpinButton, private stopButton: StopButton) {
        this.spinButton.on('pointerdown', this.onSpinClick, this);
        this.stopButton.on('pointerdown', this.onStopClick, this);

        EventDispatcher.addListener(SlotEvent.SLOT_STATE_CHANGED, this.onSlotStateChanged, this);
        EventDispatcher.addListener(SlotEvent.SERVER_RESPONSE_RECEIVED, this.onServerResponse, this);

        this.disableStop();
        this.enableSpin();
    }

    private enableSpin(): void {
        this.spinButton.enable();
    }

    private disableSpin(): void {
        this.spinButton.disable();
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
        this.enableStop();
    }

    onSlotStateChanged(): any {
        if (this.slotModel.state === SlotState.Idle) {
            this.disableStop();
            this.enableSpin();
        }
    }

    private onStopClick(): void {
        this.disableStop();
        EventDispatcher.dispatch(SlotEvent.STOP_CLICK);
    }
}