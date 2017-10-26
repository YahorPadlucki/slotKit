import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";
import {ReelModel, ReelState} from "./model/ReelModel";
import {get} from "../utils/locator/locator";
import {SlotModel} from "../../SlotModel";


export class ReelView extends Container {


    private verticalGap: number = 5;
    private rows: number = 4;

    private symbolsInTape: SymbolView[] = [];

    private tapeHeight: number;

    private spinSpeed: number = 0;
    private maxSpinSpeed: number = 400;


    private previousState: ReelState;
    private _currentTapeIndex: number = 0;

    private inited: boolean;

    private readyToStop: boolean;
    private stopPositionsPrepared: boolean;

    private slotModel: SlotModel = get(SlotModel);
    private reelModel: ReelModel;


    constructor(reelModel: ReelModel) {
        super();
        this.reelModel = reelModel;
        this.init();
    }

    public init() {

        this.prepareTape();
        this.tapeHeight = this.symbolsInTape[0].y + (this.verticalGap * this.symbolsInTape.length - 1) + (this.symbolsInTape[0].height * this.symbolsInTape.length);
        this.inited = true;
    }

    private prepareTape() {

        let sybmols = this.reelModel.symbolsTape.slice(this.currentTapeIndex, this.rows + 1);
        // sybmols.reverse();
        for (let i = -1; i < this.rows; i++) {

            const symbolIndex = sybmols[this.currentTapeIndex];
            const symbol = new SymbolView(symbolIndex);

            symbol.y = symbol.symbolHeight * i + this.verticalGap * i;
            this.symbolsInTape.push(symbol);
            this.addChild(symbol);
            this.currentTapeIndex++;
        }
    }

    draw(deltaTime: number) {
        if (!this.inited) return;
        const currentState = this.reelModel.currentState;
        if (this.previousState != currentState) {
            switch (this.reelModel.currentState) {
                case ReelState.Idle:
                    break;
                case ReelState.StartSpin:
                    this.startSpin();
                    break;
                case ReelState.StartStop:
                    break;
                case ReelState.ManualStop:
                    break;
            }

            this.previousState = currentState;
        }

        this.spin(deltaTime);
        this.checkIfReadyToStop();
    }

    private startSpin(): void {
        this.stopPositionsPrepared = false;
        this.readyToStop = false;
        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            0.5,
            {
                spinSpeed: this.maxSpinSpeed,
                onComplete: () => {
                    this.reelModel.currentState = ReelState.Spin;
                }
            }
        );
    }

    private spin(deltaTime: number): void {
        this.symbolsInTape.forEach((symbol) => symbol.y += this.spinSpeed / 1000 * deltaTime);
        if (this.reelModel.currentState !== ReelState.Stopping)
            this.updateSymbols();

    }

    private updateSymbols() {

        const topSymbol = this.symbolsInTape[0];
        const bottomSymbol = this.symbolsInTape[this.symbolsInTape.length - 1];
        if (topSymbol.y >= -topSymbol.symbolHeight) {

            if (this.reelModel.currentState == ReelState.StartStop) {

                const finalPosition = this.slotModel.getStopReelsPosition()[this.reelModel.reelIndex];

                if (!this.stopPositionsPrepared) {

                    if (this.currentTapeIndex != finalPosition) {
                        this.currentTapeIndex = finalPosition;
                    }
                    this.stopPositionsPrepared = true;

                } else {
                    if (!this.readyToStop) {
                        if (this.currentTapeIndex == finalPosition + this.rows) {
                            this.readyToStop = true;
                        }

                    }
                }


            } else {
                if (this.reelModel.currentState == ReelState.ManualStop) {
                    this.readyToStop = true;
                }

            }


            this.addSymbolToTop();
        }
        if (bottomSymbol.y > this.tapeHeight) {
            this.removeChild(bottomSymbol);
            this.symbolsInTape.pop();
        }
    }


    private changeSymbolsToStopSymbols() {
        const finalPosition = this.slotModel.getStopReelsPosition()[this.reelModel.reelIndex];

        for (let i = 0; i < this.rows; i++) {
            const symbolFromTape = this.reelModel.symbolsTape[finalPosition + i];
            this.symbolsInTape[i + 1].setSymbolImage(symbolFromTape);

        }
    }

    private checkIfReadyToStop() {
        if (!this.readyToStop) return;
        const topVisibleSymbol = this.symbolsInTape[1];
        if (topVisibleSymbol.y >= -topVisibleSymbol.height / 2 && topVisibleSymbol.y <= 0) {
            if (this.reelModel.currentState == ReelState.ManualStop)
                this.changeSymbolsToStopSymbols();
            this.stopSpin();

        }
    }

    private stopSpin() {
        TweenLite.killTweensOf(this);

        this.spinSpeed = 0;
        this.readyToStop = false;
        this.reelModel.currentState = ReelState.Stopping;

        const topVisibleSymbol = this.symbolsInTape[1];
        const finalYShift = topVisibleSymbol.y * -1;

        this.symbolsInTape.forEach((symbol) => {
            const easOutY = symbol.y + finalYShift + 20;
            const easeInY = symbol.y + finalYShift;

            TweenLite.killTweensOf(symbol);
            TweenLite.to(
                symbol,
                0.1,
                {
                    ease: Sine.easeOut,
                    y: easOutY,
                    onComplete: () => {
                        TweenLite.to(
                            symbol,
                            0.2,
                            {
                                ease: Sine.easeIn,
                                y: easeInY,
                                onComplete: () => {
                                    this.reelModel.currentState = ReelState.Idle;
                                }
                            });
                    }
                });
        });

    }

    private get topSymbolTapeIndex(): number {
        let tapeIndex = this.currentTapeIndex + 1;
        if (tapeIndex >= this.reelModel.symbolsTape.length)
            tapeIndex = 0;
        return tapeIndex;
    }

    private addSymbolToTop() {
        const symbolFromTape = this.reelModel.symbolsTape[this.currentTapeIndex];
        const topNonVisibleSymbol = new SymbolView(symbolFromTape);
        const topVisibleSymbolPosition = this.symbolsInTape[0].y;

        topNonVisibleSymbol.y = topVisibleSymbolPosition - this.verticalGap - topNonVisibleSymbol.symbolHeight;
        this.addChild(topNonVisibleSymbol);
        this.symbolsInTape.unshift(topNonVisibleSymbol);

        this.currentTapeIndex++;
    }

    private get currentTapeIndex() {
        if (this._currentTapeIndex >= this.reelModel.symbolsTape.length) {
            this._currentTapeIndex = 0
        }
        return this._currentTapeIndex;
    }

    private set currentTapeIndex(value: number) {
        this._currentTapeIndex = value;
    }


    private addNonVisibleSymbolToBottom() {
        const bottomNonVisibleSymbol = new SymbolView(1);
        const topSymbol = this.symbolsInTape[0];

        bottomNonVisibleSymbol.y = topSymbol.y + (this.verticalGap * this.symbolsInTape.length - 1) + (topSymbol.height * this.symbolsInTape.length);
        this.addChild(bottomNonVisibleSymbol);
        this.symbolsInTape.push(bottomNonVisibleSymbol);

    }


}