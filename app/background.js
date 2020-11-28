"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const entity_1 = require("./entity");
const spritepart_1 = require("./spritepart");
class Background extends entity_1.Entity {
    initialize() {
        var mountainsprite = new spritepart_1.SpritePart({ filename: "assets/mountainview.svg", zIndex: -1 });
        var startTform = { posX: 0, posY: 0, scaleX: 0.36, scaleY: 0.305 };
        this.attachPart(mountainsprite);
        mountainsprite.setTransform(startTform);
    }
}
exports.Background = Background;
//# sourceMappingURL=background.js.map