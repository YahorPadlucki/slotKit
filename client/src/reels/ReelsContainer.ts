import Container = PIXI.Container;
import {ReelView} from "./ReelView";

export class ReelsContainer extends Container {


    constructor() {
        super();
        this.addChild(new ReelView());
    }
}