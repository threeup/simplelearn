"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
const lib_1 = require("./lib");
class Target extends entity_1.Entity {
    constructor(args) {
        super(args);
        this.loader = new PIXI.Loader();
    }
    commonChanged(num) {
        this.elements = this.common.targetData.elements;
        this.refresh();
    }
    refresh() {
        if (!this.root) {
            return;
        }
        this.killAllChild();
        var idx = lib_1.Lib.randRange(0, 40);
        var data = this.elements[idx];
        this.sprites.forEach(s => this.root.removeChild(s));
        this.sprites.splice(0, this.sprites.length);
        var headerTr = { posX: 50, posY: 50, scaleX: 0.2, scaleY: 0.2 };
        lib_1.Lib.makeHeader(this, data.img, headerTr);
        var wordTr = { posX: 160, posY: 70, scaleX: 0.1, scaleY: 0.1 };
        lib_1.Lib.makeWord(this, data.text, wordTr, 0x99ffff, this.common);
        this.common.targetRemaining = data.text;
    }
    update(delta) {
        if (this.state.isKeyPressed('Enter')) {
            this.refresh();
        }
    }
}
exports.Target = Target;
//# sourceMappingURL=target.js.map