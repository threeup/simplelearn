import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Common,  } from "./common"
import { Entity } from "./entity"
import { Target } from "./target"
import { Hero } from "./hero"

export class World extends Entity {
    public worldRoot: PIXI.Container;
    public children: Array<Entity>;

    constructor(protected state: GameState, 
        protected common: Common,
        protected root: any,
        protected app: any) {
        super(state, common, root, app);
        
        this.worldRoot = new PIXI.Container();
        this.children = new Array();
        
        const target = new Target(state, common, this.worldRoot, app);
        this.children.push(target);
        const hero = new Hero(state, common, this.worldRoot, app);
        this.children.push(hero);
        
        app.stage.addChild(this.worldRoot);
    }

    public update(delta:number): void {
        for(var item in this.children){
            this.children[item].update(delta);
        }
    }
}