"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const entity_1 = require("./entity");
const spritepart_1 = require("./spritepart");
const textpart_1 = require("./textpart");
class Background extends entity_1.Entity {
    initialize() {
        var mountainsprite = new spritepart_1.SpritePart({ filename: "assets/mountainview.svg", zIndex: -1 });
        var mountainTform = { posX: 0, posY: 0, scaleX: 0.36, scaleY: 0.312 };
        this.attachPart(mountainsprite);
        mountainsprite.setTransform(mountainTform);
    }
    onCommonLoaded() {
        var funtext = new textpart_1.TextPart({ words: "Im fun!", fontSize: 64, tint: 0xffaaff });
        var textTform = { posX: 500, posY: 10 };
        this.attachPart(funtext);
        funtext.setTransform(textTform);
    }
}
exports.Background = Background;
//# sourceMappingURL=background.js.map