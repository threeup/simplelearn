import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Entity } from "./entity"
import { Actor } from "./actor"
import { Target } from "./target"

export class World extends Entity {
    public worldRoot: PIXI.Container;
    public children: Array<Entity>;

    constructor(protected state: GameState, 
        protected root: any,
        protected app: any) {
        super(state, root, app);
        
        this.worldRoot = new PIXI.Container();
        this.children = new Array();
        
        const bunny = new Actor(state, this.worldRoot, app);
        this.children.push(bunny);
        const bunny2 = new Actor(state, this.worldRoot, app);
        this.children.push(bunny2);

        const target = new Target(state, this.worldRoot, app);
        this.children.push(target);
        

        app.stage.addChild(this.worldRoot);
    }

    public update(delta:number): void {
        for(var item in this.children){
            this.children[item].update(delta);
        }

    }
}