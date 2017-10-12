export class ReelModel {
    private _reelIndex: number;
    private _currentState: ReelState;

    public readonly symbolsTape: number[] = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];

    set reelIndex(value: number) {
        this._reelIndex = value;
    }

    get reelIndex() {
        return this._reelIndex;
    }

    set currentState(value: ReelState) {
        this._currentState = value;
    }

    get currentState() {
        return this._currentState;
    }

}

export const enum ReelState {
    Idle,
    StartSpin,
    Spin,
    StartStop,
    Stopping
}