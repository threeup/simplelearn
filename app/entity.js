"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(state, common, root, app) {
        this.state = state;
        this.common = common;
        this.root = root;
        this.app = app;
        this.sprites = [];
        common.observe(this);
    }
    commonChanged(num) {
    }
    update(delta) {
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map