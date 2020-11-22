import * as PIXI from "pixi.js-legacy";
import { Entity, EntityArgs } from "./entity"
import { SpritePart } from "./spritepart";
import { Transform } from "./basetypes"
import { CommonState } from "./common"

export class World extends Entity {

    constructor(args: EntityArgs) {
        super(args);
    }

    public setup() {
        const nextRoot = new PIXI.Container();

        var worldTr:Transform = { posX:50, posY:50, scaleX:0.2, scaleY:0.2 };
        this.setTransform(worldTr);
    }
    public commonChanged(num:CommonState) {
        const char = "x";
        const charFileName: string = this.common.alphaMap.get(char);
        console.log(charFileName);
        var sprite = new SpritePart({filename:charFileName, tint:0x99ffff});
        this.attachPart(sprite);
    }
}