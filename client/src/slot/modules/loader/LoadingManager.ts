import {Loader} from "./Loader";
import {get} from "../utils/locator/locator";

export class LoadingManager {
    private loader: Loader = get(Loader);


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

interface Asset {
    id: string;
    url: string;
}