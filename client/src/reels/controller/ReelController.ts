import {ReelView} from "../ReelView";
import {ReelModel, ReelState} from "../model/ReelModel";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../../SlotEvent";

export class ReelController {
    private reelView: ReelView;
    private model: ReelModel;

    private autoStopTime: number = 2000;
    private autoStopTimer: any;

    constructor(reelView: ReelView, model: ReelModel) {
        this.reelView = reelView;
        this.model = model;

        this.model.currentState = ReelState.Idle;

        EventDispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);
    }

    protected onSpinClicked(): void {

        clearTimeout(this.autoStopTimer);

        switch (this.model.currentState) {
            case ReelState.Idle:
                this.autoStopTimer = setTimeout(() => this.stopReel(), this.autoStopTime + (this.model.reelIndex * 200));
                this.model.currentState = ReelState.StartSpin;
                break;
            case ReelState.Spin:
                this.stopReel();
                break;
        }
    }

    private stopReel() {
        clearTimeout(this.autoStopTimer);
        if (this.model.currentState == ReelState.Spin) {
            this.model.currentState = ReelState.StartStop;
        }
    }
}