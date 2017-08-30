import {Event} from "./Event";

export class EventDispatcher {

    private events: { [event: string]: Event };

    addListener(event: string, listener: EventListener, scope?: Object) {

    }

    removeListener(event: string, listener: EventListener, scope?: Object) {

    }

    dispatch(event: string, data?: any) {

    }
}