"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
class Hero extends entity_1.Entity {
    constructor(state, common, root, app) {
        super(state, common, root, app);
        this.state = state;
        this.common = common;
        this.root = root;
        this.app = app;
    }
    commonChanged(num) {
    }
    add(char) {
        var charValue = this.common.alphaMap.get(char);
        var sprite = PIXI.Sprite.from(charValue);
        sprite.zIndex = -1;
        sprite.scale = new PIXI.Point(0.06, 0.06);
        sprite.x = 750 * Math.random();
        sprite.y = 100 + 400 * Math.random();
        var rootContainer = this.root;
        rootContainer.addChild(sprite);
    }
    update(delta) {
        for (var i = 48; i <= 57; ++i) {
            var key = String.fromCharCode(i);
            if (this.state.isKeyPressed(key)) {
                this.add(key);
            }
        }
        for (var i = 97; i <= 122; ++i) {
            var key = String.fromCharCode(i);
            if (this.state.isKeyPressed(key)) {
                this.add(key);
            }
        }
    }
}
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map