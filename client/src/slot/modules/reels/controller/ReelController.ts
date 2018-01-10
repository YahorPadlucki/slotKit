import {ReelView} from "../view/ReelView";
import {ReelModel, ReelState} from "../model/ReelModel";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../../../SlotEvent";
import {SlotModel} from "../../../SlotModel";
import {get} from "../../utils/locator/locator";

export class ReelController {
    public reelView: ReelView;
    public model: ReelModel;

    private autoStopTime: number = 2000;
    private autoStopTimer: any;

    private slotModel: SlotModel = get(SlotModel);

    private dispatcher:EventDispatcher = get(EventDispatcher);



    constructor(reelView: ReelView, model: ReelModel) {
        this.reelView = reelView;
        this.model = model;

        this.model.currentState = ReelState.Idle;

        this.dispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);
        this.dispatcher.addListener(SlotEvent.STOP_CLICK, this.onStopClicked, this);

        this.dispatcher.addListener(SlotEvent.SERVER_SPIN_RESPONSE_RECEIVED, this.onServerResponse, this);
        this.dispatcher.addListener(SlotEvent.NEW_REELS_TAPES_RECEIVED, () => this.model.updateTape(this.slotModel.tapes[this.model.reelIndex]), this);
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
        if (this.model.currentState == ReelState.Idle) return;

        clearTimeout(this.autoStopTimer);
        if (isManual) {
            this.model.currentState = ReelState.ManualStop;
        } else {
            this.model.currentState = ReelState.StartStop;
        }
    }
}