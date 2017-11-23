import {RewardsModel} from "./RewardsModel";
import {get} from "../utils/locator/locator";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {SymbolEvents} from "../symbols/events/SymbolEvents";

export class RewardsManager {

    private rewardsModel: RewardsModel = get(RewardsModel);

    public showWinnings(): Promise<any> {
        return new Promise((resolve) => {
            //TODO: show symbols on winning line
            EventDispatcher.dispatch(SymbolEvents.BLINK);
            setTimeout(() => resolve(), 2000);
        });

    }
}