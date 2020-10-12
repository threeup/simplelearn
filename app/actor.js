"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
class Actor extends entity_1.Entity {
    constructor(state, root, app) {
        super(state, root, app);
        this.state = state;
        this.root = root;
        this.app = app;
        this.sprite = PIXI.Sprite.from("assets/bunny.png");
        var rootContainer = root;
        this.sprite.zIndex = -1;
        this.sprite.scale = new PIXI.Point(1.2, 1.2);
        this.sprite.x = 500 * Math.random();
        rootContainer.addChild(this.sprite);
    }
    loop() {
    }
}
exports.Actor = Actor;
//# sourceMappingURL=actor.js.map