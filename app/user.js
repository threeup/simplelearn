"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_1 = require("./entity");
const spritepart_1 = require("./spritepart");
const transition_1 = require("./transition");
const lib_1 = require("./lib");
class User extends entity_1.Entity {
    onCommonEmpty() {
        this.killAllChild();
        const char = "o";
        const charFileName = this.common.alphaMap.get(char);
        console.log(charFileName);
        var sprite = new spritepart_1.SpritePart({ filename: charFileName, tint: 0x99ffff, zIndex: 2 });
        var startTform = { posX: 350, posY: 650, scaleX: 0.2, scaleY: 0.2 };
        var endTform = { posX: 350, posY: 400, scaleX: 0.2, scaleY: 0.2 };
        var tion = new transition_1.Transition(1.5);
        tion.startTform = startTform;
        tion.endTform = endTform;
        this.addTransition(tion);
        this.attachPart(sprite);
    }
    update(deltaTime) {
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
    add(key, nextChar) {
        var correct = nextChar == key;
        var coord = this.common.getTargetCoord();
        var x = coord[0];
        var y = coord[1];
        var charSpeed = 100;
        var charTint = 0x00ff33;
        if (correct === false) {
            x += lib_1.Lib.randRange(-100, 100);
            y = -100;
            charSpeed = 200;
            charTint = 0xff4444;
        }
        var letter = this.makeChild(entity_1.Entity);
        const charFileName = this.common.alphaMap.get(key);
        var sprite = new spritepart_1.SpritePart({ filename: charFileName, tint: charTint, zIndex: 2 });
        var startTform = { posX: 350, posY: 480, scaleX: 0.2, scaleY: 0.2 };
        var endTform = { posX: x, posY: y, scaleX: 0.08, scaleY: 0.08 };
        var tion = new transition_1.Transition(100 / charSpeed);
        tion.startTform = startTform;
        tion.endTform = endTform;
        tion.onDead = () => { this.checkComplete(); };
        letter.addTransition(tion);
        letter.attachPart(sprite);
        if (correct) {
            this.common.targetConsume();
        }
    }
    checkComplete() {
        if (this.countTransitions() == 0) {
            this.common.checkComplete();
        }
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map