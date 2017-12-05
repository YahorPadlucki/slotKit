export class Sound {
    private instance: Howl;

    protected _volume: number = 1;// TODO: check on init



    constructor(instance: Howl) {
        this.instance = instance;
    }

    public play(loop): void {
        if (loop != 0) {
            if (loop > 0) {
                this.instance.loop(true, loop);
            } else {
                this.instance.loop(true);
            }

        }
        this.instance.play();
    }

    public stop(): void {
        this.instance.stop();
    }

    public isPlaying(): boolean {
        return this.instance.playing();
    }

    public get loaded(): boolean {
        return this.instance.state() === "loaded";
    }

    get volume(): number {
        return this.instance.volume();
    }

    set volume(value: number) {
        this.instance.volume(value);
    }

    public mute(): void {
        this.instance.mute(true);
    }

    public unMute(): void {
        this.instance.mute(false);
    }


}