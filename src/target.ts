import * as PIXI from "pixi.js-legacy";
import { CommonState } from "./common"
import { Entity, EntityArgs } from "./entity"
import { Lib } from "./lib"
import { Transform } from "./basetypes"

export class Target extends Entity {
    public loader: PIXI.Loader = new PIXI.Loader();

    public targetData: any;
    public elements: any;

    constructor(args: EntityArgs) {
        super(args);
    }

    public commonChanged(num: CommonState): void {
        this.elements = this.common.targetData.elements;
        this.refresh();
    }


    public refresh(): void {
        if (!this.root) {
            return;
        }
        this.killAllChild();
        var idx = Lib.randRange(0, 40);
        var data = this.elements[idx];

        this.sprites.forEach(s => this.root.removeChild(s))
        this.sprites.splice(0, this.sprites.length);

        var headerTr:Transform = { posX:50, posY:50, scaleX:0.2, scaleY:0.2 };
        Lib.makeHeader(this, data.img, headerTr);
        var wordTr:Transform = { posX:160, posY:70, scaleX:0.1, scaleY:0.1};
        Lib.makeWord(this, data.text, wordTr, 0x99ffff, this.common);

        this.common.targetRemaining = data.text;
    }

    public update(delta: number): void {

        if (this.state.isKeyPressed('Enter')) {
            this.refresh();
        }
    }
}