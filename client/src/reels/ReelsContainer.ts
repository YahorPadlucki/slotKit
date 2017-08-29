import Container = PIXI.Container;
import {ReelView} from "./ReelView";

export class ReelsContainer extends Container {

    private reelsCount: number = 5;
    private reelsGap: number = 50;

    private reels:ReelView[]=[];

    constructor() {
        super();

        for (let i = 0; i < this.reelsCount; i++) {
            const reel = new ReelView();

            reel.x = reel.width * i + this.reelsGap * i;

            this.reels.push(reel);
            this.addChild(reel);
        }
    }

    draw() {
        this.reels.forEach((reel)=>reel.draw());
    }
}