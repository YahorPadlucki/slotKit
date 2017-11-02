import {SlotView} from "./SlotView";
import {EventDispatcher} from "./modules/utils/dispatcher/EventDispatcher";
import {SlotEvent} from "./SlotEvent";
import {IServer} from "./modules/server/IServer";
import {ServerEmulator} from "./modules/server/serverEmulator/ServerEmulator";
import {SlotModel, SlotState} from "./SlotModel";
import {get} from "./modules/utils/locator/locator";
import {ISpinResponse} from "./modules/server/interfaces/ISpinResponse";
import {IInitResponse} from "./modules/server/interfaces/IInitResponse";

export class SlotController {

    private server: IServer = new ServerEmulator();
    private slotModel: SlotModel = get(SlotModel);

    constructor(private view: SlotView) {
        EventDispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);
    }

    onSpinClicked(): void {
        this.slotModel.state = SlotState.Spin;
        this.server.spinRequest().then((serverResponse: ISpinResponse) => this.handleServerSpinResponse(serverResponse));

    }

    makeInitRequest(): Promise<any> {
        return this.server.initRequest().then((initResponse: IInitResponse) => {
            this.slotModel.parseServerInitResponse(initResponse);
            return Promise.resolve();
        })
    }

    private handleServerSpinResponse(serverResponse: ISpinResponse) {
        this.slotModel.parseServerSpinResponse(serverResponse);

        EventDispatcher.dispatch(SlotEvent.SERVER_SPIN_RESPONSE_RECEIVED);
    }
}
