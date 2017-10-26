import {ReelView} from "../ReelView";
import {ReelModel, ReelState} from "../model/ReelModel";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../../../SlotEvent";

export class ReelController {
    private reelView: ReelView;
    public model: ReelModel;

    private autoStopTime: number = 2000;
    private autoStopTimer: any;

    constructor(reelView: ReelView, model: ReelModel) {
        this.reelView = reelView;
        this.model = model;

        this.model.currentState = ReelState.Idle;

        EventDispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);
        EventDispatcher.addListener(SlotEvent.STOP_CLICK, this.onStopClicked, this);

        EventDispatcher.addListener(SlotEvent.SERVER_RESPONSE_RECEIVED, this.onServerResponse, this);
    }

    private onSpinClicked(): void {

        clearTimeout(this.autoStopTimer);

        switch (this.model.currentState) {
            case ReelState.Idle:
                this.model.currentState = ReelState.StartSpin;
                break;

        }
    }

    private onServerResponse(): void {
        this.autoStopTimer = setTimeout(() => this.stopReel(), this.autoStopTime + (this.model.reelIndex * 200));
    }

    private onStopClicked(): void {
        this.stopReel(true)
    }

    private stopReel(isManual: boolean = false) {
        clearTimeout(this.autoStopTimer);
        if (isManual) {
            this.model.currentState = ReelState.ManualStop;
        } else {
            this.model.currentState = ReelState.StartStop;
        }
    }
}