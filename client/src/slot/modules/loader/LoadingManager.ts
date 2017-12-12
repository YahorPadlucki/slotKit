import {Loader} from "./Loader";
import {get} from "../utils/locator/locator";

export class LoadingManager {
    private loader: Loader = get(Loader);


    public loadResources(assetsJsonUrl:string): void {

        this.loadJson(assetsJsonUrl).then((data)=>{
            console.log(data);
        })
        // this.loader.addSound("test", "../data/sounds/test.mp3");
        // this.loader.addSound("test2", "../data/sounds/test.mp3");
        // this.loader.addSound("test3", "../data/sounds/test.mp3");
        // this.loader.startLoading();
    }

    public loadJson(url: string) {
        return new Promise((resolve, reject) => {
            fetch(url).then(result => {
                result.json().then(data => resolve(data));
            })
        });
    }


}