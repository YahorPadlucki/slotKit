import {EventMap} from "./Event";
import {List} from "../dataStructures/List";

export class EventDispatcher {

    private eventMaps: List<EventMap> = new List<EventMap>();

    addListener(event: string, listener: EventListener, scope?: Object) {
        //TODO: if no scope passed?
        const eventMap = new EventMap(event, listener, scope);
        if (!this.eventMaps.has(eventMap)) {
            this.eventMaps.add(eventMap);
        }
    }

    removeListener(event: string, listener: EventListener, scope?: Object) {
        //todo: remove by filter
    }


    dispatch(event: string, data?: any) {

    }
}