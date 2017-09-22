import Container = PIXI.Container;
import {SymbolModel} from "./model/SymbolModel";

export class SymbolView extends Container {


    public symbolWidth: number = 100;
    public symbolHeight: number = 100;

    private symbolModel:SymbolModel = new SymbolModel;

    constructor(index:number) {
        super();

        const graphics = new PIXI.Graphics();
        graphics.beginFill(this.symbolModel.colorMap[index]);

        graphics.drawRect(0, 0, this.symbolWidth, this.symbolHeight);
        graphics.endFill();
        this.addChild(graphics);

        const text = new PIXI.Text(index.toString());
        this.addChild(text);

    }
}