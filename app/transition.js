"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transition = void 0;
class Transition {
    constructor(duration) {
        this.progress = 0;
        this.duration = duration;
    }
    static lerp(valA, valB, interval) {
        return (1 - interval) * valA + interval * valB;
    }
    die() {
        this.dead = true;
    }
    isDead() {
        return this.dead === true;
    }
    update(delta) {
        this.progress += delta;
        var interval = this.progress / this.duration;
        if (this.startPos && this.endPos && this.setPos) {
            const x = Transition.lerp(this.startPos.posX, this.endPos.posX, interval);
            const y = Transition.lerp(this.startPos.posY, this.endPos.posY, interval);
            this.setPos({ posX: x, posY: y, scaleX: null, scaleY: null });
        }
        if (this.startTint && this.endTint && this.setTint) {
            this.setTint(Transition.lerp(this.startTint, this.endTint, interval));
        }
        if (interval > 1.0) {
            this.dead = true;
        }
    }
}
exports.Transition = Transition;
//# sourceMappingURL=transition.js.map