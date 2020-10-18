import * as PIXI from "pixi.js-legacy";
import { Common } from "./common"


export abstract class Lib {

    public static wordStep:number = 50;

    public static makeHeader(img: string, startX: number, startY: number) {
        var headerSprite = PIXI.Sprite.from(img);
        headerSprite.zIndex = -1;
        headerSprite.scale = new PIXI.Point(0.2, 0.2);
        headerSprite.x = startX;
        headerSprite.y = startY;
        return headerSprite;
    }

    public static makeWord(word: string, startX: number, startY: number, tint: number, common: Common): PIXI.Sprite[] {
        const chars: string[] = [...word];
        var result: PIXI.Sprite[] = [];
        var xPosition: number = startX;
        chars.forEach(char => {
            console.log(char);
            var charValue = common.alphaMap.get(char);
            console.log(charValue);
            if (charValue !== undefined) {
                var sprite = PIXI.Sprite.from(charValue);
                sprite.zIndex = -1;
                sprite.scale = new PIXI.Point(0.10, 0.10);
                sprite.x = xPosition;
                sprite.y = startY;
                sprite.tint = tint;
                result.push(sprite);
            }
            xPosition += Lib.wordStep;

        });

        return result;
    }

}