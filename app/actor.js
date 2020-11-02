"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
class Actor extends entity_1.Entity {
    constructor(state, common, parent) {
        super(state, common, parent);
        this.state = state;
        this.common = common;
        this.parent = parent;
        this.sprite = PIXI.Sprite.from("assets/bunny.png");
    }
    loop() {
    }
}
exports.Actor = Actor;
//# sourceMappingURL=actor.js.map