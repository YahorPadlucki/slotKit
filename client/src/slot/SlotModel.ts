import {IServerResponse} from "./modules/server/interfaces/IServerResponse";
import {EventDispatcher} from "./modules/utils/dispatcher/EventDispatcher";
import {SlotEvent} from "./SlotEvent";

export class SlotModel {
    private _currentSlotState;
    private _stopReelsPosition: number[];
    private _totalWin: number;

    public parseServerResponce(response: IServerResponse): void {
        const reelsResponce = response.reels;

        if (reelsResponce) {
            if (reelsResponce.positions) {
                this._stopReelsPosition = response.reels.positions;
            }
        }

        if (response.totalWin) {
            this._totalWin = response.totalWin;
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
}

export const enum SlotState {
    Idle,
    Spin
}