"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = exports.CommonState = void 0;
const PIXI = require("pixi.js-legacy");
var CommonState;
(function (CommonState) {
    CommonState[CommonState["None"] = 0] = "None";
    CommonState[CommonState["Exist"] = 1] = "Exist";
    CommonState[CommonState["Loaded"] = 2] = "Loaded";
    CommonState[CommonState["Empty"] = 3] = "Empty";
    CommonState[CommonState["InProgress"] = 4] = "InProgress";
    CommonState[CommonState["Shutdown"] = 5] = "Shutdown";
})(CommonState = exports.CommonState || (exports.CommonState = {}));
class Common {
    constructor() {
        this.loader = new PIXI.Loader();
        this.observerList = [];
        this.commonState = CommonState.Exist;
        this.targetRemaining = null;
        this.targetIndex = 0;
        this.alphaMap = new Map;
        this.loader.add('alphaData', 'assets/alphadata.json');
        this.loader.add('targetWordData', 'assets/objectdata.json');
        this.observerList.forEach(o => o.commonChanged(this.commonState));
        this.loader.load((loader, resources) => {
            this.alphaData = resources.alphaData.data;
            this.targetData = resources.targetWordData.data;
            for (var elementName in this.alphaData.elements) {
                let el = this.alphaData.elements[elementName];
                this.alphaMap.set(el.text, el.img);
            }
            this.setState(CommonState.Loaded);
            this.setState(CommonState.Empty);
        });
    }
    setState(state) {
        this.commonState = state;
        this.observerList.forEach(o => o.commonChanged(this.commonState));
    }
    setTarget(target) {
        this.targetIndex = 0;
        this.targetRemaining = target;
    }
    observe(observer) {
        this.observerList.push(observer);
        observer.commonChanged(this.commonState);
    }
    targetConsume() {
        this.targetIndex += 1;
        this.targetRemaining = this.targetRemaining.slice(1);
        if (this.targetRemaining.length === 0) {
            this.targetRemaining = null;
            this.setState(CommonState.Empty);
        }
    }
    getTargetCoord(idx) {
        idx = idx !== null && idx !== void 0 ? idx : this.targetIndex;
        var posX = 145 + idx * 45;
        var posY = 80;
        return [posX, posY];
    }
}
exports.Common = Common;
//# sourceMappingURL=common.js.map