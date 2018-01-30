import {Button} from "../generic/Button";
import {LoaderCache} from "../../loader/cache/LoaderCache";
import {get} from "../../utils/locator/locator";
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Texture = PIXI.Texture;
import * as filters from 'pixi-filters';

export class SpinButton extends Button {

    private loaderCache: LoaderCache = get(LoaderCache);
    private spinButtonBackImage: Sprite;

    constructor() {
        super();
        const spinButtonTexture = this.loaderCache.getTexture("spinButtonBack");
        this.spinButtonBackImage = new Sprite(spinButtonTexture);

        const playIconTexture:Texture = this.loaderCache.getTexture("playBtnIcon");
        const playIcon:Sprite = new Sprite(playIconTexture);

        this.spinButtonBackImage.tint = 0xffffff;


        this.spinButtonBackImage.pivot = new Point(this.spinButtonBackImage.width / 2, this.spinButtonBackImage.height / 2);
        this.spinButtonBackImage.scale = new Point(0.35, 0.35);
        this.addChild(this.spinButtonBackImage);

        playIcon.pivot = new Point(playIcon.width / 2.3, playIcon.height / 2);
        playIcon.scale = new Point(0.35, 0.35);
        this.addChild(playIcon);

        const filter = new filters.ShockwaveFilter();
        this.spinButtonBackImage.filters = [filter];
    }

    public disable(): void {
        super.disable();

        this.spinButtonBackImage.tint = 0xC0C0C0;
        // this.disableGraphics.visible = true;
    }

    public enable(): void {
        super.enable();
        this.spinButtonBackImage.tint = 0x228B22;
    }

}