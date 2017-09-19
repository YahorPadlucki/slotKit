import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";
import {ReelModel, ReelState} from "./model/ReelModel";


export class ReelView extends Container {


    private verticalGap: number = 5;
    private rows: number = 5;

    private symbols: SymbolView[] = [];

    private tapeHeight: number;

    private spinSpeed: number = 0;
    private maxSpinSpeed: number = 200;

    private model: ReelModel;

    private _previousState: ReelState;

    constructor(reelModel: ReelModel) {
        super();
        this.model = reelModel;
        this.init();
    }

    public init() {

        this.addVisibleSymbols();

        this.addNonVisibleSymbolToTop();
        this.addNonVisibleSymbolToBottom();

        this.tapeHeight = this.symbols[0].y + (this.verticalGap * this.symbols.length - 1) + (this.symbols[0].height * this.symbols.length);
    }

    private addVisibleSymbols() {
        for (let i = 0; i < this.rows; i++) {
            const symbol = new SymbolView(0xFF3300);

            symbol.y = symbol.symbolHeight * i + this.verticalGap * i;
            this.symbols.push(symbol);
            this.addChild(symbol);
        }
    }

    draw(deltaTime: number) {

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
        const topSymbol = this.symbols[0];
        const bottomSymbol = this.symbols[this.symbols.length - 1];
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

    //TODO: stop on fully visible symbol
    public stopSpin(): void {
        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            0.5,
            {
                spinSpeed: 0,
                onComplete: () => {
                    this.model.currentState = ReelState.Idle;
                }
            }
        );
    }

    private addNonVisibleSymbolToTop() {
        const topNonVisibleSymbol = new SymbolView(0x003300);
        const topSymbol = this.symbols[0];

        topNonVisibleSymbol.y = topSymbol.y - this.verticalGap - topNonVisibleSymbol.symbolHeight;
        this.addChild(topNonVisibleSymbol);
        this.symbols.unshift(topNonVisibleSymbol);
    }

    private addNonVisibleSymbolToBottom() {
        const bottomNonVisibleSymbol = new SymbolView(0x003300);
        const topSymbol = this.symbols[0];

        bottomNonVisibleSymbol.y = topSymbol.y + (this.verticalGap * this.symbols.length - 1) + (topSymbol.height * this.symbols.length);
        this.addChild(bottomNonVisibleSymbol);
        this.symbols.push(bottomNonVisibleSymbol);

    }


}