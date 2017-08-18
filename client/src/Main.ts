export class Main {

    private renderer:PIXI.SystemRenderer;
    constructor() {
        this.renderer = PIXI.autoDetectRenderer(256, 256);
        document.body.appendChild(this.renderer.view);
        var stage = new PIXI.Container();
        this.renderer.render(stage);
        // new MainScene();

        window.addEventListener("resize", () => this.onResize(), true);

    }

    private onResize() {
        var width = this.getWidth();
        var height = this.getHeight();

        const canvas = this.renderer.view;
        // canvas.width = width;
        // canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        this.renderer.resize(width, height);
    }

    private getWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth);
    }

    private getHeight() {
        return document.documentElement.clientHeight
    }
}

new Main();
