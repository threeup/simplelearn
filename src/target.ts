import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Common, CommonState } from "./common"
import { Entity } from "./entity"
import { Lib } from "./lib"

export class Target extends Entity {
    public loader: PIXI.Loader = new PIXI.Loader();
    
    public targetData: any;
    public elements: any;

    constructor(protected state: GameState, 
        protected common: Common,
        protected root: any,
        protected app: any) {
        super(state, common, root, app);

    }

    public commonChanged(num: CommonState): void {
        this.elements = this.common.targetData.elements;

        this.refresh();
    }

    public randRange(min: number, max: number): number {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }

    public refresh(): void {
        var idx = this.randRange(0, 40);
        var data = this.elements[idx];
        
        var rootContainer: PIXI.Container = this.root;
        this.sprites.forEach(s => rootContainer.removeChild(s))
        this.sprites.splice(0, this.sprites.length);

        this.sprites.push(Lib.makeHeader(data.img,50,50));
        var spriteList = Lib.makeWord(data.text, 160, 70, 0x99ffff, this.common);
        this.sprites = this.sprites.concat(spriteList);
        this.sprites.forEach(s => rootContainer.addChild(s));
    }

    public update(delta: number): void {
        if(this.state.isKeyPressed('Enter')) {
            this.refresh();
        }
    }
}