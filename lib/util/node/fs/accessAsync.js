"use strict";
const fs_1 = require("fs");
const callbackFactory = function (resolve, reject) {
    return (err) => {
        if (err) {
            reject(err);
        }
        else {
            resolve();
        }
    };
};
function existsAsync(path, mode) {
    return new Promise((resolve, reject) => {
        if (mode) {
            fs_1.access(path, mode, callbackFactory(resolve, reject));
        }
        else {
            fs_1.access(path, callbackFactory(resolve, reject));
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = existsAsync;
//# sourceMappingURL=accessAsync.js.map