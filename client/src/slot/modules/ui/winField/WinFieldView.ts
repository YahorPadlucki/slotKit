import Container = PIXI.Container;
import Text = PIXI.Text;

export class WinFieldView extends Container {
    private text: Text;


    constructor() {
        super();

        this.text = new Text("00.00");
        this.text.x -= this.text.width / 2;
        this.text.y -= this.text.height / 2;
        this.addChild(this.text);
    }

    public showTotalWin(totalWin: number) {
        this.text.text = totalWin.toString();
    }
}
