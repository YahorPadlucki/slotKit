import {FileLoader} from "./FileLoader";


export class ImageLoader extends FileLoader {
    protected loader: any;

    constructor(private id: string, url: string,) {
        super(url);
    }


    load(): void {
        if (this.inProgress || this.isLoaded) {
            return;
        }
        this._isLoaded = false;
        // this._loadError = undefined;
        // this._loadProgress = undefined;
        this.loader = new PIXI.loaders.Loader();

        this.loader.once("complete", this.loadCompleteHandler, this);
        this.loader.once("error", this.loadErrorHandler, this);
        this.loader.on("progress", this.loadProgressHandler, this);
        this.loader.add(this.id, this._url);
        this.loader.load();
    }

    protected resetLoader() {
        this.loader.removeAllListeners("complete");
        this.loader.removeAllListeners("error");
        this.loader.removeAllListeners("progress");
        this.loader.reset();
    }

    protected loadProgressHandler(event) {
        super.loadProgressHandler({loaded: event.progress / 100});
    }
}