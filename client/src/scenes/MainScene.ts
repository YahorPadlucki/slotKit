import {ReelsContainer} from "../reels/ReelsContainer";
import {List} from "../utils/dataStructures/List";
import {SpinButton} from "../ui/SpinButton";

export class MainScene extends PIXI.Container {


    private minWidth: number = 800;
    private minHeight: number = 600;

    private sceneBack: PIXI.Graphics;
    private reelsContainer: ReelsContainer;

    private spinButton: SpinButton;

    constructor() {
        super();
        this.sceneBack = this.drawTempPlaceHolder();

        this.reelsContainer = new ReelsContainer();

        // this.reelsContainer.pivot.set(this.reelsContainer.width / 2, this.reelsContainer.height / 2);

        this.reelsContainer.y = -this.minHeight / 2;
        this.reelsContainer.x = -this.reelsContainer.width / 2;
        this.addChild(this.sceneBack);
        this.addChild(this.reelsContainer);

        this.spinButton = new SpinButton();

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

        this.setPositions();
    }

    private setPositions() {
        //TODO:positioning
        this.spinButton.x = this.minWidth/2-this.spinButton.width/2;
        this.spinButton.y = this.minHeight/2-this.spinButton.height/2;
    }
}