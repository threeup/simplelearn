import { Entity } from "./entity"
import { SpritePart } from "./spritepart";
import { Transform } from "./basetypes"
import { Transition } from "./transition";

export class TargetWord extends Entity {

    public loadWordData(data: any) {
        var word: string = data.text;
        console.log("load word data", word);

        this.killAllChild();
        {
            var header = this.makeChild(Entity);

            console.log("img ", data.img);
            var sprite = new SpritePart({ filename: data.img, tint: 0x99ffff, zIndex:0 });
            var startTform: Transform = { posX: 20, posY: -50, scaleX: 0.2, scaleY: 0.2 };
            var endTform: Transform = { posX: 20, posY: 50, scaleX: 0.2, scaleY: 0.2 };
            var tion = new Transition(1.5);
            tion.startTform = startTform;
            tion.endTform = endTform;
            header.addTransition(tion);
            header.attachPart(sprite);
        }

        for (let i = 0; i < word.length; i++) {

            const charFileName: string = this.common.alphaMap.get(word.charAt(i));

            var letter = this.makeChild(Entity);
            var sprite = new SpritePart({ filename: charFileName, tint: 0x99ffff, zIndex:-1 });
            var coord = this.common.getTargetCoord(i);
            var x = coord[0];
            var y = coord[1];
            var above = y - 130;
            var startTform: Transform = { posX: x, posY: above, scaleX: 0.08, scaleY: 0.08 };
            var endTform: Transform = { posX: x, posY: y, scaleX: 0.08, scaleY: 0.08 };
            var tion = new Transition(1.5);
            tion.startTform = startTform;
            tion.endTform = endTform;
            letter.addTransition(tion);
            letter.attachPart(sprite);
        };

        this.common.setTarget(data.text);
    }
}