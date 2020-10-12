"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
class Target extends entity_1.Entity {
    constructor(state, root, app) {
        super(state, root, app);
        this.state = state;
        this.root = root;
        this.app = app;
        this.loader = new PIXI.Loader();
        var rootContainer = root;
        this.loader.add('targetWordData', 'assets/targetwords.json');
        this.loader.load((loader, resources) => {
            this.targetData = resources.targetWordData.data;
            this.elements = this.targetData.elements;
            console.log("targetData", this.targetData);
            console.log("elements", this.elements);
            var data = this.elements[1];
            this.sprite = PIXI.Sprite.from(data.img);
            this.sprite.zIndex = -1;
            this.sprite.scale = new PIXI.Point(0.2, 0.2);
            this.sprite.x = 500 * Math.random();
            this.sprite.y = 300;
            rootContainer.addChild(this.sprite);
        });
    }
    randRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    refresh() {
        var idx = this.randRange(0, 10);
        var data = this.elements[idx];
        this.sprite.texture = PIXI.Texture.from(data.img);
    }
    update(delta) {
        if (this.state.isKeyPressed('a')) {
            this.refresh();
        }
    }
}
exports.Target = Target;
//# sourceMappingURL=target.js.map