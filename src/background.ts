import { Entity, EntityArgs } from "./entity"
import { SpritePart } from "./spritepart";
import { TextPart } from "./textpart";
import { Transform } from "./basetypes"

export class Background extends Entity {

    public scoreText:TextPart;

    public initialize():void {
        var mountainsprite = new SpritePart({ filename: "assets/mountainview.svg", zIndex:-1 });
        var mountainTform: Transform = { posX: 0, posY: 0, scaleX:0.36, scaleY: 0.312 };
        this.attachPart(mountainsprite);
        mountainsprite.setTransform(mountainTform);



    }

    public onCommonLoaded():void{
        this.scoreText = new TextPart({words:"0", fontSize:64, tint:0xffaaff});
        var textTform: Transform = { posX: 500, posY: 10};
        this.attachPart(this.scoreText);
        this.scoreText.setTransform(textTform);
    }
}