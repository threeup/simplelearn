
import { GameState } from "./gamestate"
import { Node } from "./node"
import { Part } from "./part"
import { Common, CommonState } from "./common"
import { Transform, IObserver, IUpdater } from "./basetypes"

export interface EntityArgs {
    state: GameState,
    common: Common
}

export interface EntityConstructor {
    new(args: EntityArgs): Entity;
}

export class Entity implements IObserver, IUpdater {
    protected state: GameState;
    protected common: Common;
    public node:Node;

    public partList: Array<Part>;
    public updateList: Array<IUpdater>;
    public transform: Transform;

    constructor(args: EntityArgs) {
        this.state = args.state;
        this.common = args.common;
        this.common.observe(this);

        this.partList = new Array();
        this.updateList = new Array();
        this.transform = { posX: 0, posY: 0, scaleX:0.2, scaleY:0.2 };
    }

    public isDead(): boolean {
        return this.node === null;
    }

    public die(): void {
        this.partList.forEach(p => p.beforeDetach(this));
        this.partList.splice(0, this.partList.length);
        this.detachNode();
    }

    public killAllChild() {
        this.updateList.forEach(c => c.die());
    }

    public attachNode(node:Node) {
        node.entity = this;
        this.node = node;
    }

    protected detachNode(): void {
        this.node.entity = null;
        this.node = null;
    }

    protected attachPart(part:Part) {
        this.partList.push(part);
        part.afterAttach(this);
        part.setTransform(this.transform);
    }

    protected detachPart(part:Part) {
        part.beforeDetach(this);
        this.partList.forEach((element, index) => {
            if (element == part) { this.partList.splice(index, 1); }
        });
    }

    public makeChild(ctor: EntityConstructor): Entity {
        var result = new ctor({ state: this.state, common: this.common });
        result.attachNode(new Node({parent:this.node}));
        this.updateList.push(result);
        return result;
    }
    
    public setTransform(tr:Transform) {
        this.transform.posX = tr.posX;
        this.transform.posY = tr.posY;
        if(tr.scaleX) { this.transform.scaleX = tr.scaleX; }
        if(tr.scaleY) { this.transform.scaleY = tr.scaleY; }
        this.partList.forEach(p => {p.setTransform(this.transform)});
    }

    public commonChanged(num: CommonState): void {
    }

    public update(delta: number): void {
        this.updateList = this.updateList.filter(u => u.isDead() === false);
        for (var item in this.updateList) {
            this.updateList[item].update(delta);
        }
    }
}