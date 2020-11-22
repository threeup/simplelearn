import * as PIXI from "pixi.js-legacy";
import { Entity, EntityArgs } from "./entity"
import { SpritePart } from "./spritepart";
import { Transform } from "./basetypes"
import { Lib } from "./lib"

export class World extends Entity {

    public elements: any;

    constructor(args: EntityArgs) {
        super(args);
    }

    public setup() {
        const nextRoot = new PIXI.Container();

        var worldTr:Transform = { posX:50, posY:50, scaleX:0.2, scaleY:0.2 };
        this.setTransform(worldTr);
    }

    public onCommonLoaded() {
        this.elements = this.common.targetData.elements;
        this.refresh();
    }

    public refresh() {
        this.killAllChild();
        
        var idx = Lib.randRange(0, 40);
        var data = this.elements[idx];


        var headerTr:Transform = { posX:50, posY:50, scaleX:0.2, scaleY:0.2 };
        var wordTr:Transform = { posX:160, posY:70, scaleX:0.1, scaleY:0.1};

        //Lib.makeHeader(this, data.img, headerTr);
        //Lib.makeWord(this, data.text, wordTr, 0x99ffff, this.common);

        this.common.targetRemaining = data.text;

        const char = "x";
        const charFileName: string = this.common.alphaMap.get(char);
        console.log(charFileName);
        var sprite = new SpritePart({filename:charFileName, tint:0x99ffff});
        this.attachPart(sprite);
    }
}