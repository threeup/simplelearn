"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const PIXI = require("pixi.js-legacy");
class Entity {
    constructor(args) {
        this.state = args.state;
        this.common = args.common;
        this.parent = args.parent;
        this.root = args.root;
        this.dead = false;
        this.common.observe(this);
        this.childList = new Array();
        this.updateList = new Array();
        this.sprites = new Array();
        this.transform = { posX: 0, posY: 0, scaleX: 0.2, scaleY: 0.2 };
    }
    makeChild(ctor) {
        var result = new ctor({ state: this.state, common: this.common, parent: this, root: this.root });
        this.childList.push(result);
        this.updateList.push(result);
        return result;
    }
    makeChildWithSprites(ctor, sprites) {
        var result = this.makeChild(ctor);
        result.sprites = sprites;
        result.addSprites(this.root);
        return result;
    }
    killAllChild() {
        this.childList.forEach(c => c.die());
    }
    setTransform(tr) {
        this.transform.posX = tr.posX;
        this.transform.posY = tr.posY;
        if (tr.scaleX) {
            this.transform.scaleX = tr.scaleX;
        }
        if (tr.scaleY) {
            this.transform.scaleY = tr.scaleY;
        }
        this.sprites.forEach(s => {
            s.x = this.transform.posX;
            s.y = this.transform.posY;
            s.scale = new PIXI.Point(this.transform.scaleX, this.transform.scaleY);
        });
    }
    addSprites(container) {
        this.sprites.forEach(s => container.addChild(s));
    }
    removeSprites(container) {
        this.sprites.forEach(s => container.removeChild(s));
        this.sprites.splice(0, this.sprites.length);
    }
    commonChanged(num) {
    }
    die() {
        this.removeSprites(this.root);
        this.dead = true;
    }
    isDead() {
        return this.dead === true;
    }
    update(delta) {
        this.childList = this.childList.filter(u => u.isDead() === false);
        this.updateList = this.updateList.filter(u => u.isDead() === false);
        for (var item in this.updateList) {
            this.updateList[item].update(delta);
        }
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map