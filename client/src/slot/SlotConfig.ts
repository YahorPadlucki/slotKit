export class SlotConfig {
    minSlotWidth: number;
    minSlotHeight: number;
    reels: IReelsConfig;


    constructor() {
       console.log("=== construct slot config")
    }
}

export interface IReelsConfig {
    reelsNumber: number;
    rowsNumber: number;
    maxSpinSpeed: number;
    gapBetweenReels: number;
    gapBetweenSymbols: number;
    visibleHeight: number;
}