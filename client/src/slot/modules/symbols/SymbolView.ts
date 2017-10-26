import Container = PIXI.Container;
import {SymbolModel} from "./model/SymbolModel";
import {get} from "../utils/locator/locator";

export class SymbolView extends Container {


    public symbolWidth: number = 100;
    public symbolHeight: number = 100;

    private symbolModel: SymbolModel = get(SymbolModel);

    constructor(colorIndex: number) {
        super();
        this.setSymbolImage(colorIndex);
    }

    public setSymbolImage(colorIndex: number) {
        this.removeChildren();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(this.symbolModel.colorMap[colorIndex]);

        graphics.drawRect(0, 0, this.symbolWidth, this.symbolHeight);
        graphics.endFill();
        this.addChild(graphics);

        const text = new PIXI.Text(colorIndex.toString());
        this.addChild(text);
    }
}