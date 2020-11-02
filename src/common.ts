import * as PIXI from "pixi.js-legacy";

export abstract class IObserver {
    abstract commonChanged(commonState: CommonState): void
}

export enum CommonState {
    None = 0,
    Exist,
    Loaded,
    Dead
}


export class Common {

    public alphaData: any;
    public targetData: any;
    public alphaMap: Map<string, string>;
    public commonState: CommonState;
    public targetRemaining: string;

    protected loader: PIXI.Loader = new PIXI.Loader();
    protected observerList: IObserver[] = [];

    constructor() {
        this.commonState = CommonState.Exist;
        this.targetRemaining = "_";

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

            this.commonState = CommonState.Loaded;
            this.observerList.forEach(o => o.commonChanged(this.commonState));
        })
    }

    public observe(observer: IObserver): void {
        this.observerList.push(observer);
    }

}