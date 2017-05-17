"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Array.prototype.reduceAsync = function (callback, initialValue) {
    return __awaiter(this, void 0, void 0, function* () {
        let accumulator = initialValue || this[0];
        for (let i = initialValue ? 0 : 1; i < this.length; i++) {
            accumulator = yield callback(accumulator, this[i], i, this);
        }
        return accumulator;
    });
};
//# sourceMappingURL=reduceAsync.js.map