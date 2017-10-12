import Container = PIXI.Container;

export class Button extends Container {
    public enable(): void {
        this.interactive = true;
        this.buttonMode = true;
    }

    public disable(): void {
        this.interactive = false;
        this.buttonMode = false;
    }
}