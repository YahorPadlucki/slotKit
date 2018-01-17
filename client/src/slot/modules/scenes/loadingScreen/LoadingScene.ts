import {BaseScene} from "../BaseScene";
import {LoadingBar} from "./LoadingBar";
import Point = PIXI.Point;

export class LoadingScene extends BaseScene {

    private progressBar: LoadingBar;

    constructor(minWidth, minHeight) {
        super(minWidth, minHeight);
        const sceneBack = this.getSceneBackGraphics();
        this.addChild(sceneBack);


        this.progressBar = new LoadingBar();
        this.progressBar.pivot = new Point(0.5,0.5);
        this.addChild(this.progressBar);

        //TODO:
        this.progressBar.showProgress(0);

        setTimeout(()=>this.progressBar.showProgress(50),2000)
    }

    private getSceneBackGraphics(): PIXI.Graphics {

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xccFFcc);
        graphics.drawRect(-this.minWidth / 2, -this.minHeight / 2, this.minWidth, this.minHeight);
        graphics.endFill();

        return graphics;
    }
}