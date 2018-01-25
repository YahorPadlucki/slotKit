import {Button} from "../generic/Button";
import Graphics = PIXI.Graphics;
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import {LoaderCache} from "../../loader/cache/LoaderCache";
import {get} from "../../utils/locator/locator";

export class SpinButton extends Button {

    private activeGraphics: Graphics;
    private disableGraphics: Graphics;

    private loaderCache:LoaderCache = get(LoaderCache);

    constructor() {
        super();
        this.activeGraphics = this.prepareState(0x15ee86);
        this.addChild(this.activeGraphics);

        this.disableGraphics = this.prepareState(0xaab6b1);
        this.addChild(this.disableGraphics);

        this.disableGraphics.visible = false;

        const spinButtonTexture = this.loaderCache.getTexture("spinButton.png");
        const spinButtonImage = new Sprite(spinButtonTexture);

        spinButtonImage.pivot = new Point(spinButtonImage.width / 2, spinButtonImage.height / 2);
        spinButtonImage.scale = new Point(0.3, 0.3);
        this.addChild(spinButtonImage);
    }

    public disable(): void {
        super.disable();
        this.activeGraphics.visible = false;
        this.disableGraphics.visible = true;
    }

    public enable(): void {
        super.enable();
        this.activeGraphics.visible = true;
        this.disableGraphics.visible = false;
    }

    private prepareState(color: number): Graphics {
        const state = new PIXI.Graphics();
        state.beginFill(color);

        state.drawCircle(0, 0, 45);
        state.endFill();

        return state;
    }

}