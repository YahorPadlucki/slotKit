import Container = PIXI.Container;
import Graphics = PIXI.Graphics;

export class LoadingBar extends Container {

    private barWidth: number = 100;
    private barHeight: number = 20;

    private bar: Graphics;

    constructor() {
        super();
        this.bar = new PIXI.Graphics();
        this.bar.beginFill(0xFF65cc);
        this.bar.drawRect(-this.barWidth / 2, -this.barHeight / 2, this.barWidth, this.barHeight);
        this.bar.endFill();
        this.addChild(this.bar);
    }

    public showProgress(loadedPercent: number) {
        this.bar.width = this.barWidth/(100/loadedPercent);
    }
}