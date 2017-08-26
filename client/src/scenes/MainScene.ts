import {ReelsContainer} from "../reels/ReelsContainer";

export class MainScene extends PIXI.Container {

    private minWidth: number = 800;
    private minHeight: number = 600;

    private sceneBack: PIXI.Graphics;
    private reelsContainer: ReelsContainer;

    constructor() {
        super();
        console.log("Main scene inited");
        this.sceneBack = this.drawTempPlaceHolder();

        this.reelsContainer = new ReelsContainer();

        this.addChild(this.sceneBack);
        this.addChild(this.reelsContainer);

    }

    private drawTempPlaceHolder() {

        const graphics =  new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.drawRect(-this.minWidth / 2, -this.minHeight / 2, this.minWidth, this.minHeight);
        graphics.endFill();

        return graphics;

    }

    resize(width: number, height: number) {
        // const scale = Math.min(Math.min(width, this.minWidth) / this.minWidth, Math.min(height, this.minHeight) / this.minHeight);
        // this.scale.set(scale);
    }
}