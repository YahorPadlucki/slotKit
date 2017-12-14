import {Loader} from "./Loader";
import {get} from "../utils/locator/locator";

export class LoadingManager {
    private loader: Loader = get(Loader);


    public loadResources(assetsJsonUrl: string): void {

        this.loadJson(assetsJsonUrl).then((data: AssetsJson) => {

            data.sounds.forEach(sound => {
                this.loader.addSound(sound.id, sound.url);
            });

            this.loader.startLoading();

        });

        // this.loader.addSound("test", "../data/sounds/test.mp3");
        // this.loader.addSound("test2", "../data/sounds/test.mp3");
        // this.loader.addSound("test3", "../data/sounds/test.mp3");
        //
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
}

interface Asset {
    id: string;
    url: string;
}