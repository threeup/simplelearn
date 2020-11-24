"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const lib_1 = require("./lib");
class Node {
    constructor() {
        this.parent = null;
        this.identifier = lib_1.Lib.randRange(0, 1000);
        this.parentIdentifier = -1;
        this.childList = new Array();
    }
    bind(parent, container) {
        if (parent) {
            parent.addChild(this);
        }
        else {
            this.parent = null;
            this.container = container;
        }
    }
    setEntity(entity) {
        this.entity = entity;
        this.checkValid();
    }
    addChild(child) {
        child.parent = this;
        child.parentIdentifier = this.identifier;
        child.container = this.container;
        this.childList.push(child);
    }
    removeChild(child) {
        child.parent = null;
        this.childList.forEach((element, index) => {
            if (element == child) {
                this.childList.splice(index, 1);
            }
        });
    }
    removeAllChild() {
        this.childList.forEach(element => {
            element.parent = null;
        });
        this.childList.splice(0, this.childList.length);
    }
    checkValid() {
        if (this.parent != null && this.entity == null) {
            this.parent.removeChild(this);
        }
    }
}
exports.Node = Node;
//# sourceMappingURL=node.js.map