"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const PIXI = require("pixi.js-legacy");
const actor_1 = require("./actor");
class World {
    init(app) {
        this.root = new PIXI.Container();
        const bunny = new actor_1.Actor();
        const bunny2 = new actor_1.Actor();
        bunny.init(this.root);
        bunny2.init(this.root);
        app.stage.addChild(this.root);
    }
    loop() {
    }
}
exports.World = World;
//# sourceMappingURL=world.js.map