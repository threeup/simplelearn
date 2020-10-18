"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
const lib_1 = require("./lib");
class Target extends entity_1.Entity {
    constructor(state, common, root, app) {
        super(state, common, root, app);
        this.state = state;
        this.common = common;
        this.root = root;
        this.app = app;
        this.loader = new PIXI.Loader();
    }
    commonChanged(num) {
        this.elements = this.common.targetData.elements;
        this.refresh();
    }
    randRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    refresh() {
        var idx = this.randRange(0, 40);
        var data = this.elements[idx];
        var rootContainer = this.root;
        this.sprites.forEach(s => rootContainer.removeChild(s));
        this.sprites.splice(0, this.sprites.length);
        this.sprites.push(lib_1.Lib.makeHeader(data.img, 50, 50));
        var spriteList = lib_1.Lib.makeWord(data.text, 160, 70, 0x99ffff, this.common);
        this.sprites = this.sprites.concat(spriteList);
        this.sprites.forEach(s => rootContainer.addChild(s));
    }
    update(delta) {
        if (this.state.isKeyPressed('Enter')) {
            this.refresh();
        }
    }
}
exports.Target = Target;
//# sourceMappingURL=target.js.map