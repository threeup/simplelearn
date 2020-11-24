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

    public alphaData: any;
    public targetData: any;
    public alphaMap: Map<string, string>;
    public commonState: CommonState;
    public targetRemaining: string | null;
    public targetIndex: number;

    protected loader: PIXI.Loader = new PIXI.Loader();
    protected observerList: IObserver[] = [];

    constructor() {
        this.commonState = CommonState.Exist;
        this.targetRemaining = null;
        this.targetIndex = 0;

        this.alphaMap = new Map;
        this.loader.add('alphaData', 'assets/alphadata.json');
        this.loader.add('targetWordData', 'assets/objectdata.json');
        this.observerList.forEach(o => o.commonChanged(this.commonState))
        this.loader.load((loader: PIXI.Loader, resources: any) => {
            this.alphaData = resources.alphaData.data;
            this.targetData = resources.targetWordData.data;
            for (var elementName in this.alphaData.elements) {
                let el = this.alphaData.elements[elementName];
                this.alphaMap.set(el.text, el.img);
            }

            this.setState(CommonState.Loaded);
            this.setState(CommonState.Empty);
        })
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
        this.targetIndex += 1;
        this.targetRemaining = this.targetRemaining.slice(1);
        if (this.targetRemaining.length === 0) {
            this.targetRemaining = null;
            this.setState(CommonState.Empty);
        }
    }

    public getTargetCoord(idx?: number): [number,number] {
        idx = idx ?? this.targetIndex;
        var posX = 145 + idx * 45;
        var posY = 80;
        return [posX, posY];
    }

}