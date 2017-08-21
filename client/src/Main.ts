import {MainScene} from "./scenes/MainScene";
import Ticker = PIXI.ticker;
import Point = PIXI.Point;

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

    }

    private onTickUpdate(): void {
        this.renderer.render(this.stage);
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
