import {SlotView} from "./SlotView";
import {EventDispatcher} from "./modules/utils/dispatcher/EventDispatcher";
import {SlotEvent} from "./SlotEvent";
import {IServer} from "./modules/server/IServer";
import {ServerEmulator} from "./modules/server/serverEmulator/ServerEmulator";
import {SlotModel, SlotState} from "./SlotModel";
import {get} from "./modules/utils/locator/locator";
import {ISpinResponse} from "./modules/server/interfaces/ISpinResponse";
import {IInitResponse} from "./modules/server/interfaces/IInitResponse";
import {RewardsModel} from "./modules/rewards/RewardsModel";
import {RewardsManager} from "./modules/rewards/RewardsManager";
import {Loader} from "./modules/loader/Loader";
import {LoaderEvent} from "./modules/loader/events/LoaderEvent";
import {SoundManager} from "./modules/sound/SoundManager";

export class SlotController {

    private server: IServer = new ServerEmulator();
    private slotModel: SlotModel = get(SlotModel);
    private rewardsModel: RewardsModel = get(RewardsModel);
    private rewardsManager: RewardsManager = get(RewardsManager);

    private soundManager: SoundManager = get(SoundManager);

    private loader: Loader = get(Loader);

    constructor(private view: SlotView) {
        EventDispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);

        EventDispatcher.addListener(SlotEvent.REELS_STOPPED, this.onReelsStopped, this);


        // load through loading manager - and handle multiple id on same sounds
        this.loader.addSound("test", "../data/sounds/test.mp3");
        this.loader.addSound("test2", "../data/sounds/test2.mp3");
        this.loader.addSound("test3", "../data/sounds/test3.mp3");
        this.loader.startLoading();

        EventDispatcher.addListener(LoaderEvent.ALL_FILES_LOADED, this.onFilesLoaded, this);

    }

    private onFilesLoaded(): void {
        this.soundManager.playSound("test");
    }

    public makeInitRequest(): Promise<any> {
        return this.server.initRequest().then((initResponse: IInitResponse) => {
            this.slotModel.parseServerInitResponse(initResponse);
            return Promise.resolve();
        })
    }

    private onSpinClicked(): void {
        this.rewardsManager.cancelShowWinnings();
        this.slotModel.state = SlotState.Spin;
        this.server.spinRequest().then((serverResponse: ISpinResponse) => this.handleServerSpinResponse(serverResponse));
    }

    private onReelsStopped() {
        if (this.rewardsModel.totalWin > 0) {
            this.slotModel.state = SlotState.ShowWin;
            this.rewardsManager.showWinnings().then(() => this.slotModel.state = SlotState.Idle);
        }
        else {
            this.slotModel.state = SlotState.Idle;
        }
    }

    private handleServerSpinResponse(serverResponse: ISpinResponse) {
        this.slotModel.parseServerSpinResponse(serverResponse);

        EventDispatcher.dispatch(SlotEvent.SERVER_SPIN_RESPONSE_RECEIVED);
    }
}
