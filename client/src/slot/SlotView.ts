import {MainScene} from "./modules/scenes/MainScene";
import Point = PIXI.Point;
import Container = PIXI.Container;

export class SlotView extends Container {

    private mainScene: MainScene;

    private minWidth: number = 800;
    private minHeight: number = 600;

    constructor() {
        super();
        this.mainScene = new MainScene(this.minWidth, this.minHeight);
        this.mainScene.pivot = new Point(0.5, 0.5);
        this.addChild(this.mainScene);
    }

    resize(width: number, height: number) {

        const scale = Math.min(Math.min(width, this.minWidth) / this.minWidth, Math.min(height, this.minHeight) / this.minHeight);
        this.scale.set(scale);

        this.mainScene.onResize();
    }
}

