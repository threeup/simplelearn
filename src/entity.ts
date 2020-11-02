import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Common, CommonState, IObserver } from "./common"
import { Transform, Updater } from "./basetypes"



export interface EntityArgs {
    state: GameState,
    common: Common,
    parent: Entity,
    root: PIXI.Container
}

export interface EntityConstructor {
    new(args: EntityArgs): Entity;
}

export class Entity implements IObserver {
    protected state: GameState;
    protected common: Common;
    protected parent: Entity;
    protected root: PIXI.Container;

    public childList: Array<Entity>;
    public updateList: Array<Updater>;
    public sprites: Array<PIXI.Sprite>;
    public transform: Transform;
    public dead: boolean;

    constructor(args: EntityArgs) {
        this.state = args.state;
        this.common = args.common;
        this.parent = args.parent;
        this.root = args.root;
        this.dead = false;
        this.common.observe(this);

        this.childList = new Array();
        this.updateList = new Array();
        this.sprites = new Array();
        this.transform = { posX: 0, posY: 0, scaleX:0.2, scaleY:0.2 };
    }

    public makeChild(ctor: EntityConstructor): Entity {
        var result = new ctor({ state: this.state, common: this.common, parent: this, root: this.root });
        this.childList.push(result);
        this.updateList.push(result);
        return result;
    }

    public makeChildWithSprites(ctor: EntityConstructor, sprites: PIXI.Sprite[]): Entity {
        var result = this.makeChild(ctor);
        result.sprites = sprites;
        result.addSprites(this.root);
        return result;
    }

    public killAllChild() {
        this.childList.forEach(c => c.die());
    }


    public setTransform(tr:Transform) {
        this.transform.posX = tr.posX;
        this.transform.posY = tr.posY;
        if(tr.scaleX) { this.transform.scaleX = tr.scaleX; }
        if(tr.scaleY) { this.transform.scaleY = tr.scaleY; }
        this.sprites.forEach(s => { 
            s.x = this.transform.posX; 
            s.y = this.transform.posY;
            s.scale = new PIXI.Point(this.transform.scaleX, this.transform.scaleY) });
    }

    public addSprites(container: PIXI.Container) {
        this.sprites.forEach(s => container.addChild(s));
    }
    public removeSprites(container: PIXI.Container) {
        this.sprites.forEach(s => container.removeChild(s));
        this.sprites.splice(0, this.sprites.length);
    }

    public commonChanged(num: CommonState): void {

    }

    public die(): void {
        this.removeSprites(this.root);
        this.dead = true;
    }

    public isDead(): boolean {
        return this.dead === true;
    }

    public update(delta: number): void {
        this.childList = this.childList.filter(u => u.isDead() === false);
        this.updateList = this.updateList.filter(u => u.isDead() === false);
        for (var item in this.updateList) {
            this.updateList[item].update(delta);
        }
    }
}