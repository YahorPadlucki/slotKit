import Container = PIXI.Container;
import {ReelView} from "./ReelView";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {Event} from "../Event";

export class ReelsContainer extends Container {

    private reelsCount: number = 5;
    private reelsGap: number = 50;

    private reels: ReelView[] = [];

    private prevTime: number = 0;
    private fps: number = 60;
    private updateRate: number;

    constructor() {
        super();

        for (let i = 0; i < this.reelsCount; i++) {
            const reel = new ReelView();

            reel.x = reel.width * i + this.reelsGap * i;

            this.reels.push(reel);
            this.addChild(reel);
        }

        this.updateRate = 1000/this.fps;
        EventDispatcher.addListener(Event.ENTER_FRAME, this.onEnterFrame, this);

    }

    private onEnterFrame(): void {
        const currentTime = Date.now();

        if (this.prevTime === 0) {
            this.prevTime = currentTime;
        }

        const deltaTime = currentTime - this.prevTime;

        if (deltaTime > this.updateRate) {
            this.reels.forEach(reel => reel.draw());

            this.prevTime = currentTime - deltaTime % this.updateRate;
        }
    }
}