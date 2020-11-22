"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lib = void 0;
class Lib {
    static randRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    static lerp(valA, valB, interval) {
        return (1 - interval) * valA + interval * valB;
    }
}
exports.Lib = Lib;
//# sourceMappingURL=lib.js.map