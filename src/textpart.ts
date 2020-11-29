import * as PIXI from "pixi.js-legacy";
import { Transform } from "./basetypes"
import { Entity } from "./entity";


interface BitmapTextArguments {
    words: string;
    fontName?: string;
    fontSize?: number;
    tint?: number;
}

export class TextPart {

    public bitmaptext: PIXI.BitmapText;
    public text: PIXI.Text;

    constructor(args: BitmapTextArguments) {
        const fname:string = args.fontName ? args.fontName : "Overpass Mono 64";
        const fsize:number = args.fontSize ? args.fontSize : 96;
        this.bitmaptext = new PIXI.BitmapText(args.words,
            { fontName: fname, fontSize: fsize, tint: args.tint });
    }

    afterAttach(e: Entity) {
        if (e.node && e.node.container) {
            if(this.bitmaptext) {
                e.node.container.addChild(this.bitmaptext);
            }
            if(this.text) {
                e.node.container.addChild(this.text);
            }
        } else {
            console.log("no node");
        }
    }
    beforeDetach(e: Entity) {
        if (e.node && e.node.container) {
            if(this.bitmaptext) {
                e.node.container.removeChild(this.bitmaptext);
            }
            if(this.text) {
                e.node.container.removeChild(this.text);
            }
        }
    }

    setTransform(tform: Transform) {
        if (this.bitmaptext) {
            this.bitmaptext.position.x = tform.posX;
            this.bitmaptext.position.y = tform.posY;
        }
        
        if (this.text) {
            this.text.position.x = tform.posX;
            this.text.position.y = tform.posY;
        }
    }

    setTint(tint: number) {
        if (this.bitmaptext) {
            this.bitmaptext.tint = tint;
        }
        if (this.text) {
            this.text.tint = tint;
        }
    }

}