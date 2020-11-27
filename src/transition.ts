import { Transform } from "./basetypes"

export class Transition {
    public id: number;
    public after: number[];
    public startTform: Transform | null;
    public startTint: number | null;
    public endTform: Transform | null;
    public endTint: number | null;
    private progress: number;
    public duration: number;
    public dead: boolean;
    public setTform: (tform: Transform) => void;
    public setTint: (tint: number) => void;
    public onDead: () => void;

    constructor(duration: number) {
        this.progress = 0;
        this.duration = duration;
    }


    public static lerp(valA: number, valB: number, interval: number) {
        return (1 - interval) * valA + interval * valB;
    }

    public die(): void {
        this.dead = true;
        if(this.onDead) {
            this.onDead();
        }
    }

    public isDead(): boolean {
        return this.dead === true;
    }


    public update(deltaTime: number): void {
        this.progress += deltaTime;
        var interval = this.progress / this.duration;
        var x = null;
        var y = null;
        var sx = null;
        var sy = null;
        if (this.setTform && this.startTform && this.endTform) {
            
            if (this.startTform.posX != this.endTform.posX) {
                x = Transition.lerp(this.startTform.posX, this.endTform.posX, interval);
            }
            if (this.startTform.posY != this.endTform.posY) {
                y = Transition.lerp(this.startTform.posY, this.endTform.posY, interval);
            }
            if (this.startTform.scaleX != this.endTform.scaleX) {
                sx = Transition.lerp(this.startTform.scaleX, this.endTform.scaleX, interval);
            }
            if (this.startTform.scaleY != this.endTform.scaleY) {
                sy = Transition.lerp(this.startTform.scaleY, this.endTform.scaleY, interval);
            }
            this.setTform({ posX: x, posY: y, scaleX: sx, scaleY: sy });
        }
        if (this.setTint && this.startTint != this.endTint) {
            this.setTint(Transition.lerp(this.startTint, this.endTint, interval));
        }
        if (interval > 1.0) {
            if (this.setTform && this.endTform) {
                x = this.endTform.posX;
                y = this.endTform.posY;
                sx = this.endTform.scaleX;
                sy = this.endTform.scaleY;
                this.setTform({ posX: x, posY: y, scaleX: sx, scaleY: sy });
            }
            if (this.setTint && this.startTint != this.endTint) {
                this.setTint(this.endTint);
            }
            this.die();
        }
    }
} 