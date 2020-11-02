
export interface Transform {
    posX: number,
    posY: number,
    scaleX: number,
    scaleY: number,
}

export interface Updater {
    update(delta: number): void;
    die(): void;
    isDead(): boolean;
}