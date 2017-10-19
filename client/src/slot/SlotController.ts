import {SlotView} from "./SlotView";
import {EventDispatcher} from "./modules/utils/dispatcher/EventDispatcher";
import {SlotEvent} from "./SlotEvent";
import {IServer} from "./modules/server/IServer";
import {ServerEmulator} from "./modules/server/serverEmulator/ServerEmulator";
import {IServerResponse} from "./modules/server/interfaces/IServerResponse";
import {SlotModel, SlotState} from "./SlotModel";
import {get} from "./modules/utils/locator/locator";

export class SlotController {

    private server: IServer = new ServerEmulator();
    private slotModel: SlotModel = get(SlotModel);

    constructor(private view: SlotView) {
        EventDispatcher.addListener(SlotEvent.SPIN_CLICK, this.onSpinClicked, this);
    }

    onSpinClicked(): void {
        this.slotModel.state = SlotState.Spin;
        this.server.spinRequest().then((serverResponse: IServerResponse) => this.handleServerResponce(serverResponse));

    }

    private handleServerResponce(serverResponse: IServerResponse) {
        this.slotModel.parseServerResponce(serverResponse);

        EventDispatcher.dispatch(SlotEvent.SERVER_RESPONSE_RECEIVED);
    }
}
