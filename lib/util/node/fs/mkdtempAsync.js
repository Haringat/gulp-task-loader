"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const process = require("process");
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        let prefix = `${path_1.normalize(os_1.tmpdir())}${path_1.sep}`;
        if (process.argv0) {
            prefix += `${path_1.parse(process.argv0).base}-`;
        }
        return yield new Promise((resolve, reject) => {
            fs_1.mkdtemp(prefix, (error, dirName) => {
                if (error) {
                    reject(error);
                }
                resolve(dirName);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=mkdtempAsync.js.map