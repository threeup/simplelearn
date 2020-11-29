"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextPart = void 0;
const PIXI = require("pixi.js-legacy");
class TextPart {
    constructor(args) {
        const fname = args.fontName ? args.fontName : "Overpass Mono 64";
        const fsize = args.fontSize ? args.fontSize : 96;
        this.bitmaptext = new PIXI.BitmapText(args.words, { fontName: fname, fontSize: fsize, tint: args.tint });
    }
    afterAttach(e) {
        if (e.node && e.node.container) {
            if (this.bitmaptext) {
                e.node.container.addChild(this.bitmaptext);
            }
            if (this.text) {
                e.node.container.addChild(this.text);
            }
        }
        else {
            console.log("no node");
        }
    }
    beforeDetach(e) {
        if (e.node && e.node.container) {
            if (this.bitmaptext) {
                e.node.container.removeChild(this.bitmaptext);
            }
            if (this.text) {
                e.node.container.removeChild(this.text);
            }
        }
    }
    setTransform(tform) {
        if (this.bitmaptext) {
            this.bitmaptext.position.x = tform.posX;
            this.bitmaptext.position.y = tform.posY;
        }
        if (this.text) {
            this.text.position.x = tform.posX;
            this.text.position.y = tform.posY;
        }
    }
    setTint(tint) {
        if (this.bitmaptext) {
            this.bitmaptext.tint = tint;
        }
        if (this.text) {
            this.text.tint = tint;
        }
    }
}
exports.TextPart = TextPart;
//# sourceMappingURL=textpart.js.map