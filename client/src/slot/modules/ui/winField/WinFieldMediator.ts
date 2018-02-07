import {WinFieldView} from "./WinFieldView";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {get} from "../../utils/locator/locator";
import {RewardsEvents} from "../../rewards/RewardsEvents";

export class WinFieldMediator {

    private dispatcher: EventDispatcher = get(EventDispatcher);

    constructor(private view: WinFieldView) {
        this.dispatcher.addListener(RewardsEvents.SHOW_TOTAL_WIN, this.showTotalWin,this);

    }

    showTotalWin(totalWin: number): void {
        this.view.showTotalWin(totalWin);
    }

}