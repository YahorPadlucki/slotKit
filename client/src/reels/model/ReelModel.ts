export class ReelModel {
    private _reelId: number;
    private _currentState: ReelState;

    public readonly symbolsTape: number[] = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];

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
    StartStop
}