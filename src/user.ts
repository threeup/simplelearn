import { Entity } from "./entity"
import { SpritePart } from "./spritepart";
import { Transform } from "./basetypes"
import { Transition } from "./transition";
import { Lib } from "./lib"

export class User extends Entity {

    public onCommonEmpty() {
        this.killAllChild();

        var boysprite = new SpritePart({ filename: "assets/littleboy.svg", zIndex:2 });
        
        var startTform: Transform = { posX: 800, posY: 450, scaleX: 0.15, scaleY: 0.15 };
        var endTform: Transform = { posX: 600, posY: 400, scaleX: 0.15, scaleY: 0.15 };
        var tion = new Transition(1.5);
        tion.startTform = startTform;
        tion.endTform = endTform;
        this.addTransition(tion);
        this.attachPart(boysprite);

        this.attachPart(boysprite);
        boysprite.setTransform(startTform);
    }

    public update(deltaTime: number) {

        if (this.common.targetRemaining != null) {
            const nextChar = this.common.targetRemaining.charAt(0);
            for (var i = 48; i <= 57; ++i) {
                var key = String.fromCharCode(i);
                if (this.state.isKeyPressed(key)) {
                    this.add(key, nextChar);
                }

            }
            for (var i = 97; i <= 122; ++i) {
                var key = String.fromCharCode(i);
                if (this.state.isKeyPressed(key)) {
                    this.add(key, nextChar);
                }
            }
        }
        super.update(deltaTime);
    }

    public add(key: string, nextChar: string) {
        var correct = nextChar == key;
        var coord = this.common.getTargetCoord();
        var x = coord[0];
        var y = coord[1];
        var charSpeed = 100;
        var charTint = 0x00ff33;
        if (correct === false) {
            x += Lib.randRange(-100, 100);
            y = -100;
            charSpeed = 200;
            charTint = 0xf0f722;
        }
        var letter = this.makeChild(Entity);
        const charFileName: string = this.common.alphaMap.get(key);
        var sprite = new SpritePart({ filename: charFileName, tint: charTint, zIndex: 3 });
        var startTform: Transform = { posX: 550, posY: 480, scaleX: 0.2, scaleY: 0.2 };
        var endTform: Transform = { posX: x, posY: y, scaleX: 0.08, scaleY: 0.08 };
        var tion = new Transition(100 / charSpeed);
        tion.startTform = startTform;
        tion.endTform = endTform;
        tion.onDead = () => { this.checkComplete() };
        letter.addTransition(tion);
        letter.attachPart(sprite);
        if (correct) {
            this.common.targetConsume();
        }
    }

    public checkComplete(): void {
        if (this.countTransitions() == 0) {
            this.common.checkComplete();
        }
    }

}