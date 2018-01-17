import {SceneID, SlotView} from "./SlotView";
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
import {SoundManager} from "./modules/sound/SoundManager";
import {SlotConfig} from "./SlotConfig";

export class SlotController {

    private server: IServer = get(ServerEmulator);
    private slotModel: SlotModel = get(SlotModel);
    private rewardsModel: RewardsModel = get(RewardsModel);
    private rewardsManager: RewardsManager = get(RewardsManager);

    private soundManager: SoundManager = get(SoundManager);
    private dispatcher:EventDispatcher = get(EventDispatcher);

    private slotConfig: SlotConfig = get(SlotConfig);



    constructor(private view: SlotView) {
        this.dispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);
        this.dispatcher.addListener(SlotEvent.REELS_STOPPED, this.onReelsStopped, this);

        // this.dispatcher.addListener()//pre-loader
        // this.dispatcher.addListener()//main scene

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

        this.dispatcher.dispatch(SlotEvent.SERVER_SPIN_RESPONSE_RECEIVED);
    }

    onPreloadAssetsLoaded() {
        this.view.addScene(SceneID.LOADING_SCENE);
    }
}
