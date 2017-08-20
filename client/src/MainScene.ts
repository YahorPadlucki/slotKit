
export class MainScene extends PIXI.Container{

    private minWidth:number = 800;
    private minHeight:number = 600;

    private tempGraphics:PIXI.Graphics;

    constructor(private screenWidth, private screenHeight) {
        super();
        console.log("Main scene inited");

        this.tempGraphics = new PIXI.Graphics();
        this.tempGraphics.beginFill(0xFFFF00);
        this.tempGraphics.drawRect(-this.minWidth/2, -this.minHeight/2, this.minWidth, this.minHeight);
        this.tempGraphics.endFill();

        this.tempGraphics.x = screenWidth/2;
        this.tempGraphics.y = screenHeight/2;

        this.addChild(this.tempGraphics);


    }

    resize(width:number, height:number) {
        
    }
}