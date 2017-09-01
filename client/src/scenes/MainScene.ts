import {ReelsContainer} from "../reels/ReelsContainer";
import {List} from "../utils/dataStructures/List";

export class MainScene extends PIXI.Container {

    private minWidth: number = 800;
    private minHeight: number = 600;

    private sceneBack: PIXI.Graphics;
    private reelsContainer: ReelsContainer;

    constructor() {
        super();
        this.sceneBack = this.drawTempPlaceHolder();

        this.reelsContainer = new ReelsContainer();

        this.reelsContainer.pivot.set(this.reelsContainer.width / 2, this.reelsContainer.height / 2);

        this.addChild(this.sceneBack);
        this.addChild(this.reelsContainer);
    }

    private drawTempPlaceHolder() {

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.drawRect(-this.minWidth / 2, -this.minHeight / 2, this.minWidth, this.minHeight);
        graphics.endFill();

        return graphics;
    }

    resize(width: number, height: number) {
        const scale = Math.min(Math.min(width, this.minWidth) / this.minWidth, Math.min(height, this.minHeight) / this.minHeight);
        this.scale.set(scale);
    }

    draw() {
        this.reelsContainer.draw();
    }
}