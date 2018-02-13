import {ReelView} from "../view/ReelView";
import {
    ReelModel,
    ReelState
} from "../model/ReelModel";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {SlotEvent} from "../../../SlotEvent";
import {SlotModel} from "../../../SlotModel";
import {get} from "../../utils/locator/locator";

export class ReelController {
    public reelView: ReelView;
    public model: ReelModel;

    private autoStopTime: number = 500;
    private autoStopTimer: any;

    private slotModel: SlotModel = get(SlotModel);

    private dispatcher: EventDispatcher = get(EventDispatcher);


    constructor(reelView: ReelView, model: ReelModel) {
        this.reelView = reelView;
        this.model = model;

        this.model.currentState = ReelState.Idle;

        this.dispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);
        this.dispatcher.addListener(SlotEvent.STOP_CLICK, this.onStopClicked, this);

        this.dispatcher.addListener(SlotEvent.NEW_REELS_TAPES_RECEIVED, () => this.model.updateTape(this.slotModel.tapes[this.model.reelIndex]), this);
    }

    private onSpinClicked(): void {

        clearTimeout(this.autoStopTimer);

        switch (this.model.currentState) {
            case ReelState.Idle:
                this.model.currentState = ReelState.StartSpin;
                this.dispatcher.dispatch(SlotEvent.REELS_SPIN_STARTED);
                break;
        }
    }

    public stopOnServerResponse(): void {
        if (!this.isReelActive) return;

        const stopTime = this.autoStopTime + (this.model.reelIndex * 500);
        this.autoStopTimer = setTimeout(() => this.stopReel(), stopTime);
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

    private get isReelActive(): boolean {
        return (this.model.currentState == ReelState.StartSpin || this.model.currentState == ReelState.Spin || this.model.currentState == ReelState.Stopping)
    }

}