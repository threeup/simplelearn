"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const PIXI = require("pixi.js-legacy");
class Actor {
    constructor() {
        this.sprite = PIXI.Sprite.from("assets/bunny.png");
    }
    init(root) {
        this.sprite.zIndex = -1;
        this.sprite.scale = new PIXI.Point(1.2, 1.2);
        this.sprite.x = 500 * Math.random();
        root.addChild(this.sprite);
    }
    loop() {
    }
}
exports.Actor = Actor;
//# sourceMappingURL=actor.js.map