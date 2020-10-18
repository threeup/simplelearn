"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lib = void 0;
const PIXI = require("pixi.js-legacy");
class Lib {
    static makeHeader(img, startX, startY) {
        var headerSprite = PIXI.Sprite.from(img);
        headerSprite.zIndex = -1;
        headerSprite.scale = new PIXI.Point(0.2, 0.2);
        headerSprite.x = startX;
        headerSprite.y = startY;
        return headerSprite;
    }
    static makeWord(word, startX, startY, tint, common) {
        const chars = [...word];
        var result = [];
        var xPosition = startX;
        chars.forEach(char => {
            console.log(char);
            var charValue = common.alphaMap.get(char);
            console.log(charValue);
            if (charValue !== undefined) {
                var sprite = PIXI.Sprite.from(charValue);
                sprite.zIndex = -1;
                sprite.scale = new PIXI.Point(0.10, 0.10);
                sprite.x = xPosition;
                sprite.y = startY;
                sprite.tint = tint;
                result.push(sprite);
            }
            xPosition += 50;
        });
        return result;
    }
}
exports.Lib = Lib;
//# sourceMappingURL=lib.js.map