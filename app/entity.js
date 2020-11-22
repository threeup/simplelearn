"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const node_1 = require("./node");
const common_1 = require("./common");
class Entity {
    constructor(args) {
        this.state = args.state;
        this.common = args.common;
        this.common.observe(this);
        this.partList = new Array();
        this.updateList = new Array();
        this.transform = { posX: 0, posY: 0, scaleX: 0.2, scaleY: 0.2 };
    }
    isDead() {
        return this.node === null;
    }
    die() {
        this.partList.forEach(p => p.beforeDetach(this));
        this.partList.splice(0, this.partList.length);
        this.detachNode();
    }
    killAllChild() {
        this.node.removeAllChild();
        this.updateList.forEach(c => c.die());
    }
    attachNode(node) {
        node.entity = this;
        this.node = node;
    }
    detachNode() {
        this.node.entity = null;
        this.node = null;
    }
    attachPart(part) {
        this.partList.push(part);
        part.afterAttach(this);
        part.setTransform(this.transform);
    }
    detachPart(part) {
        part.beforeDetach(this);
        this.partList.forEach((element, index) => {
            if (element == part) {
                this.partList.splice(index, 1);
            }
        });
    }
    makeChild(ctor) {
        var result = new ctor({ state: this.state, common: this.common });
        result.attachNode(new node_1.Node({ parent: this.node }));
        this.updateList.push(result);
        return result;
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
        this.partList.forEach(p => { p.setTransform(this.transform); });
    }
    commonChanged(num) {
        if (num === common_1.CommonState.Loaded) {
            this.onCommonLoaded();
        }
    }
    onCommonLoaded() { }
    update(delta) {
        this.updateList = this.updateList.filter(u => u.isDead() === false);
        for (var item in this.updateList) {
            this.updateList[item].update(delta);
        }
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map