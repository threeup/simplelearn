import * as PIXI from "pixi.js-legacy";
import { World } from "./world"
import { Node } from "./node"
import { GameState } from "./gamestate"
import { Common, CommonState } from "./common"

export class Game {
    public canvas: any;
    public app: PIXI.Application;

    public state: GameState;
    public common: Common;
    public world: World;

    constructor() {
        this.canvas = document.getElementById("main");
        this.state = new GameState();
        this.common = new Common();
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0xb22222,
            view: this.canvas,
            resolution: window.devicePixelRatio || 1
        });

        {
            this.world = new World({ state: this.state, common: this.common });
            const worldNode = new Node();
            worldNode.bind(null, this.app.stage);
            this.world.attachNode(worldNode)
            this.world.setup();
        }

        var game: Game = this;
        {
            document.addEventListener('keydown', function (e: KeyboardEvent) {
                if (game.state) {
                    game.state.isKeyDown.set(e.key, true);
                }
            })
            document.addEventListener('keyup', function (e: KeyboardEvent) {
                if (game.state) {
                    game.state.isKeyDown.set(e.key, false);
                }
            });
        }

        this.app.ticker.add(function (delta: number) {
            
            var deltaTime = delta * game.app.ticker.deltaMS * 0.001;
            if (game.world) {
                game.world.update(deltaTime);
            }

            if (game.state) {
                game.state.update(deltaTime);
            }

            if(game.common.commonState  == CommonState.Shutdown) {
                game.app.destroy(true);
            }
        });

    }
}