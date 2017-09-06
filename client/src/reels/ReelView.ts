import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {Event} from "../Event";

export class ReelView extends Container {

    private verticalGap: number = 5;
    private rows: number = 5;

    private symbols: SymbolView[] = [];
    private topSymbolVisible: SymbolView;
    private topSymbol: SymbolView;

    constructor() {
        super();

        this.initReels();

        //TODO: reels mediator

        EventDispatcher.addListener(Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private initReels() {
        this.addVisibleSymbols();

        //TODO: remake order dependence
        this.addSymbolToBottom();
        this.addSymbolToTop();
    }

    private addVisibleSymbols() {
        for (let i = 0; i < this.rows; i++) {
            const symbol = new SymbolView(0xFF3300);

            if (i === 0) {
                this.topSymbolVisible = symbol;
                this.topSymbol = symbol;

            }
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
        console.log(this.topSymbolVisible.y)
        if (this.topSymbolVisible.y > this.topSymbolVisible.symbolHeight) {
            this.topSymbolVisible = this.symbols[this.symbols.length-1];// todo:remake to list las?
            this.topSymbol = this.addSymbolToTop();
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

    private addSymbolToTop() {
        const bottomAdditionalSymbol = new SymbolView(0x003300);
        bottomAdditionalSymbol.y = this.topSymbol.y - this.verticalGap - bottomAdditionalSymbol.symbolHeight;
        this.addChild(bottomAdditionalSymbol);
        this.symbols.push(bottomAdditionalSymbol);
        return bottomAdditionalSymbol;


    }

    private addSymbolToBottom() {
        const topAdditionalSymbol = new SymbolView(0x003300);
        topAdditionalSymbol.y = this.topSymbolVisible.y + (this.verticalGap * this.rows - 1) + (this.topSymbolVisible.height * this.rows);
        this.addChild(topAdditionalSymbol);
        this.symbols.push(topAdditionalSymbol);

    }
}