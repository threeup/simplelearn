import * as PIXI from "pixi.js-legacy";
import { World } from "./world"

export class Game {
    public canvas: any = document.getElementById("main");
    public world: World;
    public app: PIXI.Application;

    public init(): void {
        console.log("inited");
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb,
            view: this.canvas,
            resolution: window.devicePixelRatio || 1
        });
        this.world = new World();
        this.world.init(this.app);
    }
}