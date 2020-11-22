"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
const spritepart_1 = require("./spritepart");
class World extends entity_1.Entity {
    constructor(args) {
        super(args);
    }
    setup() {
        const nextRoot = new PIXI.Container();
        var worldTr = { posX: 50, posY: 50, scaleX: 0.2, scaleY: 0.2 };
        this.setTransform(worldTr);
    }
    commonChanged(num) {
        const char = "x";
        const charFileName = this.common.alphaMap.get(char);
        console.log(charFileName);
        var sprite = new spritepart_1.SpritePart({ filename: charFileName, tint: 0x99ffff });
        this.attachPart(sprite);
    }
}
exports.World = World;
//# sourceMappingURL=world.js.map