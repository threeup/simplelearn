import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Common, CommonState } from "./common"
import { Entity } from "./entity"

export class Actor extends Entity {
    public sprite: PIXI.Sprite = PIXI.Sprite.from("assets/bunny.png");

    constructor(protected state: GameState, 
        protected common: Common,
        protected root: any,
        protected app: any
    ) {
        super(state, common, root, app);
        
        var rootContainer: PIXI.Container = root;
        this.sprite.zIndex = -1;
        this.sprite.scale = new PIXI.Point(1.2, 1.2);
        this.sprite.x = 500 * Math.random();
        rootContainer.addChild(this.sprite);
    }

    public loop(): void {

    }
}