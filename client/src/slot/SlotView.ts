import {MainScene} from "./modules/scenes/MainScene";
import Point = PIXI.Point;
import Container = PIXI.Container;
import {SlotConfig} from "./SlotConfig";
import {get} from "./modules/utils/locator/locator";
import Sprite = PIXI.Sprite;
import TextureCache = PIXI.utils.TextureCache;

export class SlotView extends Container {

    private mainScene: MainScene;
    private slotConfig: SlotConfig = get(SlotConfig);
    private minWidth: number;
    private minHeight: number;

    constructor() {
        super();

        this.minWidth = this.slotConfig.minSlotWidth;
        this.minHeight = this.slotConfig.minSlotHeight;

        this.mainScene = new MainScene(this.minWidth, this.minHeight);
        this.mainScene.pivot = new Point(0.5, 0.5);
        this.addChild(this.mainScene);


        // const reelsBack = new Sprite();
        // this.addChild(reelsBack)

        console.log(PIXI.Texture.fromImage('images/reelsBack.png'));
        // console.log(TextureCache['images/reelsBack.png']);
    }

    resize(width: number, height: number) {

        const scale = Math.min(Math.min(width, this.minWidth) / this.minWidth, Math.min(height, this.minHeight) / this.minHeight);
        this.scale.set(scale);

        this.mainScene.onResize();
    }
}

