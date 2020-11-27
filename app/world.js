"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const PIXI = require("pixi.js-legacy");
const entity_1 = require("./entity");
const lib_1 = require("./lib");
const targetword_1 = require("./targetword");
const user_1 = require("./user");
class World extends entity_1.Entity {
    constructor(args) {
        super(args);
        console.log("world ready");
    }
    setup() {
        const nextRoot = new PIXI.Container();
        this.target = this.makeChild(targetword_1.TargetWord);
        this.user = this.makeChild(user_1.User);
    }
    onCommonLoaded() {
        var basicData = this.common.targetMap.get('basic');
        this.elements = basicData.elements;
    }
    onCommonEmpty() {
        this.refresh();
    }
    refresh() {
        var idx = lib_1.Lib.randRange(0, this.elements.length);
        var data = this.elements[idx];
        this.target.loadWordData(data);
    }
}
exports.World = World;
//# sourceMappingURL=world.js.map