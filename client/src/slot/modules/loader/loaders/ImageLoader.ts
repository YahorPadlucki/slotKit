import {FileLoader} from "./FileLoader";

import TextureCache = PIXI.utils.TextureCache;


export class ImageLoader extends FileLoader{
    protected loader: any;

    constructor(url: string, private id: string) {
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

    protected loadCompleteHandler() {
        super.loadCompleteHandler();

        const texture = TextureCache[this.id];// Texture provider

        // PIXI.Texture.removeFromCache(this.url); // remove redundant texture with (ID === path)
    }

    protected loadProgressHandler(event) {
        super.loadProgressHandler({loaded: event.progress / 100});
    }
}