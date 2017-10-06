import Container = PIXI.Container;
import {ReelView} from "./ReelView";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {ReelModel} from "./model/ReelModel";
import {ReelController} from "./controller/ReelController";
import {SlotEvent} from "../SlotEvent";
import Graphics = PIXI.Graphics;

export class ReelsContainer extends Container {

    private reelsCount: number = 5;
    private reelsGap: number = 15;

    private reels: ReelView[] = [];
    private reelsControllers: ReelController[] = [];

    private reelsMask: Graphics;

    public visibleHeight: number = 415;

    constructor() {
        super();

        for (let i = 0; i < this.reelsCount; i++) {
            const reelModel = new ReelModel();
            const reel = new ReelView(reelModel);

            reelModel.reelIndex = i;

            reel.x = reel.width * i + this.reelsGap * i;

            this.reels.push(reel);
            this.reelsControllers.push(new ReelController(reel, reelModel));

            this.addChild(reel);
        }
        this.reelsMask = new Graphics();
        this.reelsMask.beginFill(0x000000, 0.5);
        this.reelsMask.drawRect(0, 0, 560, this.visibleHeight);
        this.reelsMask.endFill();
        this.addChild(this.reelsMask);


        this.mask = this.reelsMask;

        EventDispatcher.addListener(SlotEvent.ENTER_FRAME, this.onEnterFrame, this);

    }

    private onEnterFrame(deltaTime: number): void {
        this.reels.forEach(reel => reel.draw(deltaTime));
    }
}