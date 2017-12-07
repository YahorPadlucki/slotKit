import {EventDispatcher} from "../../utils/dispatcher/EventDispatcher";
import {LoaderEvent} from "../events/LoaderEvent";

export class FileLoader {
    protected _name: string;
    protected _url: string;

    protected _loadProgress: number;
    protected _isLoaded: boolean = false;

    constructor(url: string) {
        this._url = url;
        this._name = this._url.match(/([^\\/]+)\.\w+$/)[1];
    }


    get url(): string {
        return this._url;
    }

    get name(): string {
        return this._name;
    }

    get loadProgress(): number {
        return this._loadProgress;
    }

    get isLoaded(): boolean {
        return this._isLoaded;
    }

    load(): void {
    }

    protected loadProgressHandler(event: any): void {
    }

    protected loadCompleteHandler(data?: any): void {
        EventDispatcher.dispatch(LoaderEvent.FILE_LOADED);
    }


}

