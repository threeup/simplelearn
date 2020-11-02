import { Transform } from "./basetypes"

export class Transition {
    public id: number;
    public after: number[];
    public startPos: Transform | null;
    public startTint: number | null;
    public endPos: Transform | null;
    public endTint: number | null;
    private progress: number;
    public duration: number;
    public dead: boolean;
    public setPos: (pos: Transform) => void;
    public setTint: (tint: number) => void;

    constructor(duration: number) {
        this.progress = 0;
        this.duration = duration;
    }


    public static lerp(valA: number, valB: number, interval: number) {
        return (1 - interval) * valA + interval * valB;
    }

    public die(): void {
        this.dead = true;
    }

    public isDead(): boolean {
        return this.dead === true;
    }


    public update(delta: number): void {
        this.progress += delta;
        var interval = this.progress / this.duration;
        if (this.startPos && this.endPos && this.setPos) {
            const x = Transition.lerp(this.startPos.posX, this.endPos.posX, interval);
            const y = Transition.lerp(this.startPos.posY, this.endPos.posY, interval);
            this.setPos({posX:x, posY:y, scaleX:null, scaleY:null});
        }
        if (this.startTint && this.endTint && this.setTint) {
            this.setTint(Transition.lerp(this.startTint, this.endTint, interval));
        }
        if (interval > 1.0) {
            this.dead = true;
        }
    }
}