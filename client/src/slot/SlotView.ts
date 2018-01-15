import {MainScene} from "./modules/scenes/ReelsScene";
import {SlotConfig} from "./SlotConfig";
import {get} from "./modules/utils/locator/locator";
import Point = PIXI.Point;
import Container = PIXI.Container;

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
    }

    public createScene(sceneId:string){

    }

    resize(width: number, height: number) {

        const scale = Math.min(Math.min(width, this.minWidth) / this.minWidth, Math.min(height, this.minHeight) / this.minHeight);
        this.scale.set(scale);

        this.mainScene.onResize();
    }
}

export const enum SceneID{
    REELS_SCENE,
    LOADING_SCENE
}

