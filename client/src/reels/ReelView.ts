import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";
import {ReelModel, ReelState} from "./model/ReelModel";


export class ReelView extends Container {


    private verticalGap: number = 5;
    private rows: number = 5;

    private symbols: SymbolView[] = [];

    private tapeHeight: number;

    private spinSpeed: number = 0;
    private maxSpinSpeed: number = 50;

    private model: ReelModel;

    private _previousState: ReelState;
    private currentTapeIndex: number = 0;

    private inited: boolean;

    //TODO: inversion of tape

    constructor(reelModel: ReelModel) {
        super();
        this.model = reelModel;
        this.init();
    }

    public init() {

        this.addVisibleSymbols();
        this.tapeHeight = this.symbols[0].y + (this.verticalGap * this.symbols.length - 1) + (this.symbols[0].height * this.symbols.length);
        this.inited = true;
    }

    private addVisibleSymbols() {

        for (let i = this.rows - 1; i >= -1; i--) {

            const symbolIndex = this.model.symbolsTape[this.currentTapeIndex];
            const symbol = new SymbolView(symbolIndex);

            symbol.y = symbol.symbolHeight * i + this.verticalGap * i;
            this.symbols.push(symbol);
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
        this.symbols.forEach((symbol) => symbol.y += this.spinSpeed / 1000 * deltaTime);
        this.updateSymbols();
    }

    private updateSymbols() {

        const topSymbol = this.symbols[this.rows];
        const bottomSymbol = this.symbols[0];
        if (topSymbol.y >= -topSymbol.symbolHeight) {
            this.addNonVisibleSymbolToTop();
        }
        if (bottomSymbol.y > this.tapeHeight) {
            this.removeChild(bottomSymbol);
            this.symbols.pop();
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

    public stopSpin(): void {
        setTimeout(() => this.stop(), 1000);
    }

    private stop() {
        this.spinSpeed = 0;
        //TODO:not 1 - but additional count
        // always do a tween?
        const yShift = this.symbols[1].y;

        this.symbols.forEach((symbol) => {
            const finalY = symbol.y + Math.abs(yShift);
            TweenLite.killTweensOf(symbol);
            TweenLite.to(
                symbol,
                0.5,
                {
                    y: finalY,
                    onComplete: () => {
                        this.model.currentState = ReelState.Idle;
                    }
                });
        });
    }

    private addNonVisibleSymbolToTop() {
        const topNonVisibleSymbol = new SymbolView(this.currentTapeIndex);
        const topSymbol = this.symbols[this.rows];

        topNonVisibleSymbol.y = topSymbol.y - this.verticalGap - topNonVisibleSymbol.symbolHeight;
        this.addChild(topNonVisibleSymbol);
        this.symbols.unshift(topNonVisibleSymbol);

        if (this.currentTapeIndex == this.model.symbolsTape.length - 1) {
            this.currentTapeIndex = 0;
        }
        this.currentTapeIndex++;
    }

    private addNonVisibleSymbolToBottom() {
        const bottomNonVisibleSymbol = new SymbolView(1);
        const topSymbol = this.symbols[0];

        bottomNonVisibleSymbol.y = topSymbol.y + (this.verticalGap * this.symbols.length - 1) + (topSymbol.height * this.symbols.length);
        this.addChild(bottomNonVisibleSymbol);
        this.symbols.push(bottomNonVisibleSymbol);

    }


}