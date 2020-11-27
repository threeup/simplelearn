
import { GameState } from "./gamestate"
import { Node } from "./node"
import { Part } from "./part"
import { Transition } from "./transition"
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
    public node: Node;

    public partList: Array<Part>;
    public updateList: Array<IUpdater>;
    public transform: Transform;

    constructor(args: EntityArgs) {
        this.state = args.state;

        this.partList = new Array();
        this.updateList = new Array();
        this.transform = { posX: 0, posY: 0, scaleX: 0.2, scaleY: 0.2 };

        this.common = args.common;
        this.common.observe(this);
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
        if (this.node) {
            this.node.removeAllChild();
        }
        this.updateList.forEach(c => c.die());
    }

    public attachNode(node: Node) {
        node.entity = this;
        this.node = node;
    }

    protected detachNode(): void {
        if (this.node) {
            this.node.entity = null;
            this.node = null;
        }
    }

    public attachPart(part: Part) {
        this.partList.push(part);
        part.afterAttach(this);
        part.setTransform(this.transform);
    }

    protected detachPart(part: Part) {
        part.beforeDetach(this);
        this.partList.forEach((element, index) => {
            if (element == part) { this.partList.splice(index, 1); }
        });
    }

    public makeChild(ctor: EntityConstructor): Entity {
        var result = new ctor({ state: this.state, common: this.common });
        var nextNode: Node = new Node();
        nextNode.bind(this.node, null);
        result.attachNode(nextNode);

        this.updateList.push(result);
        return result;
    }

    public addTransition(tion: Transition) {
        if (tion.startTform) {
            this.setTransform(tion.startTform);
            tion.setTform = (tform) => { this.setTransform(tform) };
        }
        if (tion.startTint) {
            tion.setTint = (tint) => { this.setTint(tint) };
        }
        this.updateList.push(tion);
    }

    public setTransform(tform: Transform) {
        if (tform.posX) { this.transform.posX = tform.posX; }
        if (tform.posY) { this.transform.posY = tform.posY; }
        if (tform.scaleX) { this.transform.scaleX = tform.scaleX; }
        if (tform.scaleY) { this.transform.scaleY = tform.scaleY; }
        this.partList.forEach(p => { p.setTransform(this.transform) });
    }

    public setTint(tint: number) {
        this.partList.forEach(p => { p.setTint(tint) });
    }

    public commonChanged(num: CommonState): void {
        if (num === CommonState.Loaded) {
            this.onCommonLoaded();
        } else if (num === CommonState.Empty) {
            this.onCommonEmpty();
        } else if (num === CommonState.InProgress) {
            this.onCommonInProgress();
        }
    }

    public onCommonLoaded(): void { }
    public onCommonEmpty(): void { }
    public onCommonInProgress(): void { }

    public update(deltaTime: number): void {
        this.updateList = this.updateList.filter(u => u.isDead() === false);
        for (const itemName in this.updateList) {
            this.updateList[itemName].update(deltaTime);
        }
    }

    public countTransitions(): number {
        var count = 0;
        for (const itemName in this.updateList) {
            const item = this.updateList[itemName];
            if (!item.isDead()) {
                if (item instanceof Transition) {
                    count += 1;
                }
                if (item instanceof Entity) {
                    const ent = item as Entity;
                    count += ent.countTransitions();
                }
            }
        }
        return count;
    }
}