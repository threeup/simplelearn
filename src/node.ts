import * as PIXI from "pixi.js-legacy";
import { Entity } from "./entity";
import { Lib } from "./lib";


export class Node {

    public parent: Node | null;
    public container: PIXI.Container;
    public childList: Array<Node>;
    public entity: Entity;
    public identifier: number;
    public parentIdentifier: number;

    constructor() {
        this.parent = null;
        this.identifier = Lib.randRange(0, 1000);
        this.parentIdentifier = -1;
        this.childList = new Array();
    }

    bind(parent: Node, container: PIXI.Container) {
        if (parent) {
            parent.addChild(this);
        } else {
            this.parent = null;
            this.container = container;
        }
    }

    public setEntity(entity: Entity) {
        this.entity = entity;
        this.checkValid();
    }

    public addChild(child:Node) {
        child.parent = this;
        child.parentIdentifier = this.identifier;
        child.container = this.container;
        this.childList.push(child);
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