import Container = PIXI.Container;
import {ReelView} from "./ReelView";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {Event} from "../Event";
import {ReelMediator} from "./mediator/ReelMediator";
import {ReelModel} from "./model/ReelModel";

export class ReelsContainer extends Container {

    private reelsCount: number = 5;
    private reelsGap: number = 15;

    private reels: ReelView[] = [];
    private reelsMediators: ReelMediator[] = [];

    constructor() {
        super();

        for (let i = 0; i < this.reelsCount; i++) {
            const reelModel = new ReelModel();
            const reel = new ReelView(reelModel);

            reel.x = reel.width * i + this.reelsGap * i;

            this.reels.push(reel);
            this.reelsMediators.push(new ReelMediator(reel,reelModel));

            this.addChild(reel);
        }

        EventDispatcher.addListener(Event.ENTER_FRAME, this.onEnterFrame, this);

    }

    private onEnterFrame(deltaTime: number): void {
        this.reels.forEach(reel => reel.draw(deltaTime));
    }
}