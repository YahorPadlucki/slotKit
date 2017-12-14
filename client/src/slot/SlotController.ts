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
import {LoadingManager} from "./modules/loader/LoadingManager";

export class SlotController {

    private server: IServer = new ServerEmulator();
    private slotModel: SlotModel = get(SlotModel);
    private rewardsModel: RewardsModel = get(RewardsModel);
    private rewardsManager: RewardsManager = get(RewardsManager);

    private soundManager: SoundManager = get(SoundManager);

    private loadingManager: LoadingManager = get(LoadingManager);


    constructor(private view: SlotView) {
        EventDispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);

        EventDispatcher.addListener(SlotEvent.REELS_STOPPED, this.onReelsStopped, this);
        EventDispatcher.addListener(LoaderEvent.ALL_FILES_LOADED, this.onFilesLoaded, this);

        this.loadingManager.loadResources("./assets.json");
    }

    private onFilesLoaded(): void {
        this.soundManager.playSound("test",-1);
       // setTimeout(()=> this.soundManager.getSound("test").pause(),1000);
       // setTimeout(()=> this.soundManager.getSound("test").resume(),2000);
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
