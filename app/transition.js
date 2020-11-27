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
        if (this.onDead) {
            this.onDead();
        }
    }
    isDead() {
        return this.dead === true;
    }
    update(deltaTime) {
        this.progress += deltaTime;
        var interval = this.progress / this.duration;
        var x = null;
        var y = null;
        var sx = null;
        var sy = null;
        if (this.setTform && this.startTform && this.endTform) {
            if (this.startTform.posX != this.endTform.posX) {
                x = Transition.lerp(this.startTform.posX, this.endTform.posX, interval);
            }
            if (this.startTform.posY != this.endTform.posY) {
                y = Transition.lerp(this.startTform.posY, this.endTform.posY, interval);
            }
            if (this.startTform.scaleX != this.endTform.scaleX) {
                sx = Transition.lerp(this.startTform.scaleX, this.endTform.scaleX, interval);
            }
            if (this.startTform.scaleY != this.endTform.scaleY) {
                sy = Transition.lerp(this.startTform.scaleY, this.endTform.scaleY, interval);
            }
            this.setTform({ posX: x, posY: y, scaleX: sx, scaleY: sy });
        }
        if (this.setTint && this.startTint != this.endTint) {
            this.setTint(Transition.lerp(this.startTint, this.endTint, interval));
        }
        if (interval > 1.0) {
            if (this.setTform && this.endTform) {
                x = this.endTform.posX;
                y = this.endTform.posY;
                sx = this.endTform.scaleX;
                sy = this.endTform.scaleY;
                this.setTform({ posX: x, posY: y, scaleX: sx, scaleY: sy });
            }
            if (this.setTint && this.startTint != this.endTint) {
                this.setTint(this.endTint);
            }
            this.die();
        }
    }
}
exports.Transition = Transition;
//# sourceMappingURL=transition.js.map