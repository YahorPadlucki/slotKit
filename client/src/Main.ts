import {EventDispatcher} from "./slot/modules/utils/dispatcher/EventDispatcher";
import {SlotEvent} from "./slot/SlotEvent";
import {SlotView} from "./slot/SlotView";
import {SlotController} from "./slot/SlotController";
import Ticker = PIXI.ticker;
import Point = PIXI.Point;
import {LoadingManager} from "./slot/modules/loader/LoadingManager";
import {get} from "./slot/modules/utils/locator/locator";
import {LoaderEvent} from "./slot/modules/loader/events/LoaderEvent";
import {IServer} from "./slot/modules/server/IServer";
import {ServerEmulator} from "./slot/modules/server/serverEmulator/ServerEmulator";
import {IConfigJson} from "./slot/modules/server/serverEmulator/IConfigJson";

export class Main {

    private renderer: PIXI.SystemRenderer;
    private stage: PIXI.Container;

    private prevTime: number = 0;
    private fps: number = 60;
    private drawInterval: number;

    private slotView: SlotView;
    private slotController: SlotController;

    private server: ServerEmulator = get(ServerEmulator);
    private loadingManager: LoadingManager = get(LoadingManager);


    constructor() {

        const width = this.getWidth();
        const height = this.getHeight();

        this.renderer = PIXI.autoDetectRenderer(width, height);
        document.body.appendChild(this.renderer.view);

        this.drawInterval = 1000 / this.fps;

        this.stage = new PIXI.Container();

        EventDispatcher.addListener(LoaderEvent.ALL_FILES_LOADED, this.onFilesLoaded, this);

        this.loadingManager.loadJson('./emulation.json').then((emulationData: IConfigJson) => {
            this.server.init(emulationData.init, emulationData.spins);
            this.slotController = new SlotController(this.slotView);
            this.slotController.makeInitRequest().then(() => this.onInitResponse())
        });
    }

    private onInitResponse(): void {

        this.loadingManager.loadResources("./assets.json");
    }

    private onFilesLoaded(): void {

        const width = this.getWidth();
        const height = this.getHeight();

        this.slotView = new SlotView();
        this.slotView.pivot = new Point(0.5, 0.5);
        this.slotView.x = width / 2;
        this.slotView.y = height / 2;

        this.stage.addChild(this.slotView);

        this.onResize();

        window.addEventListener("resize", () => this.onResize(), true);

        Ticker.shared.add(this.onTickUpdate, this);


    }

    private onTickUpdate(): void {
        this.renderer.render(this.stage);
        const now = Date.now();

        if (this.prevTime === 0) {
            this.prevTime = now;
        }

        const deltaTime = now - this.prevTime;

        if (deltaTime > this.drawInterval) {
            EventDispatcher.dispatch(SlotEvent.ENTER_FRAME, deltaTime);
            this.prevTime = now;
            // this.prevTime = now - deltaTime % this.drawInterval;
        }
    }

    private onResize() {
        const width = this.getWidth();
        const height = this.getHeight();

        const canvas = this.renderer.view;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        this.renderer.resize(width, height);

        this.slotView.resize(width, height);
        this.slotView.x = width / 2;
        this.slotView.y = height / 2;
    }

    private getWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth);
    }

    private getHeight() {
        return document.documentElement.clientHeight
    }
}

new Main();
