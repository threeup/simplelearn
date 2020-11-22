import * as PIXI from "pixi.js-legacy";
import { Entity } from "./entity";

interface NodeArguments {
    parent?: Node;
    container?: PIXI.Container;
}

export class Node {

    protected parent: Node;
    public container: PIXI.Container;
    public childList: Array<Node>;
    public entity: Entity;

    constructor(args: NodeArguments) {
        this.childList = new Array();
        if (args.parent) {
            args.parent.addChild(this);
        } else {
            this.parent = null;
            this.container = args.container;
        }
    }

    public setEntity(entity: Entity) {
        this.entity = entity;
        this.checkValid();
    }

    public addChild(child:Node) {
        child.parent = this;
        this.childList.push(child);
        this.container = this.parent.container;
    }

    public removeChild(child: Node) {
        child.parent = null;
        this.childList.forEach((element, index) => {
            if (element == child) { this.childList.splice(index, 1); }
        });
    }

    public removeAllChild() {
        this.childList.forEach(element => {
            element.parent = null;
        });
        this.childList.splice(0, this.childList.length);
    }

    private checkValid() {
        if (this.parent != null && this.entity == null) {
            this.parent.removeChild(this);
        }
    }
}