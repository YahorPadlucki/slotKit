import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";

export class ReelView extends Container {


    private symbolsCount: number = 5;
    private verticalGap: number = 5;

    constructor() {
        super();

        for (let i = 0; i < this.symbolsCount; i++) {
            const symbol = new SymbolView();

            symbol.y = symbol.symbolHeight * i + this.verticalGap * i;

            this.addChild(symbol);
        }
    }
}