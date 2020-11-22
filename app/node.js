"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(args) {
        this.childList = new Array();
        if (args.parent) {
            args.parent.addChild(this);
        }
        else {
            this.parent = null;
            this.container = args.container;
        }
    }
    setEntity(entity) {
        this.entity = entity;
        this.checkValid();
    }
    addChild(child) {
        child.parent = this;
        this.childList.push(child);
        this.container = this.parent.container;
    }
    removeChild(child) {
        child.parent = null;
        this.childList.forEach((element, index) => {
            if (element == child) {
                this.childList.splice(index, 1);
            }
        });
    }
    checkValid() {
        if (this.parent != null && this.entity == null) {
            this.parent.removeChild(this);
        }
    }
}
exports.Node = Node;
//# sourceMappingURL=node.js.map