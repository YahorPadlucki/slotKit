import {FileLoader} from "./loaders/FileLoader";
import {SoundLoader} from "./loaders/SoundLoader";
import {EventDispatcher} from "../utils/dispatcher/EventDispatcher";
import {LoaderEvent} from "./events/LoaderEvent";

export class Loader {

    private isLoading: boolean;
    private hasLoaded: boolean;

    private loadingQueue: FileLoader[] = [];

    private currenFileInProgress: FileLoader;

    public startLoading(): void {
        if (this.isLoading) {
            return;
        }

        this.hasLoaded = false;
        this.isLoading = true;

        // this.updateProgress();

        this.loadNexFileInQueue();
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

    //TODO: load one by one, try load all together
    private loadNexFileInQueue(): void {
        if (this.loadingQueue.length ) {
            this.currenFileInProgress = this.loadingQueue.shift();
            EventDispatcher.addListener(LoaderEvent.FILE_LOADED, this.onFileLoaded, this);
            this.currenFileInProgress.load();
        }
    }

    private onFileLoaded(url: string): void {
        EventDispatcher.removeListener(LoaderEvent.FILE_LOADED, this.onFileLoaded, this);

        if (!this.loadingQueue.length) {
            this.completeLoading();
        } else {
            this.loadNexFileInQueue();
        }


    }

    private completeLoading(): void {
        this.isLoading = false;
        this.hasLoaded = true;

        EventDispatcher.dispatch(LoaderEvent.ALL_FILES_LOADED);
    }

}

export const enum FileType {
    Sound
}

