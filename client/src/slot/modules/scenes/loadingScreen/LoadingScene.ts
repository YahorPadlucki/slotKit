import {BaseScene} from "../BaseScene";

export class PreloaderScene extends BaseScene {

    constructor(minWidth, minHeight) {
        super(minWidth, minHeight);
        const sceneBack = this.getSceneBackGraphics();
        this.addChild(sceneBack);
    }

    private getSceneBackGraphics(): PIXI.Graphics {

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xccFFcc);
        graphics.drawRect(-this.minWidth / 2, -this.minHeight / 2, this.minWidth, this.minHeight);
        graphics.endFill();

        return graphics;
    }
}