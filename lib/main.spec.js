"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ava_1 = require("ava");
const Vinyl = require("vinyl");
const path_1 = require("path");
const fs_1 = require("./util/node/fs");
const main_1 = require("./main");
const globAsync_1 = require("./util/glob/globAsync");
require("./util/shim");
const gulp = require("gulp");
function readVinylFileTree(src, vinylRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        let paths = yield globAsync_1.default(src);
        return yield paths.mapAsync((path) => __awaiter(this, void 0, void 0, function* () {
            let stats = yield fs_1.statAsync(path);
            if (stats.isDirectory()) {
            }
            return yield readVinylFile(path, path_1.join(vinylRoot, path));
        }));
    });
}
function readVinylFile(srcPath, vinylPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = {
            contents: yield fs_1.readFileAsync(srcPath),
            stat: yield fs_1.statAsync(srcPath)
        };
        let fileOptions = path_1.parse(vinylPath);
        return new Vinyl({
            base: fileOptions.base,
            cwd: ".",
            path: vinylPath,
            contents: Buffer.from(data.contents),
            stat: data.stat
        });
    });
}
ava_1.default("loadsAllTasksInDirectory", (assert) => __awaiter(this, void 0, void 0, function* () {
    yield main_1.default({
        rootDir: "test/subtasks",
        gulp: gulp
    });
    console.log("executing task...");
    gulp.run("annotate:docs:comment");
}));
//# sourceMappingURL=main.spec.js.map