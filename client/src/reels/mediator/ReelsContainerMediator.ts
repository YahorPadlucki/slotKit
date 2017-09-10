import {ReelView} from "../ReelView";
import {ReelModel, ReelState} from "../model/ReelModel";

export class ReelMediator {
    private reelView: ReelView;
    private model: ReelModel;

    constructor(reelView: ReelView, model: ReelModel) {
        this.reelView = reelView;
        this.model = model;

        this.reelView.currentState = ReelState.Idle;

    }
}