"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const babylonjs_1 = require("babylonjs");
const world_1 = require("./world");
class Game {
    constructor() {
        this.canvas = document.getElementById("main");
    }
    init() {
        this.engine = new babylonjs_1.Engine(this.canvas, true);
        this.gpMan = new babylonjs_1.GamepadManager();
        this.scene = new babylonjs_1.Scene(this.engine);
        this.world = new world_1.World();
        this.world.createWorld(this.scene, this.canvas);
        this.gpMan = new babylonjs_1.GamepadManager();
        this.gpMan.onGamepadConnectedObservable.add(this.createGpad);
        this.engine.runRenderLoop(() => {
            this.world.loop();
            this.scene.render();
        });
        console.log("inited");
    }
    createGpad(gamepad) {
        if (gamepad instanceof babylonjs_1.GenericPad) {
        }
    }
}
exports.Game = Game;
