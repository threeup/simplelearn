"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const PIXI = require("pixi.js-legacy");
const world_1 = require("./world");
class Game {
    constructor() {
        this.canvas = document.getElementById("main");
    }
    init() {
        console.log("inited");
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb,
            view: this.canvas,
            resolution: window.devicePixelRatio || 1
        });
        this.world = new world_1.World();
        this.world.init(this.app);
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map