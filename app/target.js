"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
class Target extends entity_1.Entity {
    constructor(state, common, root, app) {
        super(state, common, root, app);
        this.state = state;
        this.common = common;
        this.root = root;
        this.app = app;
        this.loader = new PIXI.Loader();
    }
    commonChanged(num) {
        var rootContainer = this.root;
        this.elements = this.common.targetData.elements;
        var data = this.elements[1];
        let headerSprite = PIXI.Sprite.from(data.img);
        headerSprite.zIndex = -1;
        headerSprite.scale = new PIXI.Point(0.2, 0.2);
        headerSprite.x = 50;
        headerSprite.y = 50;
        this.sprites.push(headerSprite);
        console.log(data.text);
        this.sprites.forEach(s => rootContainer.addChild(s));
    }
    randRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    refresh() {
        var idx = this.randRange(0, 40);
        var data = this.elements[idx];
        this.sprites[0].texture = PIXI.Texture.from(data.img);
    }
    update(delta) {
        if (this.state.isKeyPressed('Enter')) {
            this.refresh();
        }
    }
}
exports.Target = Target;
//# sourceMappingURL=target.js.map