"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const node_1 = require("./node");
const common_1 = require("./common");
class Entity {
    constructor(args) {
        this.state = args.state;
        this.partList = new Array();
        this.updateList = new Array();
        this.transform = { posX: 0, posY: 0, scaleX: 0.2, scaleY: 0.2 };
        this.common = args.common;
        this.common.observe(this);
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
        if (this.node) {
            this.node.removeAllChild();
        }
        this.updateList.forEach(c => c.die());
    }
    attachNode(node) {
        node.entity = this;
        this.node = node;
    }
    detachNode() {
        if (this.node) {
            this.node.entity = null;
            this.node = null;
        }
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
        var nextNode = new node_1.Node();
        nextNode.bind(this.node, null);
        result.attachNode(nextNode);
        this.updateList.push(result);
        return result;
    }
    addTransition(tion) {
        if (tion.startTform) {
            this.setTransform(tion.startTform);
            tion.setTform = (tform) => { this.setTransform(tform); };
        }
        if (tion.startTint) {
            tion.setTint = (tint) => { this.setTint(tint); };
        }
        this.updateList.push(tion);
    }
    setTransform(tform) {
        if (tform.posX) {
            this.transform.posX = tform.posX;
        }
        if (tform.posY) {
            this.transform.posY = tform.posY;
        }
        if (tform.scaleX) {
            this.transform.scaleX = tform.scaleX;
        }
        if (tform.scaleY) {
            this.transform.scaleY = tform.scaleY;
        }
        this.partList.forEach(p => { p.setTransform(this.transform); });
    }
    setTint(tint) {
        this.partList.forEach(p => { p.setTint(tint); });
    }
    commonChanged(num) {
        if (num === common_1.CommonState.Loaded) {
            this.onCommonLoaded();
        }
        else if (num === common_1.CommonState.Empty) {
            this.onCommonEmpty();
        }
        else if (num === common_1.CommonState.InProgress) {
            this.onCommonInProgress();
        }
    }
    onCommonLoaded() { }
    onCommonEmpty() { }
    onCommonInProgress() { }
    update(deltaTime) {
        this.updateList = this.updateList.filter(u => u.isDead() === false);
        for (var item in this.updateList) {
            this.updateList[item].update(deltaTime);
        }
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map