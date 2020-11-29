"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetWord = void 0;
const entity_1 = require("./entity");
const spritepart_1 = require("./spritepart");
const textpart_1 = require("./textpart");
const transition_1 = require("./transition");
class TargetWord extends entity_1.Entity {
    loadWordData(data) {
        var word = data.text;
        this.killAllChild();
        {
            var header = this.makeChild(entity_1.Entity);
            var sprite = new spritepart_1.SpritePart({ filename: data.img, tint: 0xffffff, zIndex: 0 });
            var startTform = { posX: 20, posY: -50, scaleX: 0.4, scaleY: 0.4 };
            var endTform = { posX: 20, posY: 10, scaleX: 0.4, scaleY: 0.4 };
            var tion = new transition_1.Transition(1.5);
            tion.startTform = startTform;
            tion.endTform = endTform;
            header.addTransition(tion);
            header.attachPart(sprite);
        }
        for (let i = 0; i < word.length; i++) {
            var letter = this.makeChild(entity_1.Entity);
            var tex = new textpart_1.TextPart({ words: word.charAt(i).toUpperCase(), tint: 0xff6600 });
            var coord = this.common.getTargetCoord(i);
            var x = coord[0];
            var y = coord[1];
            var above = y - 130;
            var startTform = { posX: x, posY: above, scaleX: 0.08, scaleY: 0.08 };
            var endTform = { posX: x, posY: y, scaleX: 0.08, scaleY: 0.08 };
            var tion = new transition_1.Transition(1.5);
            tion.startTform = startTform;
            tion.endTform = endTform;
            letter.addTransition(tion);
            letter.attachPart(tex);
        }
        ;
        this.common.setTarget(data.text);
    }
}
exports.TargetWord = TargetWord;
//# sourceMappingURL=targetword.js.map