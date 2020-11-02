import { CommonState } from "./common"
import { Entity, EntityArgs } from "./entity"
import { Lib } from "./lib"
import { Transition } from "./transition";
import { Transform } from "./basetypes"

export class Hero extends Entity {

    private progress: number;

    constructor(args: EntityArgs) {
        super(args);
        this.progress = 0;
    }
    
    public commonChanged(num: CommonState): void {
    }

    public add(char: string): void {
        if(!this.root) {
            return;
        }
        if(this.common.targetRemaining.length > 0) {
            const nextChar:string = this.common.targetRemaining.charAt(0);
            if(char == nextChar) {
                this.progress += 1;
            }
        }
        
        if(this.childList.length > 25) {
            this.childList[0].die();
        }
        var startX = 90+this.progress*Lib.wordStep;
        
        var letterTr:Transform = { posX:startX, posY:700, scaleX:0.2, scaleY:0.2 };
        var letterEnt = Lib.makeLetter(this, char, letterTr, 0xffccaa, this.common);
        var transition = new Transition(5);
        transition.startPos = {posX:letterEnt.transform.posX, posY:letterEnt.transform.posY, scaleX:null, scaleY:null};
        transition.endPos = {posX:startX-100, posY:0, scaleX:null, scaleY:null};
        transition.setPos = this.setTransform;
        this.updateList.push(transition);

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
        super.update(delta);
    }
}