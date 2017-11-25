import {RewardsModel} from "./RewardsModel";
import {get} from "../utils/locator/locator";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {SymbolEvents} from "../symbols/events/SymbolEvents";
import {IWinSymbolData} from "./interfaces/IWinSymbolData";
import {SlotModel} from "../../SlotModel";
import {RewardVO} from "./RewardVO";

export class RewardsManager {

    private rewardsModel: RewardsModel = get(RewardsModel);
    private slotModel: SlotModel = get(SlotModel);
    private mainResolve;

    private onBlinkComplete() {
        EventDispatcher.removeListener(SymbolEvents.BLINK_COMPLETE, this.onBlinkComplete, this);

        this.mainResolve();
    }

    public showWinnings(): Promise<any> {
        return new Promise((resolve) => {
            this.mainResolve = resolve;

            EventDispatcher.addListener(SymbolEvents.BLINK_COMPLETE, this.onBlinkComplete, this);

            this.rewardsModel.rewards.forEach((rewardVO: RewardVO) => {
                const winLine: number[] = this.slotModel.lines[rewardVO.lineId];

                winLine.forEach((rowIndex, columnIndex) => {

                    //TODO: if same symbol on different lines
                    EventDispatcher.dispatch(SymbolEvents.BLINK, <IWinSymbolData>{
                        columnIndex: columnIndex,
                        rowIndex: rowIndex
                    });
                });
            });
        });

    }
}