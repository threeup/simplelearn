import * as PIXI from "pixi.js-legacy";
import { Common } from "./common"
import { Entity } from "./entity"
import { Transform } from "./basetypes"


export abstract class Lib {

    public static wordStep: number = 50;

    public static makeHeader(parent: Entity, img: string, tr: Transform) {
        var sprite = PIXI.Sprite.from(img);
        sprite.zIndex = -1;


        var child = parent.makeChildWithSprites(Entity, [sprite]);
        child.setTransform(tr);
        return sprite;
    }

    public static makeWord(parent: Entity, word: string,
        tr: Transform, tint: number, common: Common): void {
        const chars: string[] = [...word];
        var xPosition: number = tr.posX;
        chars.forEach(char => {
            var letterTr: Transform = { posX: xPosition, posY: tr.posY, scaleX: tr.scaleX, scaleY: tr.scaleY };
            this.makeLetter(parent, char, letterTr, tint, common);
            xPosition += Lib.wordStep;
        });
        return;
    }

    public static makeLetter(parent: Entity, char: string,
        tr: Transform, tint: number, common: Common): Entity {
        const charValue: string = common.alphaMap.get(char);
        var child: Entity = null;
        if (charValue !== undefined) {
            var sprite = PIXI.Sprite.from(charValue);
            sprite.zIndex = -1;
            sprite.scale = new PIXI.Point(0.10, 0.10);
            sprite.tint = tint;
            child = parent.makeChildWithSprites(Entity, [sprite]);
            child.setTransform(tr);
        }
        return child;
    }

    public static randRange(min: number, max: number): number {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }

    public static lerp(valA: number, valB: number, interval: number) {
        return (1 - interval) * valA + interval * valB;
    }
}