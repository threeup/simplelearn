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
            backgroundColor: 0xb22222,
            view: this.canvas,
            resolution: window.devicePixelRatio || 1
        });
        {
            this.world = new world_1.World({ state: this.state, common: this.common });
            const worldNode = new node_1.Node();
            worldNode.bind(null, this.app.stage);
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
            var deltaTime = delta * game.app.ticker.deltaMS * 0.001;
            if (game.world) {
                game.world.update(deltaTime);
            }
            if (game.state) {
                game.state.update(deltaTime);
            }
            if (game.common.commonState == common_1.CommonState.Shutdown) {
                game.app.destroy(true);
            }
        });
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map