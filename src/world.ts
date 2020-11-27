import * as PIXI from "pixi.js-legacy";
import { Entity, EntityArgs } from "./entity"
import { Lib } from "./lib"
import { TargetWord } from "./targetword";
import { User } from "./user";

export class World extends Entity {

    public elements:Array<any>;
    public target:TargetWord;
    public user:User;

    constructor(args: EntityArgs) {
        super(args);
        console.log("world ready");
    }

    public setup() {
        const nextRoot = new PIXI.Container();
        this.target = this.makeChild(TargetWord) as TargetWord;
        this.user = this.makeChild(User) as User;
    }

    public onCommonLoaded() {
        var basicData = this.common.targetMap.get('basic');
        this.elements = basicData.elements as Array<any>;
    }

    public onCommonEmpty() {
        this.refresh();
    }

    public refresh() {
        var idx = Lib.randRange(0, this.elements.length);
        var data = this.elements[idx];
        
        this.target.loadWordData(data);
    }

    
}