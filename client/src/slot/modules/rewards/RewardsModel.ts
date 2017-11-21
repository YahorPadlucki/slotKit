import {IServerRewardsResponse} from "../server/interfaces/ServerResponseInterfaces";
import {RewardVO} from "./RewardVO";

export class RewardsModel {
    protected rewards: RewardVO[];

    parse(rewards: IServerRewardsResponse) {

        //TODO: parse rewards to rewardsVO

    }
}