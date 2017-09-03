import {MainScene} from "./scenes/MainScene";
import Ticker = PIXI.ticker;
import Point = PIXI.Point;
import {List} from "./utils/dataStructures/List";
import {EventMap} from "./utils/dispatcher/Event";
import {EventDispatcher} from "./utils/dispatcher/EventDispatcher";
import InteractionMouseEvents = PIXI.interaction.InteractionMouseEvents;
import {Event} from "./Event";

export class Main {

    private renderer: PIXI.SystemRenderer;

    private stage: PIXI.Container;
    private mainScene: MainScene;

    constructor() {

        const width = this.getWidth();
        const height = this.getHeight();

        this.renderer = PIXI.autoDetectRenderer(width, height);
        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();

        this.mainScene = new MainScene();
        this.mainScene.pivot = new Point(0.5, 0.5);
        this.mainScene.x = width / 2;
        this.mainScene.y = height / 2;

        this.stage.addChild(this.mainScene);

        window.addEventListener("resize", () => this.onResize(), true);

        Ticker.shared.add(this.onTickUpdate, this);

        /*  const dispathcer: EventDispatcher = new EventDispatcher();

          dispathcer.addListener("111", this.MyListener, this);
          dispathcer.dispatch("111", "Fisrt Dispatch");
          dispathcer.removeListener("111", this.MyListener, this)
          dispathcer.dispatch("111", "Second Dispath!");*/

    }

    private MyListener(someData: any): void {
        console.log(" Listener " + someData);

    }

    private onTickUpdate(): void {
        this.renderer.render(this.stage);
        EventDispatcher.dispatch(Event.ENTER_FRAME);
    }

    private onResize() {
        const width = this.getWidth();
        const height = this.getHeight();

        const canvas = this.renderer.view;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        this.renderer.resize(width, height);

        this.mainScene.resize(width, height);
        this.mainScene.x = width / 2;
        this.mainScene.y = height / 2;
    }

    private getWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth);
    }

    private getHeight() {
        return document.documentElement.clientHeight
    }
}

new Main();
