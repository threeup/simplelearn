import * as PIXI from "pixi.js-legacy";
import { Actor } from "./actor"

export class World {
    public root: PIXI.Container;

    public init(app: any): void {
        this.root = new PIXI.Container();
        
        const bunny = new Actor();
        const bunny2 = new Actor();
        bunny.init(this.root);
        bunny2.init(this.root);
        app.stage.addChild(this.root);
    }

    public loop(): void {

    }
}