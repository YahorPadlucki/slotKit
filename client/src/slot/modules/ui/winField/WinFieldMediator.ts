import {WinFieldView} from "./WinFieldView";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {get} from "../../utils/locator/locator";
import {RewardsEvents} from "../../rewards/RewardsEvents";
import {SlotEvent} from "../../../SlotEvent";

export class WinFieldMediator {

    private dispatcher: EventDispatcher = get(EventDispatcher);

    protected visibleValue: number;


    constructor(private view: WinFieldView) {
        this.view.showIdleLabel();
        this.dispatcher.addListener(RewardsEvents.SHOW_TOTAL_WIN, this.showTotalWin, this);
        this.dispatcher.addListener(SlotEvent.REELS_SPIN_STARTED, () => this.view.showIdleLabel(), this);

    }

    showTotalWin(totalWin: number): void {
        // this.view.showTotalWin(totalWin);
        this.visibleValue = 0;
        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            1,
            {
                visibleValue: totalWin,
                onUpdate: () => {
                    this.view.showTotalWin(this.visibleValue);
                },
                onComplete: () => {
                }
            }
        );
    }

}