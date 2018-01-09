import {Loader} from "./Loader";

export class LoadingManager {

    private priorityLoader: Loader = new Loader();
    private lazyLoader: Loader = new Loader();

    public loadResources(assetsJsonUrl: string): void {

        this.loadJson(assetsJsonUrl).then((data: AssetsJson) => {

            if (data.sounds) {
                data.sounds.forEach(sound => {

                    this.loader.addSound(sound.id, sound.url);
                });
            }

            if (data.images) {
                data.images.forEach(image => {
                    this.loader.addImage(image.id, image.url);
                });
            }

            //TODO: create separate loaders - one for PRIORITY other for lazy


            this.loader.startLoading();

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

export const enum AssetPriority {
    INIT,
    LAZY
}

interface Asset {
    id: string;
    url: string;
    priority: AssetPriority;
}