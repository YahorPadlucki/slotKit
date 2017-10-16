import {ReelsContainer} from "../reels/ReelsContainer";
import {UiPanel} from "../ui/UiPannel";
import {BaseScene} from "./BaseScene";

export class MainScene extends BaseScene {

    private sceneBack: PIXI.Graphics;

    private reelsContainer: ReelsContainer;
    private uiPannel: UiPanel;

    constructor(minWidth, minHeight) {
        super(minWidth, minHeight);
        this.sceneBack = this.drawTempPlaceHolder();

        this.reelsContainer = new ReelsContainer();
        this.reelsContainer.x = -this.reelsContainer.width / 2;

        this.addChild(this.sceneBack);
        this.addChild(this.reelsContainer);

        this.uiPannel = new UiPanel();
        this.addChild(this.uiPannel);

        this.reelsContainer.y = -this.reelsContainer.visibleHeight / 2 - this.uiPannel.height / 2;
    }

    private drawTempPlaceHolder() {

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xcccccc);
        graphics.drawRect(-this.minWidth / 2, -this.minHeight / 2, this.minWidth, this.minHeight);
        graphics.endFill();

        return graphics;
    }

    public onResize() {
        this.uiPannel.x = -this.minWidth / 2;
        this.uiPannel.y = this.minHeight / 2 - this.uiPannel.height;
        this.uiPannel.onResize();

    }
}