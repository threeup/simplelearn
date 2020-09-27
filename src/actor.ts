import * as PIXI from "pixi.js-legacy";

export class Actor {
    public sprite: PIXI.Sprite = PIXI.Sprite.from("assets/bunny.png");

    public init(root: PIXI.Container): void {
        this.sprite.zIndex = -1;
        this.sprite.scale = new PIXI.Point(1.2, 1.2);
        this.sprite.x = 500*Math.random();

        root.addChild(this.sprite);
    }

    public loop(): void {

    }
}