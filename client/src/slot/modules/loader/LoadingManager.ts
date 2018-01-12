import {Loader} from "./Loader";
import {LoaderEvent, LoadingManagerEvent} from "./events/LoaderEvent";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {get} from "../utils/locator/locator";

export class LoadingManager {
    private initLoader: Loader = new Loader();
    private lazyLoader: Loader = new Loader();

    private dispatcher: EventDispatcher = get(EventDispatcher);

    public loadResources(assetsJsonUrl: string): void {

        this.loadJson(assetsJsonUrl).then((data: AssetsJson) => this.onAssetsJsonLoaded(data));
    }

    public loadJson(url: string) {
        return new Promise((resolve, reject) => {
            fetch(url).then(result => {
                result.json().then(data => resolve(data));
            })
        });
    }

    private onAssetsJsonLoaded(data: AssetsJson): void {

        for (let assetId in data) {
            this.getInitAssets(data[assetId]).forEach(asset => this.initLoader.addAsset(asset));
            this.getLazyAssets(data[assetId]).forEach(asset => this.lazyLoader.addAsset(asset));
        }

        this.initLoader.startLoading();

        this.initLoader.addListener(LoaderEvent.ALL_FILES_LOADED, () => {
            this.dispatcher.dispatch(LoadingManagerEvent.INITIAL_ASSETS_LOADED);
            this.lazyLoader.startLoading();
        });

        this.lazyLoader.addListener(LoaderEvent.ALL_FILES_LOADED, () => this.dispatcher.dispatch(LoadingManagerEvent.LAZY_ASSETS_LOADED));

    }

    private getInitAssets(assets: Asset[]): Asset[] {
        return assets.filter(assets => assets.priority === AssetPriority.INIT);
    }

    private getLazyAssets(assets: Asset[]): Asset[] {
        return assets.filter(assets => assets.priority !== AssetPriority.INIT);
    }

}

interface AssetsJson {
    sounds: Asset[];
    images: Asset[];
}

export const AssetPriority = {
    INIT: "INIT"
};

export interface Asset {
    id: string;
    url: string;
    priority: string;
    type: string;
}

//TODO: as interface?
export const FileType = {
    Sound: "Sound",
    Image: "Image"
};