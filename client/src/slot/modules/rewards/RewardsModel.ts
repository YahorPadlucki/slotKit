import {RewardVO} from "./RewardVO";
import {ISpinResponse} from "../server/interfaces/ISpinResponse";

export class RewardsModel {
    protected rewards: RewardVO[];

    parse(response: ISpinResponse) {
        if (response.rewards) {
            this.rewards = [];
            response.rewards.forEach((reward) => {
                let rewardVO = new RewardVO();
                rewardVO.symbolsCount = reward.symbolsCount;
                rewardVO.lineId = reward.lineId;
                rewardVO.linePayout = reward.linePayout;

                this.rewards.push(rewardVO);
            })
        }
    }
}