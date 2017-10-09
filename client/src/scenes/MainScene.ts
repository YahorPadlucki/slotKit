import {ReelsContainer} from "../reels/ReelsContainer";
import {UiPanel} from "../ui/UiPannel";

export class MainScene extends PIXI.Container {


    private minWidth: number = 800;
    private minHeight: number = 600;

    private sceneBack: PIXI.Graphics;

    private reelsContainer: ReelsContainer;
    private uiPannel: UiPanel;


    constructor() {
        super();
        this.sceneBack = this.drawTempPlaceHolder();

        this.reelsContainer = new ReelsContainer();

        // this.reelsContainer.pivot.set(this.reelsContainer.width / 2, this.reelsContainer.height / 2);

        // this.reelsContainer.y = -this.minHeight / 2;
        this.reelsContainer.x = -this.reelsContainer.width / 2;
        this.addChild(this.sceneBack);
        this.addChild(this.reelsContainer);

        this.uiPannel = new UiPanel();
        this.addChild(this.uiPannel);

        this.reelsContainer.y = -this.reelsContainer.visibleHeight/2-this.uiPannel.height/2;

    }

    private drawTempPlaceHolder() {

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xcccccc);
        graphics.drawRect(-this.minWidth / 2, -this.minHeight / 2, this.minWidth, this.minHeight);
        graphics.endFill();

        return graphics;
    }

    resize(width: number, height: number) {
        const scale = Math.min(Math.min(width, this.minWidth) / this.minWidth, Math.min(height, this.minHeight) / this.minHeight);
        this.scale.set(scale);

        this.onResize();
    }

    private onResize() {
        this.uiPannel.x = -this.minWidth / 2;
        this.uiPannel.y = this.minHeight / 2 - this.uiPannel.height;
        this.uiPannel.onResize();

    }
}