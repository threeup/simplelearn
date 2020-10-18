"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
const entity_1 = require("./entity");
const lib_1 = require("./lib");
class Hero extends entity_1.Entity {
    constructor(state, common, root, app) {
        super(state, common, root, app);
        this.state = state;
        this.common = common;
        this.root = root;
        this.app = app;
        this.progress = 0;
    }
    commonChanged(num) {
    }
    add(char) {
        var rootContainer = this.root;
        this.progress += 1;
        if (this.progress > 10) {
            this.progress = 1;
            this.sprites.forEach(s => rootContainer.removeChild(s));
            this.sprites.splice(0, this.sprites.length);
        }
        var spriteList = lib_1.Lib.makeWord(char, 90 + this.progress * 70, 700, 0xffccaa, this.common);
        this.sprites = this.sprites.concat(spriteList);
        this.sprites.forEach(s => rootContainer.addChild(s));
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
        this.sprites.forEach(s => s.y -= 1);
    }
}
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map