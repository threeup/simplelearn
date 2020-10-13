import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Common, CommonState } from "./common"
import { Entity } from "./entity"

export class Hero extends Entity {

    constructor(protected state: GameState, 
        protected common: Common,
        protected root: any,
        protected app: any
    ) {
        super(state, common, root, app);
    }

    
    public commonChanged(num: CommonState): void {

    }


    public add(char: string): void {
        var charValue = this.common.alphaMap.get(char);
        var sprite = PIXI.Sprite.from(charValue);
        sprite.zIndex = -1;
        sprite.scale = new PIXI.Point(0.06, 0.06);
        sprite.x = 750 * Math.random();
        sprite.y = 100+400 * Math.random();
        
        var rootContainer: PIXI.Container = this.root;
        rootContainer.addChild(sprite);
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
    }
}