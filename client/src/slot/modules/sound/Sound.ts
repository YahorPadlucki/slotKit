export class Sound {
    private instance: Howl;


    constructor(instance: Howl) {
        this.instance = instance;
    }

    public play(): void {
        this.instance.play();
    }

    public isPlaying(): boolean {
        return this.instance.playing();
    }

    public get loaded(): boolean {
        return this.instance.state() === "loaded";
    }
}