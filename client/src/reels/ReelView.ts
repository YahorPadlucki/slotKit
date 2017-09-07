import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {Event} from "../Event";

export class ReelView extends Container {

    private verticalGap: number = 5;
    private rows: number = 5;

    private symbols: SymbolView[] = [];

    constructor() {
        super();

        this.initReels();

        //TODO: reels mediator

        EventDispatcher.addListener(Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private initReels() {
        this.addVisibleSymbols();

        this.addNonVisibleSymbolToTop();
        this.addNonVisibleSymbolToBottom();
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
        this.spin();
    }

    private spin(): void {
        this.symbols.forEach((symbol) => symbol.y++);
        const topSymbol = this.symbols[0];
        if (topSymbol.y >= -topSymbol.symbolHeight) {
            this.addNonVisibleSymbolToTop();
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