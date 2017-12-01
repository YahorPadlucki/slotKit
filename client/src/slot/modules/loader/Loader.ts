import {LoadFile} from "./LoadFile";

export class Loader {
    private isLoading: boolean;
    private hasLoaded: boolean;
    private filesList: LoadFile[] = [];

    public startLoading() {
        if (this.isLoading) {
            return;
        }

        this.hasLoaded = false;
        this.isLoading = true;

        // this.updateProgress();

        this.processLoadQueue();
    }

    private processLoadQueue() {

    }

    public addSound(key: string, url: string, autoDecode: boolean = true): void {

        this.addToFileList(key, url, FileType.Sound);
    }

    private addToFileList(key: string, url: string, type: FileType): void {

        const file = new LoadFile(key, url, type);
        this.filesList.push(file);

        this.loadFile(file);
    }

    private loadFile(file: LoadFile) {
        switch (file.type) {
            case FileType.Sound:
                const sound = new Howl({src: [file.url], onload: this.soundLoaded});
                break;

        }
    }

    private soundLoaded(e?) {
        const howl: Howl = this as any;
        howl.play();
        // this.sound.play()
    }
}

export const enum FileType {
    Sound
}

