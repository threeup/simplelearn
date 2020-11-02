import * as PIXI from "pixi.js-legacy";
import { World } from "./world"
import { GameState } from "./gamestate"
import { Common } from "./common"

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
            backgroundColor: 0x1099bb,
            view: this.canvas,
            resolution: window.devicePixelRatio || 1
        });

        this.world = new World({ state: this.state, common: this.common, parent: null, root:this.app.stage });
        this.world.setup();

        var game: Game = this;
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

        this.app.ticker.add(function (delta: number) {
            if (game.world) {
                game.world.update(delta);
            }

            if (game.state) {
                game.state.update(delta);
            }
        });

    }
}