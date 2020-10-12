"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
const actor_1 = require("./actor");
const target_1 = require("./target");
class World extends entity_1.Entity {
    constructor(state, root, app) {
        super(state, root, app);
        this.state = state;
        this.root = root;
        this.app = app;
        this.worldRoot = new PIXI.Container();
        this.children = new Array();
        const bunny = new actor_1.Actor(state, this.worldRoot, app);
        this.children.push(bunny);
        const bunny2 = new actor_1.Actor(state, this.worldRoot, app);
        this.children.push(bunny2);
        const target = new target_1.Target(state, this.worldRoot, app);
        this.children.push(target);
        app.stage.addChild(this.worldRoot);
    }
    update(delta) {
        for (var item in this.children) {
            this.children[item].update(delta);
        }
    }
}
exports.World = World;
//# sourceMappingURL=world.js.map