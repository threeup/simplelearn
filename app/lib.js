"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lib = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
class Lib {
    static makeHeader(parent, img, tr) {
        var sprite = PIXI.Sprite.from(img);
        sprite.zIndex = -1;
        var child = parent.makeChildWithSprites(entity_1.Entity, [sprite]);
        child.setTransform(tr);
        return sprite;
    }
    static makeWord(parent, word, tr, tint, common) {
        const chars = [...word];
        var xPosition = tr.posX;
        chars.forEach(char => {
            var letterTr = { posX: xPosition, posY: tr.posY, scaleX: tr.scaleX, scaleY: tr.scaleY };
            this.makeLetter(parent, char, letterTr, tint, common);
            xPosition += Lib.wordStep;
        });
        return;
    }
    static makeLetter(parent, char, tr, tint, common) {
        const charValue = common.alphaMap.get(char);
        var child = null;
        if (charValue !== undefined) {
            var sprite = PIXI.Sprite.from(charValue);
            sprite.zIndex = -1;
            sprite.scale = new PIXI.Point(0.10, 0.10);
            sprite.tint = tint;
            child = parent.makeChildWithSprites(entity_1.Entity, [sprite]);
            child.setTransform(tr);
        }
        return child;
    }
    static randRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    static lerp(valA, valB, interval) {
        return (1 - interval) * valA + interval * valB;
    }
}
exports.Lib = Lib;
Lib.wordStep = 50;
//# sourceMappingURL=lib.js.map