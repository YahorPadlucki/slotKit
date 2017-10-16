import {IServerResponse} from "./modules/server/interfaces/IServerResponse";

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
}