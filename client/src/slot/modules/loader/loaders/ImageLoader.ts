import {FileLoader} from "./FileLoader";
import Loader = PIXI.loaders.Loader;
import Resource = PIXI.loaders.Resource;
import {LoaderCache} from "../cache/LoaderCache";
import {get} from "../../utils/locator/locator";


export class ImageLoader extends FileLoader {
    protected loader: Loader;
    private loaderCache: LoaderCache = get(LoaderCache);

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

        this.loader.once("complete", this.imageLoaded, this);
        this.loader.once("error", this.loadErrorHandler, this);
        this.loader.on("progress", this.loadProgressHandler, this);
        this.loader.add(this.id, this._url);
        this.loader.load();
    }

    private imageLoaded(loader: Loader, resources: Resource[]) {

        const texture = resources[this.id].texture;
        this.loaderCache.addTexture(this.id, texture);

        PIXI.Texture.removeFromCache(this._url);

        super.loadCompleteHandler();
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