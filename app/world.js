"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
const target_1 = require("./target");
const hero_1 = require("./hero");
class World extends entity_1.Entity {
    constructor(state, common, root, app) {
        super(state, common, root, app);
        this.state = state;
        this.common = common;
        this.root = root;
        this.app = app;
        this.worldRoot = new PIXI.Container();
        this.children = new Array();
        const target = new target_1.Target(state, common, this.worldRoot, app);
        this.children.push(target);
        const hero = new hero_1.Hero(state, common, this.worldRoot, app);
        this.children.push(hero);
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