"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const rmDirAsync_1 = require("./rmDirAsync");
const unlinkAsync_1 = require("./unlinkAsync");
const readDirAsync_1 = require("./readDirAsync");
const statAsync_1 = require("./statAsync");
const path_1 = require("path");
require("../../shim/array/forEachAsync");
function rmRecursiveAsync(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield readDirAsync_1.default(path);
        yield entries.forEachAsync((entry) => __awaiter(this, void 0, void 0, function* () {
            const entryPath = path_1.normalize(path.toString() + path_1.sep + entry);
            const stat = yield statAsync_1.default(entryPath);
            if (stat.isDirectory()) {
                yield rmRecursiveAsync(entryPath);
            }
            else {
                yield unlinkAsync_1.default(entryPath);
            }
        }));
        yield rmDirAsync_1.default(path_1.normalize(path.toString()));
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rmRecursiveAsync;
//# sourceMappingURL=rmRecursiveAsync.js.map