
export class MainScene extends PIXI.Container{

    private minWidth:number = 800;
    private minHeight:number = 600;
    
    constructor() {
        super();
        console.log("Main scene inited")

        let graphics:PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(0, 0, this.minWidth, this.minHeight);
        graphics.endFill();

        this.addChild(graphics)
    }
}