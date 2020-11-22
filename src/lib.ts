import * as PIXI from "pixi.js-legacy";
import { Common } from "./common"
import { Entity } from "./entity"
import { Transform } from "./basetypes"


export abstract class Lib {


    public static randRange(min: number, max: number): number {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }

    public static lerp(valA: number, valB: number, interval: number) {
        return (1 - interval) * valA + interval * valB;
    }
}