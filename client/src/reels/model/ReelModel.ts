export class ReelModel {
    private _reelId: number;
    private _currentState: ReelState;

    public readonly symbolsTape: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


}

export const enum ReelState {
    Idle,
    StartSpin,
    Spin,
    StartStop
}