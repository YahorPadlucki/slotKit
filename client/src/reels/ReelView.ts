import Container = PIXI.Container;
import {SymbolView} from "../symbols/SymbolView";

export class ReelView extends Container {


    constructor() {
        super();

        const symbol = new SymbolView();
        this.addChild(symbol);
    }
}