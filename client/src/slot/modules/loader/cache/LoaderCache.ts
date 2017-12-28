import Texture = PIXI.Texture;

export class LoaderCache {

    private imageCache: Map<string, Texture> = new Map();

    public addTexture(id: string, texture: Texture) {

        if (!this.imageCache.has(id)) {
            this.imageCache.set(id, texture);
        }
    }

    public getTexture(id: string): Texture {
        return this.imageCache.get(id);
    }
}