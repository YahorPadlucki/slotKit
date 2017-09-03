import {EventMap} from "./Event";
import {List} from "../dataStructures/List";

export class EventDispatcher {

    private static eventMaps: List<EventMap> = new List<EventMap>();

    public static addListener(event: string, listener: EventListener, scope?: Object) {
        //TODO: if no scope passed?
        const eventMap = new EventMap(event, listener, scope);
        if (!this.eventMaps.has(eventMap)) {
            this.eventMaps.add(eventMap);
        }
    }

    public static removeListener(event: string, listener: EventListener, scope?: Object) {
        this.eventMaps.removeByFilter({event: event, listener: listener, scope: scope});
    }


    public static dispatch(event: string, data?: any) {
        this.eventMaps.getByFilter({event: event}).forEach((eventMap) => {
            eventMap.eventListener.call(eventMap.scope, data);
        })
    }
}