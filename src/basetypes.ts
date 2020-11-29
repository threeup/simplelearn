
import { CommonState } from "./common"

export interface Transform {
    posX: number,
    posY: number,
    scaleX?: number,
    scaleY?: number,
}

export interface IUpdater {
    update(delta: number): void;
    die(): void;
    isDead(): boolean;
}

export interface IObserver {
    commonChanged(commonState: CommonState): void
}