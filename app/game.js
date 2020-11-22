"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const PIXI = require("pixi.js-legacy");
const world_1 = require("./world");
const node_1 = require("./node");
const gamestate_1 = require("./gamestate");
const common_1 = require("./common");
class Game {
    constructor() {
        this.canvas = document.getElementById("main");
        this.state = new gamestate_1.GameState();
        this.common = new common_1.Common();
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb,
            view: this.canvas,
            resolution: window.devicePixelRatio || 1
        });
        {
            this.world = new world_1.World({ state: this.state, common: this.common });
            const worldNode = new node_1.Node({ container: this.app.stage });
            this.world.attachNode(worldNode);
            this.world.setup();
        }
        var game = this;
        {
            document.addEventListener('keydown', function (e) {
                if (game.state) {
                    game.state.isKeyDown.set(e.key, true);
                }
            });
            document.addEventListener('keyup', function (e) {
                if (game.state) {
                    game.state.isKeyDown.set(e.key, false);
                }
            });
        }
        this.app.ticker.add(function (delta) {
            if (game.world) {
                game.world.update(delta);
            }
            if (game.state) {
                game.state.update(delta);
            }
        });
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map