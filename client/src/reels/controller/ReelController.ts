import {ReelView} from "../ReelView";
import {ReelModel, ReelState} from "../model/ReelModel";

export class ReelController {
    private reelView: ReelView;
    private model: ReelModel;

    constructor(reelView: ReelView, model: ReelModel) {
        this.reelView = reelView;
        this.model = model;

        this.model.currentState = ReelState.Idle;
    }
}