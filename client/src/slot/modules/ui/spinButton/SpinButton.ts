import {Button} from "../generic/Button";
import {LoaderCache} from "../../loader/cache/LoaderCache";
import {get} from "../../utils/locator/locator";
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Texture = PIXI.Texture;

import * as filters from 'pixi-filters';
import {SlotEvent} from "../../../SlotEvent";
import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";


export class SpinButton extends Button {


    filter: filters.ShockwaveFilter;

    private loaderCache: LoaderCache = get(LoaderCache);
    private spinButtonBackImage: Sprite;
    private dispatcher: EventDispatcher = get(EventDispatcher);


    constructor() {
        super();
        const spinButtonTexture = this.loaderCache.getTexture("spinButtonBack");
        this.spinButtonBackImage = new Sprite(spinButtonTexture);

        const playIconTexture: Texture = this.loaderCache.getTexture("playBtnIcon");
        const playIcon: Sprite = new Sprite(playIconTexture);


        this.spinButtonBackImage.pivot = new Point(this.spinButtonBackImage.width / 2, this.spinButtonBackImage.height / 2);
        this.spinButtonBackImage.scale = new Point(0.35, 0.35);
        this.filter = new filters.ShockwaveFilter([44 ,44], {"amplitude":30,"radius":-5,"speed":100,"wavelength":50});

        this.filters = [this.filter];

        this.addChild(this.spinButtonBackImage);

        playIcon.pivot = new Point(playIcon.width / 2.3, playIcon.height / 2);
        playIcon.scale = new Point(0.35, 0.35);
        this.addChild(playIcon);

        this.dispatcher.addListener(SlotEvent.ENTER_FRAME, this.onEnterFrame, this);

    }

    onEnterFrame(): any {
        this.filter.time = (this.filter.time >= 1) ? 0 : this.filter.time + 0.01;
    }

    public disable(): void {
        // super.disable();
        this.spinButtonBackImage.tint = 0xC0C0C0;
        // this.disableGraphics.visible = true;
    }

    public enable(): void {
        super.enable();
        this.spinButtonBackImage.tint = 0x228B22;
    }

}