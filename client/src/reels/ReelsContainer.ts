import Container = PIXI.Container;
import {ReelView} from "./ReelView";

export class ReelsContainer extends Container {

    private reelsCount: number = 5;
    private reelsGap: number = 50;

    constructor() {
        super();

        for (let i = 0; i < this.reelsCount; i++) {
            const reel = new ReelView();

            reel.x = reel.width * i + this.reelsGap * i;

            this.addChild(reel);
        }
    }
}