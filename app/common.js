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
        this.score = 0;
        this.alphaMap = new Map;
        this.targetMap = new Map;
        this.loadFirst();
    }
    loadFirst() {
        this.loader.add('overpassthree', 'assets/overpass32.fnt');
        this.loader.add('overpasssix', 'assets/overpass64.fnt');
        this.loader.add('whiterabt', 'assets/whiterabt.fnt');
        this.loader.add('alphaData', 'assets/splitfontdata.json');
        this.loader.add('targetData', 'targetwords/targetwords.json');
        this.observerList.forEach(o => o.commonChanged(this.commonState));
        this.loader.load((loader, resources) => {
            var alphaData = resources['alphaData'].data;
            var resTarget = resources['targetData'].data;
            for (var elementName in alphaData.elements) {
                let el = alphaData.elements[elementName];
                this.alphaMap.set(el.text, el.img);
            }
            var categoryNames = new Array;
            for (var categoryNumber in resTarget.categories) {
                var cc = resTarget.categories[categoryNumber];
                categoryNames.push(cc.text);
            }
            this.loadSecond(categoryNames);
        });
    }
    loadSecond(categoryNames) {
        for (var idx in categoryNames) {
            var categoryName = categoryNames[idx];
            var categoryPath = 'targetwords/' + categoryName + 'data.json';
            this.loader.add(categoryName, categoryPath);
        }
        this.loader.load((loader, resources) => {
            for (var idx in categoryNames) {
                var categoryName = categoryNames[idx];
                var resCategory = resources[categoryName].data;
                this.targetMap.set(categoryName, resCategory);
            }
            this.setState(CommonState.Loaded);
            this.checkComplete();
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
    checkComplete() {
        if (this.targetRemaining === null) {
            this.score += 1;
            if (this.score == 15) {
                this.setState(CommonState.Shutdown);
            }
            else {
                this.setState(CommonState.Empty);
            }
        }
    }
    getTargetCoord(idx) {
        idx = idx !== null && idx !== void 0 ? idx : this.targetIndex;
        var posX = 175 + idx * 42;
        var posY = 50;
        return [posX, posY];
    }
}
exports.Common = Common;
//# sourceMappingURL=common.js.map