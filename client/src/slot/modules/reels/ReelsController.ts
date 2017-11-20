import Container = PIXI.Container;
import {ReelView} from "./view/ReelView";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {ReelModel, ReelState} from "./model/ReelModel";
import {ReelController} from "./controller/ReelController";
import {SlotEvent} from "../../SlotEvent";
import Graphics = PIXI.Graphics;
import {SlotModel, SlotState} from "../../SlotModel";
import {get} from "../utils/locator/locator";

export class ReelsController extends Container {

    private reelsCount: number = 5;
    private reelsGap: number = 15;

    private reels: ReelView[] = [];
    private reelsControllers: ReelController[] = [];

    private reelsMask: Graphics;

    private slotModel: SlotModel = get(SlotModel);


    public visibleHeight: number = 415;

    constructor() {
        super();

        for (let i = 0; i < this.reelsCount; i++) {

            const reelModel = new ReelModel();
            reelModel.updateTape(this.slotModel.tapes[i]);
            reelModel.reelIndex = i;

            const reel = new ReelView(reelModel);
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
        let allReelsIdle: boolean = true;

        this.reelsControllers.forEach(reelController => {
            if (reelController.model.currentState != ReelState.Idle) {
                allReelsIdle = false;
            }
        });

        if (allReelsIdle)
            this.slotModel.state = SlotState.Idle;

        this.reels.forEach(reel => reel.draw(deltaTime));
    }
}