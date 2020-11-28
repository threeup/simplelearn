import * as PIXI from "pixi.js-legacy";

import { IObserver } from "./basetypes"

export enum CommonState {
    None = 0,
    Exist,
    Loaded,
    Empty,
    InProgress,
    Shutdown
}


export class Common {

    public alphaMap: Map<string, string>;
    public targetMap: Map<string, any>;
    public commonState: CommonState;
    public targetRemaining: string | null;
    public targetIndex: number;
    public score: number;

    protected loader: PIXI.Loader = new PIXI.Loader();
    protected observerList: IObserver[] = [];

    constructor() {
        this.commonState = CommonState.Exist;
        this.targetRemaining = null;
        this.targetIndex = 0;
        this.score = 0;

        this.alphaMap = new Map;
        this.targetMap = new Map;
        this.loadFirst();
    }
    private loadFirst(): void {
        this.loader.add('alphaData', 'assets/splitfontdata.json');
        this.loader.add('targetData', 'targetwords/targetwords.json');
        this.observerList.forEach(o => o.commonChanged(this.commonState))
        this.loader.load((loader: PIXI.Loader, resources: any) => {
            var alphaData = resources['alphaData'].data;
            var resTarget = resources['targetData'].data;
            for (var elementName in alphaData.elements) {
                let el = alphaData.elements[elementName];
                this.alphaMap.set(el.text, el.img);
            }
            var categoryNames: Array<string> = new Array;
            for (var categoryNumber in resTarget.categories) {
                var cc = resTarget.categories[categoryNumber];
                categoryNames.push(cc.text);
            }
            this.loadSecond(categoryNames);
        });
    }

    private loadSecond(categoryNames: any): void {
        for (var idx in categoryNames) {
            var categoryName = categoryNames[idx];
            var categoryPath = 'targetwords/' + categoryName + 'data.json';
            this.loader.add(categoryName, categoryPath);
        }
        this.loader.load((loader: PIXI.Loader, resources: any) => {
            for (var idx in categoryNames) {
                var categoryName = categoryNames[idx];
                var resCategory = resources[categoryName].data;
                this.targetMap.set(categoryName, resCategory);
            }
            this.setState(CommonState.Loaded);
            this.checkComplete();
        });
    }

    public setState(state: CommonState): void {
        this.commonState = state;
        this.observerList.forEach(o => o.commonChanged(this.commonState));
    }

    public setTarget(target: string): void {
        this.targetIndex = 0;
        this.targetRemaining = target;
    }

    public observe(observer: IObserver): void {
        this.observerList.push(observer);
        observer.commonChanged(this.commonState);
    }

    public targetConsume(): void {

        var consume = true;
        while (this.targetRemaining !== null && consume) {
            this.targetIndex += 1;
            this.targetRemaining = this.targetRemaining.slice(1);
            var next = this.targetRemaining.charCodeAt(0);
            if (next >= 47 && next <= 57) {
                consume = false;
            }
            if (next >= 97 && next <= 122) {
                consume = false;
            }

            if (this.targetRemaining.length === 0) {
                this.targetRemaining = null;
            }
        }

    }

    public checkComplete(): void {
        if (this.targetRemaining === null) {
            this.score += 1;
            console.log(this.score);
            if (this.score == 15) {
                this.setState(CommonState.Shutdown);
            }
            else {
                this.setState(CommonState.Empty);
            }

        }
    }

    public getTargetCoord(idx?: number): [number, number] {
        idx = idx ?? this.targetIndex;
        var posX = 145 + idx * 45;
        var posY = 80;
        return [posX, posY];
    }

}