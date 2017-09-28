import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";
import {ReelModel, ReelState} from "./model/ReelModel";


export class ReelView extends Container {


    private verticalGap: number = 5;
    private rows: number = 5;

    private symbolsInTape: SymbolView[] = [];

    private tapeHeight: number;

    private spinSpeed: number = 0;
    private maxSpinSpeed: number = 50;
    private stopSpinSpeed: number = 50;

    private model: ReelModel;

    private _previousState: ReelState;
    private _currentTapeIndex: number = 0;

    private inited: boolean;

    //TODO: tween top symbol on one tween
    //loosing focus, return

    constructor(reelModel: ReelModel) {
        super();
        this.model = reelModel;
        this.init();
    }

    public init() {

        this.addVisibleSymbols();
        this.tapeHeight = this.symbolsInTape[0].y + (this.verticalGap * this.symbolsInTape.length - 1) + (this.symbolsInTape[0].height * this.symbolsInTape.length);
        this.inited = true;
    }

    private addVisibleSymbols() {

        let sybmols = this.model.symbolsTape.slice(this.currentTapeIndex, this.rows + 1);
        sybmols.reverse();
        for (let i = -1; i < this.rows; i++) {

            const symbolIndex = sybmols[this.currentTapeIndex];
            const symbol = new SymbolView(symbolIndex);

            symbol.y = symbol.symbolHeight * i + this.verticalGap * i;
            this.symbolsInTape.push(symbol);
            this.addChild(symbol);
            this.currentTapeIndex++;
        }
    }

    private getCurrentSymbolTape(i: number) {
        return this.model.symbolsTape[i];
    }

    draw(deltaTime: number) {
        if (!this.inited) return;
        const currentState = this.model.currentState;
        if (this._previousState != currentState) {
            switch (this.model.currentState) {
                case ReelState.Idle:
                    break;
                case ReelState.StartSpin:
                    this.startSpin();
                    break;
                case ReelState.StartStop:
                    this.stopSpin();
                    break;
            }

            this._previousState = currentState;
        } else {
            // if (currentState === ReelState.Spin)
        }

        this.spin(deltaTime);


    }

    private spin(deltaTime: number): void {
        this.symbolsInTape.forEach((symbol) => symbol.y += this.spinSpeed / 1000 * deltaTime);
        this.updateSymbols();
    }

    private updateSymbols() {

        const topSymbol = this.symbolsInTape[0];
        const bottomSymbol = this.symbolsInTape[this.symbolsInTape.length - 1];
        if (topSymbol.y >= -topSymbol.symbolHeight) {
            this.addSymbolToTop();
        }
        if (bottomSymbol.y > this.tapeHeight) {
            this.removeChild(bottomSymbol);
            this.symbolsInTape.pop();
        }
    }

    private startSpin() {
        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            0.5,
            {
                spinSpeed: this.maxSpinSpeed,
                onComplete: () => {
                    this.model.currentState = ReelState.Spin;
                }
            }
        );
    }

    private stopSpin() {
        const yShift = this.symbolsInTape[1].y;
        const stopTime = Math.abs(yShift)/ (this.spinSpeed);

        this.symbolsInTape.forEach((symbol) => {
            const finalY = symbol.y + Math.abs(yShift);

            TweenLite.killTweensOf(symbol);
            TweenLite.to(
                symbol,
                stopTime,
                {
                    y: finalY,
                    onComplete: () => {
                        this.model.currentState = ReelState.Idle;
                    }
                });
        });
        this.spinSpeed = 0;

    }

    private addSymbolToTop() {
        const symbolFromTape = this.model.symbolsTape[this.currentTapeIndex];
        this.currentTapeIndex++;
        const topNonVisibleSymbol = new SymbolView(symbolFromTape);
        const topSymbol = this.symbolsInTape[0];

        topNonVisibleSymbol.y = topSymbol.y - this.verticalGap - topNonVisibleSymbol.symbolHeight;
        this.addChild(topNonVisibleSymbol);
        this.symbolsInTape.unshift(topNonVisibleSymbol);
    }

    private get currentTapeIndex() {
        if (this._currentTapeIndex >= this.model.symbolsTape.length) {
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