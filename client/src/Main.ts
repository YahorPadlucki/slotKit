import {MainScene} from "./MainScene";
export class Main {

    private renderer:PIXI.SystemRenderer;
    private mainScene:MainScene;
    
    constructor() {

        const width = this.getWidth();
        const height = this.getHeight();

        this.renderer = PIXI.autoDetectRenderer(width,height);
        document.body.appendChild(this.renderer.view);
        var stage = new PIXI.Container();
        this.mainScene = new MainScene(width,height);
        
        stage.addChild(this.mainScene);

        window.addEventListener("resize", () => this.onResize(), true);
        this.renderer.render(stage);

    }

    private onResize() {
        const width = this.getWidth();
        const height = this.getHeight();

        const canvas = this.renderer.view;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        this.renderer.resize(width, height);
        
        this.mainScene.resize(width,height);
    }

    private getWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth);
    }

    private getHeight() {
        return document.documentElement.clientHeight
    }
}

new Main();
