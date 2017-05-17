"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const glob = require("glob");
function globAsync(pattern, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            glob(pattern, options, (error, matches) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(matches);
                }
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globAsync;
//# sourceMappingURL=globAsync.js.map