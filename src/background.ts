import { Entity, EntityArgs } from "./entity"
import { SpritePart } from "./spritepart";
import { Transform } from "./basetypes"

export class Background extends Entity {

    public initialize():void {
        var mountainsprite = new SpritePart({ filename: "assets/mountainview.svg", zIndex:-1 });
        var startTform: Transform = { posX: 0, posY: 0, scaleX:0.36, scaleY: 0.305 };
        this.attachPart(mountainsprite);
        mountainsprite.setTransform(startTform);
    }

}