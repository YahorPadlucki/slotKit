import {ReelView} from "../ReelView";
import {ReelModel, ReelState} from "../model/ReelModel";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../../SlotEvent";

export class ReelController {
    private reelView: ReelView;
    private model: ReelModel;

    constructor(reelView: ReelView, model: ReelModel) {
        this.reelView = reelView;
        this.model = model;

        this.model.currentState = ReelState.Idle;

        EventDispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);
    }

    protected onSpinClicked(): void {

        switch (this.model.currentState) {
            case ReelState.Idle:
                this.model.currentState = ReelState.StartSpin;
                break;
            case ReelState.Spin:
                this.model.currentState = ReelState.Idle;
                break;
        }
    }
}