import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Common, CommonState } from "./common"
import { Entity } from "./entity"
import { Lib } from "./lib"

export class Hero extends Entity {

    private progress: number;
    private colorMatrix: PIXI.filters.ColorMatrixFilter;

    constructor(protected state: GameState, 
        protected common: Common,
        protected root: any,
        protected app: any
    ) {
        super(state, common, root, app);
        this.progress = 0;
    }

    
    public commonChanged(num: CommonState): void {

    }


    public add(char: string): void {
        var rootContainer: PIXI.Container = this.root;
        
        this.progress += 1;
        if (this.progress > 10) {
            this.progress = 1;
            this.sprites.forEach(s => rootContainer.removeChild(s))
            this.sprites.splice(0, this.sprites.length);
        }
         var spriteList = Lib.makeWord(char, 90+this.progress*Lib.wordStep, 700, 0xffccaa, this.common)
        
        this.sprites = this.sprites.concat(spriteList);
        this.sprites.forEach(s => rootContainer.addChild(s));
    }

    public update(delta: number): void {
        for(var i=48; i<=57; ++i) {
            var key = String.fromCharCode(i);
            if(this.state.isKeyPressed(key)) {
                this.add(key);
            }

        }
        for(var i=97; i<=122; ++i) {
            var key = String.fromCharCode(i);
            if(this.state.isKeyPressed(key)) {
                this.add(key);
            }
        }
        
        this.sprites.forEach(s => s.y -= 1);
    }
}