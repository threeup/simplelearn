"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
class GameState {
    constructor() {
        this.isKeyDown = new Map;
        this.wasKeyDown = new Map;
        this.progress = 0;
    }
    isKeyPressed(key) {
        var isDown = this.isKeyDown.get(key) == true;
        var wasDown = this.wasKeyDown.get(key) == true;
        return isDown && !wasDown;
    }
    update(delta) {
        const wasIterator = this.wasKeyDown[Symbol.iterator]();
        for (const [key, value] of wasIterator) {
            if (value) {
                this.wasKeyDown.set(key, false);
            }
        }
        const isIterator = this.isKeyDown[Symbol.iterator]();
        for (const [key, value] of isIterator) {
            if (value) {
                this.wasKeyDown.set(key, true);
            }
        }
    }
}
exports.GameState = GameState;
//# sourceMappingURL=gamestate.js.map