import {Loader} from "./Loader";
import {get} from "../utils/locator/locator";

export class LoadingManager {
    private loader: Loader = get(Loader);


    public loadResources():void {
        // this.loader.addSound("test", "../data/sounds/test.mp3");
        // this.loader.addSound("test2", "../data/sounds/test.mp3");
        // this.loader.addSound("test3", "../data/sounds/test.mp3");
        // this.loader.startLoading();
    }


}