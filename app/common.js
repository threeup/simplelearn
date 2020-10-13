"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = exports.CommonState = exports.IObserver = void 0;
const PIXI = require("pixi.js-legacy");
class IObserver {
}
exports.IObserver = IObserver;
var CommonState;
(function (CommonState) {
    CommonState[CommonState["None"] = 0] = "None";
    CommonState[CommonState["Exist"] = 1] = "Exist";
    CommonState[CommonState["Loaded"] = 2] = "Loaded";
    CommonState[CommonState["Dead"] = 3] = "Dead";
})(CommonState = exports.CommonState || (exports.CommonState = {}));
class Common {
    constructor() {
        this.loader = new PIXI.Loader();
        this.observerList = [];
        this.commonState = CommonState.Exist;
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
            this.commonState = CommonState.Loaded;
            this.observerList.forEach(o => o.commonChanged(this.commonState));
        });
    }
    observe(observer) {
        this.observerList.push(observer);
    }
}
exports.Common = Common;
//# sourceMappingURL=common.js.map