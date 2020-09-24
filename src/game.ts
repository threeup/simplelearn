import { Engine, Scene, Gamepad, GamepadManager, GenericPad } from "babylonjs";
import { World } from "./world"

export class Game {
    public canvas: any = document.getElementById("main");
    public engine: Engine;
    public scene: Scene;
    public gpMan: GamepadManager;
    public world: World;

    public init(): void {
        this.engine = new Engine(this.canvas, true);
        this.gpMan = new GamepadManager();
        this.scene = new Scene(this.engine);
        this.world = new World();
        this.world.createWorld(this.scene, this.canvas);
        this.gpMan = new GamepadManager();
        this.gpMan.onGamepadConnectedObservable.add(this.createGpad);

        this.engine.runRenderLoop(() => {
            this.world.loop();
            this.scene.render();
        });
        console.log("inited");

    }


    public createGpad(gamepad: Gamepad): void {
        if (gamepad instanceof GenericPad) {

        }
    }
}