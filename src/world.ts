import * as PIXI from "pixi.js-legacy";
import { Entity, EntityArgs, EntityConstructor } from "./entity"
import { Target } from "./target"
import { Hero } from "./hero"
import { Transition } from "./transition"

interface Updater {
    update(delta: number): void;
    die(): void;
    isDead(): boolean;
}
export class World extends Entity {

    constructor(args: EntityArgs) {
        super(args);
    }

    public setup() {
        const nextRoot = new PIXI.Container();
        this.root.addChild(nextRoot);
        this.root = nextRoot;
        this.makeChild(Target);
        this.makeChild(Hero);
    }
}