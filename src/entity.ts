import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Common, CommonState, IObserver } from "./common"

export class Entity implements IObserver {
    public sprites: PIXI.Sprite[];

    constructor(protected state: GameState, 
        protected common: Common,
        protected root: any,
        protected app: any) {
        this.sprites = [];
        common.observe(this);

    }

    public commonChanged(num: CommonState): void {

    }

    public update(delta: number): void {

    }
}