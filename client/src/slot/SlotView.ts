import {ReelsScene} from "./modules/scenes/ReelsScene";
import Point = PIXI.Point;
import Container = PIXI.Container;
import {BaseScene} from "./modules/scenes/BaseScene";
import {PreloaderScene} from "./modules/scenes/loadingScreen/LoadingScene";

export class SlotView extends Container {

    private currentScene: BaseScene;

    constructor(private minWidth: number, private minHeight: number) {
        super();
    }

    public addScene(sceneId: SceneID) {

        if (this.currentScene)
            this.removeChild(this.currentScene);

        switch (sceneId) {
            case SceneID.LOADING_SCENE:
                this.currentScene = this.createLoadingScene();
                break;
            case SceneID.REELS_SCENE:
                this.currentScene = this.createReelsScene();
                break;
        }
        this.currentScene.pivot = new Point(0.5, 0.5);
        this.addChild(this.currentScene);


    }

    private createReelsScene(): BaseScene {
        return new ReelsScene(this.minWidth, this.minHeight);
    }

    private createLoadingScene(): BaseScene {
        return new PreloaderScene(this.minWidth, this.minHeight);
    }


    resize(width: number, height: number) {

        const scale = Math.min(Math.min(width, this.minWidth) / this.minWidth, Math.min(height, this.minHeight) / this.minHeight);
        this.scale.set(scale);

        this.currentScene.onResize();
    }
}

export const enum SceneID {
    REELS_SCENE,
    LOADING_SCENE
}

