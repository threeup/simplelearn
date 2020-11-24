"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpritePart = void 0;
const PIXI = require("pixi.js-legacy");
class SpritePart {
    constructor(args) {
        this.sprite = null;
        if (args.filename) {
            this.sprite = PIXI.Sprite.from(args.filename);
            this.sprite.zIndex = args.zIndex;
            this.sprite.scale = new PIXI.Point(0.10, 0.10);
        }
        if (args.tint && this.sprite) {
            this.sprite.tint = args.tint;
        }
    }
    afterAttach(e) {
        if (this.sprite && e.node && e.node.container) {
            e.node.container.addChild(this.sprite);
        }
        else {
            console.log("no node");
        }
    }
    beforeDetach(e) {
        if (this.sprite && e.node && e.node.container) {
            e.node.container.removeChild(this.sprite);
        }
    }
    setTransform(tform) {
        if (this.sprite) {
            this.sprite.x = tform.posX;
            this.sprite.y = tform.posY;
            this.sprite.scale = new PIXI.Point(tform.scaleX, tform.scaleY);
        }
    }
    setTint(tint) {
        if (this.sprite) {
            this.sprite.tint = tint;
        }
    }
}
exports.SpritePart = SpritePart;
//# sourceMappingURL=spritepart.js.map