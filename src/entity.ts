import { GameState } from "./gamestate"

export class Entity {

    constructor(protected state: GameState, 
        protected root: any,
        protected app: any) {
        

    }

    public update(delta: number): void {

    }
}