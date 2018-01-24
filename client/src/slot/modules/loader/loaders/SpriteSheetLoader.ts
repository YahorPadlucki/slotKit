import {FileLoader} from "./FileLoader";
import {ImageLoader} from "./ImageLoader";
import {LoaderEvent} from "../events/LoaderEvent";

export class SpriteSheetLoader extends FileLoader {
    private loader: ImageLoader;

    constructor(url: string, private id: string, ) {
        super(url);
    }

    load(): void {
        if (this.inProgress || this.isLoaded) {
            return;
        }
        this._isLoaded = false;
        this.loader = new ImageLoader(this._url, this.id);
        this.loader.addListener(LoaderEvent.FILE_LOADED, this.loadCompleteHandler,this);

        this.loader.load();
    }

}