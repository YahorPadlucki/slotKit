import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";


export class ReelView extends Container {

    private verticalGap: number = 5;
    private rows: number = 5;

    private symbols: SymbolView[] = [];

    private tapeHeight:number;

    private _prevTime:number;

    constructor() {
        super();

        this.initReels();

        //TODO: reels mediator

    }

    private initReels() {
        this.addVisibleSymbols();

        this.addNonVisibleSymbolToTop();
        this.addNonVisibleSymbolToBottom();

        this.tapeHeight =  this.symbols[0].y + (this.verticalGap * this.symbols.length - 1) + (this.symbols[0].height * this.symbols.length);
    }

    private addVisibleSymbols() {
        for (let i = 0; i < this.rows; i++) {
            const symbol = new SymbolView(0xFF3300);

            symbol.y = symbol.symbolHeight * i + this.verticalGap * i;
            this.symbols.push(symbol);
            this.addChild(symbol);
        }
    }

    private onEnterFrame(): void {
    }

    draw() {
        this.spin();
    }

    private spin(): void {
        this.symbols.forEach((symbol) => symbol.y++);
        const topSymbol = this.symbols[0];
        const bottomSymbol = this.symbols[this.symbols.length - 1];
        if (topSymbol.y >= -topSymbol.symbolHeight) {
            this.addNonVisibleSymbolToTop();
        }
        if(bottomSymbol.y> this.tapeHeight){
            this.removeChild(bottomSymbol);
            this.symbols.pop();
        }
    }

    //TODO: start, stop anim with tweenLite
    // main anim on pixi draw
    //reel model
    public startSpin(): void {

        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            5,
            {
                y: 400
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