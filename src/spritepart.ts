import * as PIXI from "pixi.js-legacy";
import { Transform } from "./basetypes"
import { Entity } from "./entity";


interface SpritePartArguments {
    filename?: string;
    tint?: number;
    zIndex: number;
}
export class SpritePart {

    public sprite: PIXI.Sprite;

    constructor(args: SpritePartArguments) {
        
        this.sprite = null;
        if (args.filename) {
            this.sprite = PIXI.Sprite.from(args.filename);
            this.sprite.zIndex = args.zIndex;
            this.sprite.scale = new PIXI.Point(0.10, 0.10);
        }
        if (args.tint && this.sprite) {
            this.sprite.tint = args.tint;
        }
    }

    afterAttach(e:Entity) {
        if(this.sprite && e.node && e.node.container) {
            e.node.container.addChild(this.sprite);
        } else {
            console.log("no node");
        }
    }
    beforeDetach(e:Entity) {
        if(this.sprite && e.node && e.node.container) {
            e.node.container.removeChild(this.sprite);
        }
    }

    setTransform(tform: Transform) {
        if(this.sprite) {
            this.sprite.x = tform.posX;
            this.sprite.y = tform.posY;
            this.sprite.scale = new PIXI.Point(tform.scaleX, tform.scaleY);
        }
    }
    
    setTint(tint:number) {
        if(this.sprite) {
            this.sprite.tint = tint;
        }
    }
}