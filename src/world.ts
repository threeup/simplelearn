import * as PIXI from "pixi.js-legacy";
import { Entity, EntityArgs } from "./entity"
import { Lib } from "./lib"
import { TargetWord } from "./targetword";
import { User } from "./user";
import { Background } from "./background";

export class World extends Entity {

    public elements:Array<any>;
    public target:TargetWord;
    public user:User;
    public background:Background;

    constructor(args: EntityArgs) {
        super(args);
        console.log("world ready");
    }

    public setup() {
        this.target = this.makeChild(TargetWord) as TargetWord;
        this.user = this.makeChild(User) as User;
        this.background = this.makeChild(Background) as Background;
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