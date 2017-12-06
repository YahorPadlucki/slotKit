import {FileLoader} from "./loaders/FileLoader";
import {SoundLoader} from "./loaders/SoundLoader";

export class Loader {
    private isLoading: boolean;
    private hasLoaded: boolean;
    private loadingQueue: FileLoader[] = [];

    public startLoading() {
        if (this.isLoading) {
            return;
        }

        this.hasLoaded = false;
        this.isLoading = true;

        // this.updateProgress();

        this.processLoadQueue();
    }

    public addSound(id: string, url: string, autoDecode: boolean = true): void {

        this.addToLoadingQueue(id, url, FileType.Sound);
    }

    private addToLoadingQueue(id: string, url: string, type: FileType): void {

        switch (type) {
            case FileType.Sound:
                this.loadingQueue.push(new SoundLoader(id, url));
                break;
        }
    }

    //TODO:loading one by one?
    //load one by one, try load all together
    public loadFiles() {
        this.loadingQueue[0].load();
    }

}

export const enum FileType {
    Sound
}

