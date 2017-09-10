import Container = PIXI.Container;
import {ReelView} from "./ReelView";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {Event} from "../Event";
import {ReelMediator} from "./mediator/ReelsContainerMediator";

export class ReelsContainer extends Container {

    private reelsCount: number = 5;
    private reelsGap: number = 50;

    private reels: ReelView[] = [];
    private reelsMediators: ReelMediator[] = [];

    constructor() {
        super();

        for (let i = 0; i < this.reelsCount; i++) {
            const reel = new ReelView();

            reel.x = reel.width * i + this.reelsGap * i;

            this.reels.push(reel);


            this.addChild(reel);
        }

        EventDispatcher.addListener(Event.ENTER_FRAME, this.onEnterFrame, this);

    }

    private onEnterFrame(deltaTime: number): void {
        this.reels.forEach(reel => reel.draw(deltaTime));
    }
}