export class GameState {
    public isKeyDown: Map<string, boolean>;
    public wasKeyDown: Map<string, boolean>;
    public progress: number;

    constructor() {
        this.isKeyDown = new Map;
        this.wasKeyDown = new Map;
        this.progress = 0;
    }

    public isKeyPressed(key: any): boolean {
        var isDown: boolean = this.isKeyDown.get(key) == true;
        var wasDown: boolean = this.wasKeyDown.get(key) == true;
        return isDown && !wasDown;
    }

    public update(delta: number): void {

        const wasIterator = this.wasKeyDown[Symbol.iterator]();
        for (const [key, value] of wasIterator) {
            if (value) {
                this.wasKeyDown.set(key, false);
            }
        }
        const isIterator = this.isKeyDown[Symbol.iterator]();
        for (const [key, value] of isIterator) {
            if (value) {
                this.wasKeyDown.set(key, true);
            }
        }
    }

}