import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {Event} from "../Event";

export class ReelView extends Container {

    private verticalGap: number = 5;
    private rows: number = 5;

    private visibleSymbolsTape: SymbolView[] = [];
    private topSymbol: SymbolView;

    constructor() {
        super();

        for (let i = 0; i < this.rows; i++) {
            const symbol = new SymbolView();

            if (i === 0) {
                this.topSymbol = symbol;
            }
            symbol.y = symbol.symbolHeight * i + this.verticalGap * i;

            this.addChild(symbol);
        }

        //TODO: reels mediator
        EventDispatcher.addListener(Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private onEnterFrame(): void {
        this.spin();
    }

    private spin(): void {
        this.y++;
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
}