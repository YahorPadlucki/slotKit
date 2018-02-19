import {EventDispatcher} from "./dispatcher/EventDispatcher";
import {get} from "./locator/locator";
import {KeyBoardEvent} from "../../SlotEvent";

export class KeyboardManager {

    private dispatcher: EventDispatcher = get(EventDispatcher);

    constructor() {
        addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    private onKeyDown(e: KeyboardEvent) {

        if (e.keyCode === 32) {
            this.dispatcher.dispatch(KeyBoardEvent.SPACE_DOWN);
            console.log("KeyboardEventManage | onKeyboardEvent __ KeyboardEvent.SPACEBAR");
        }
    }

    private onKeyUp(e: KeyboardEvent) {

        if (e.keyCode === 32) {
            this.dispatcher.dispatch(KeyBoardEvent.SPACE_UP);
            console.log("====== key up")
        }
    }
}