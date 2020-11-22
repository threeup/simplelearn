import * as PIXI from "pixi.js-legacy";
import { Transform } from "./basetypes"
import { Entity } from "./entity";


interface SpritePartArguments {
    filename?: string;
    tint?: number;
}
export class SpritePart {

    public sprite: PIXI.Sprite;

    constructor(args: SpritePartArguments) {
        this.sprite = null;
        if (args.filename) {
            this.sprite = PIXI.Sprite.from(args.filename);
            this.sprite.zIndex = -1;
            this.sprite.scale = new PIXI.Point(0.10, 0.10);
        }
        if (args.tint && this.sprite) {
            console.log(this.sprite);
            //this.sprite.tint = args.tint;
        }
    }

    afterAttach(e:Entity) {
        if(this.sprite && e.node.container) {
            e.node.container.addChild(this.sprite);
        }
    }
    beforeDetach(e:Entity) {
        if(this.sprite && e.node.container) {
            e.node.container.removeChild(this.sprite);
        }
    }

    setTransform(tr: Transform) {
        if(this.sprite) {
            this.sprite.x = tr.posX;
            this.sprite.y = tr.posY;
            this.sprite.scale = new PIXI.Point(tr.scaleX, tr.scaleY);
        }
    }
}