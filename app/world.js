"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
const target_1 = require("./target");
const hero_1 = require("./hero");
class World extends entity_1.Entity {
    constructor(args) {
        super(args);
    }
    setup() {
        const nextRoot = new PIXI.Container();
        this.root.addChild(nextRoot);
        this.root = nextRoot;
        this.makeChild(target_1.Target);
        this.makeChild(hero_1.Hero);
    }
}
exports.World = World;
//# sourceMappingURL=world.js.map