import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Common, CommonState } from "./common"
import { Entity } from "./entity"

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
        var rootContainer: PIXI.Container = this.root;
        this.elements = this.common.targetData.elements;

        var data = this.elements[1];
        let headerSprite = PIXI.Sprite.from(data.img);
        headerSprite.zIndex = -1;
        headerSprite.scale = new PIXI.Point(0.2, 0.2);
        headerSprite.x = 50;
        headerSprite.y = 50;
        this.sprites.push(headerSprite);
        console.log(data.text);
        /*for(var i=0; i<20; ++i) {
            
        }*/
        
        this.sprites.forEach(s => rootContainer.addChild(s))
    }

    public randRange(min: number, max: number): number {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }

    public refresh(): void {
        var idx = this.randRange(0, 40);
        var data = this.elements[idx];
        
        this.sprites[0].texture = PIXI.Texture.from(data.img);
    }

    public update(delta: number): void {
        if(this.state.isKeyPressed('Enter')) {
            this.refresh();
        }
    }
}