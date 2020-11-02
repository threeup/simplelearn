"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
const entity_1 = require("./entity");
const lib_1 = require("./lib");
const transition_1 = require("./transition");
class Hero extends entity_1.Entity {
    constructor(args) {
        super(args);
        this.progress = 0;
    }
    commonChanged(num) {
    }
    add(char) {
        if (!this.root) {
            return;
        }
        if (this.common.targetRemaining.length > 0) {
            const nextChar = this.common.targetRemaining.charAt(0);
            if (char == nextChar) {
                this.progress += 1;
            }
        }
        if (this.childList.length > 25) {
            this.childList[0].die();
        }
        var startX = 90 + this.progress * lib_1.Lib.wordStep;
        var letterTr = { posX: startX, posY: 700, scaleX: 0.2, scaleY: 0.2 };
        var letterEnt = lib_1.Lib.makeLetter(this, char, letterTr, 0xffccaa, this.common);
        var transition = new transition_1.Transition(5);
        transition.startPos = { posX: letterEnt.transform.posX, posY: letterEnt.transform.posY, scaleX: null, scaleY: null };
        transition.endPos = { posX: startX - 100, posY: 0, scaleX: null, scaleY: null };
        transition.setPos = this.setTransform;
        this.updateList.push(transition);
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
        super.update(delta);
    }
}
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map