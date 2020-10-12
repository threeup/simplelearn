import * as PIXI from "pixi.js-legacy";
import { GameState } from "./gamestate"
import { Entity } from "./entity"

export class Target extends Entity {
    public loader: PIXI.Loader = new PIXI.Loader();
    public sprite: PIXI.Sprite;
    public targetData: any;
    public elements: any;

    constructor(protected state: GameState, 
        protected root: any,
        protected app: any) {
        super(state, root, app);

        var rootContainer: PIXI.Container = root;
        this.loader.add('targetWordData', 'assets/targetwords.json');
        this.loader.load((loader: PIXI.Loader, resources: any) => {
            this.targetData = resources.targetWordData.data;
            this.elements = this.targetData.elements;

            console.log("targetData",this.targetData);
            console.log("elements",this.elements);
            var data = this.elements[1];
            this.sprite = PIXI.Sprite.from(data.img);
            this.sprite.zIndex = -1;
            this.sprite.scale = new PIXI.Point(0.2, 0.2);
            this.sprite.x = 500 * Math.random();
            this.sprite.y = 300;

            rootContainer.addChild(this.sprite);
        })
    }

    public randRange(min: number, max: number): number {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }

    public refresh(): void {
        var idx = this.randRange(0, 10);
        var data = this.elements[idx];
        
        this.sprite.texture = PIXI.Texture.from(data.img);
    }

    public update(delta: number): void {
        if(this.state.isKeyPressed('a')) {
            this.refresh();
        }
    }
}