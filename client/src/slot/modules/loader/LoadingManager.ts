import {Loader} from "./Loader";
import {LoaderEvent, LoadingManagerEvent} from "./events/LoaderEvent";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {get} from "../utils/locator/locator";

export class LoadingManager {

    private priorityLoader: Loader = new Loader();
    private lazyLoader: Loader = new Loader();

    private dispatcher: EventDispatcher = get(EventDispatcher);

    public loadResources(assetsJsonUrl: string): void {

        this.loadJson(assetsJsonUrl).then((data: AssetsJson) => {

            if (data.sounds) {
                data.sounds.forEach(sound => {

                   // TODO:REFACTOR loading priority

                    if (sound.priority === AssetPriority.INIT) {
                        this.priorityLoader.addSound(sound.id, sound.url);
                    } else {
                        this.lazyLoader.addSound(sound.id, sound.url);
                    }

                });
            }

            if (data.images) {
                data.images.forEach(image => {
                    this.priorityLoader.addImage(image.id, image.url);
                });
            }


            this.priorityLoader.startLoading();

            this.priorityLoader.addListener(LoaderEvent.ALL_FILES_LOADED, () => {
                this.dispatcher.dispatch(LoadingManagerEvent.INITIAL_ASSETS_LOADED);
                this.lazyLoader.startLoading();
            });

            this.lazyLoader.addListener(LoaderEvent.ALL_FILES_LOADED, () => this.dispatcher.dispatch(LoadingManagerEvent.LAZY_ASSETS_LOADED));

        });
    }

    public loadJson(url: string) {
        return new Promise((resolve, reject) => {
            fetch(url).then(result => {
                result.json().then(data => resolve(data));
            })
        });
    }


}

interface AssetsJson {
    sounds: Asset[];
    images: Asset[];
}

export const AssetPriority = {
    INIT: "INIT"
};

interface Asset {
    id: string;
    url: string;
    priority: string;
}