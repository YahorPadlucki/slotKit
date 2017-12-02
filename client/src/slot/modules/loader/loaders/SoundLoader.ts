import {
    FileLoader
} from "./FileLoader";

export class SoundLoader extends FileLoader {

    private idList: string[];
    private hasLoaded = false;

    private sound: Howl;

    // private soundManager: SoundManager = inject(SoundManager);

    constructor(id: string, url: string) {
        super(url);
        this.idList = [id];
    }

    //TODO:  several ids with same url
    registerId(id: string) {
        this.idList.push(id);
    }

    //TODO:load progress handler

    load() {

        this.sound = new Howl({src: [this._url], onload: this.loadCompleteHandler.bind(this)});

        // for (const id of this.idList) {
        //     createjs.Sound.registerSound(this._url, id);
        // }
    }

    protected loadCompleteHandler(event?) {

        console.log(this.sound);
        // for (const id of this.idList) {
        //     this.soundManager.setSound(id);
        // }

        // this.sound.loop(true);
        // this.sound.play();
        this.hasLoaded = true;
    }

    protected resetLoader() {
        // createjs.Sound.off("fileload", this.loadCompleteHandler);
        // createjs.Sound.off("fileerror", this.loadErrorHandler);
    }
}
