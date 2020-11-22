"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpritePart = void 0;
const PIXI = require("pixi.js-legacy");
class SpritePart {
    constructor(args) {
        this.sprite = null;
        if (args.filename) {
            this.sprite = PIXI.Sprite.from(args.filename);
            this.sprite.zIndex = -1;
            this.sprite.scale = new PIXI.Point(0.10, 0.10);
        }
        if (args.tint && this.sprite) {
            console.log(this.sprite);
        }
    }
    afterAttach(e) {
        if (this.sprite && e.node.container) {
            e.node.container.addChild(this.sprite);
        }
    }
    beforeDetach(e) {
        if (this.sprite && e.node.container) {
            e.node.container.removeChild(this.sprite);
        }
    }
    setTransform(tr) {
        if (this.sprite) {
            this.sprite.x = tr.posX;
            this.sprite.y = tr.posY;
            this.sprite.scale = new PIXI.Point(tr.scaleX, tr.scaleY);
        }
    }
}
exports.SpritePart = SpritePart;
//# sourceMappingURL=spritepart.js.map