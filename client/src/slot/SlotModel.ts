import {EventDispatcher} from "./modules/utils/dispatcher/EventDispatcher";
import {SlotEvent} from "./SlotEvent";
import {ISpinResponse} from "./modules/server/interfaces/ISpinResponse";
import {IInitResponse} from "./modules/server/interfaces/IInitResponse";
import {IServerReelsResponse} from "./modules/server/interfaces/ServerResponseInterfaces";
import {RewardsModel} from "./modules/rewards/RewardsModel";
import {get} from "./modules/utils/locator/locator";

export class SlotModel {
    private _currentSlotState;
    private _stopReelsPosition: number[];
    private _tapes: number[][];

    private rewardsModel: RewardsModel = get(RewardsModel);

    public parseServerSpinResponse(response: ISpinResponse): void {
        this.parseReels(response.reels);
        this.rewardsModel.parse(response);
    }


    public parseServerInitResponse(response: IInitResponse): void {
        this.parseReels(response.reels);

    }

    private parseReels(reels: IServerReelsResponse) {
        if (reels) {
            if (reels.stopPositions) {
                this._stopReelsPosition = reels.stopPositions;
            }
            if (reels.tapes) {
                this._tapes = reels.tapes;
                EventDispatcher.dispatch(SlotEvent.NEW_REELS_TAPES_RECEIVED);
            }
        }
    }


    public getStopReelsPosition(): number[] {
        return this._stopReelsPosition;
    }

    public set state(state: SlotState) {
        if (this._currentSlotState != state) {
            this._currentSlotState = state;
            EventDispatcher.dispatch(SlotEvent.SLOT_STATE_CHANGED);
        }
    }

    public get state(): SlotState {
        return this._currentSlotState;
    }

    public get tapes(): number[][] {
        return this._tapes;
    }
}

export const enum SlotState {
    Idle,
    Spin,
    ShowWin
}