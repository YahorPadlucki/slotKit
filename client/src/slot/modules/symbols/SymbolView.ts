import Container = PIXI.Container;
import {SymbolModel} from "./model/SymbolModel";
import {get} from "../utils/locator/locator";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {SymbolEvents} from "./events/SymbolEvents";
import {IWinSymbolData} from "../rewards/interfaces/IWinSymbolData";

export class SymbolView extends Container {


    public symbolWidth: number = 100;
    public symbolHeight: number = 100;

    private symbolModel: SymbolModel = get(SymbolModel);

    private _stopRowIndex: number;
    private _stopCollumnIndex: number;


    constructor(colorIndex: number) {
        super();
        this.setSymbolImage(colorIndex);
        EventDispatcher.addListener(SymbolEvents.BLINK, this.blink, this);
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

    private blink(winSymbolData: IWinSymbolData) {
        if (winSymbolData.rowIndex != this._stopRowIndex || winSymbolData.columnIndex != this._stopCollumnIndex)
            return;

        TweenLite.killTweensOf(this);
        TweenLite.to(this, 1, {
            alpha: 0.5
        });
        setTimeout(() => {
            TweenLite.to(this, 1, {
                alpha: 1
            });
        }, 1000)

    }

    public setSymbolStopPositionIndexes(rowIndex: number, column: number) {
        this._stopRowIndex = rowIndex;
        this._stopCollumnIndex = column;
    }
}