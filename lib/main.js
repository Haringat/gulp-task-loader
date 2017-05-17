"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path_1 = require("path");
const gulp = require("gulp");
const fs_1 = require("./util/node/fs");
require("./util/shim");
function default_1(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let start = new Date();
        options.rootDir = options.rootDir || "./tasks";
        options.extensions = options.extensions || [".js"];
        options.gulp = options.gulp || new gulp.Gulp();
        yield loadDir(options.rootDir, options.gulp, options.rootDir);
        let end = new Date();
        console.log(`loaded tasks in ${end.valueOf() - start.valueOf()}ms`);
        return options.gulp;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function loadDir(dirName, gulp, rootDir) {
    return __awaiter(this, void 0, void 0, function* () {
        let files = yield fs_1.readDirAsync(dirName);
        yield files.forEachAsync((fileName) => __awaiter(this, void 0, void 0, function* () {
            console.log(`rootDir: ${rootDir}`);
            console.log(`dirName: ${dirName}`);
            console.log(`fileName: ${fileName}`);
            const path = path_1.join(dirName, fileName);
            console.log(`loading module from ${path}`);
            const stats = yield fs_1.statAsync(path);
            if (stats.isDirectory()) {
                return yield loadDir(path, gulp, rootDir);
            }
            else if (stats.isFile()) {
                let mod = require(path);
                if (!(mod instanceof Object)) {
                    throw new Error(`task has to be an object. (path: "${path}")`);
                }
                mod = mod.default;
                mod.name = path.replace(path_1.sep, ":");
                mod.dependencies = (mod.dependencies || []).map((dep) => {
                    return dependencyNameToPath(dirName, dep);
                });
                mod.fn = mod.fn || ((done) => done());
                gulp.task(mod.name, mod.dependencies, mod.fn);
            }
        }));
    });
}
function dependencyNameToPath(dirName, dependency) {
    let depPath = "";
    if (dependency.startsWith(":")) {
        depPath += dirName;
        let m = dependency.match(/^:(:+)/);
        if (m && m[1]) {
            let upDirs = m[1].length;
            depPath += (path_1.sep + "..").repeat(upDirs);
            depPath += path_1.sep + new Array(...new Array(upDirs)).map(() => "..").join(path_1.sep);
        }
    }
    return depPath + path_1.sep + dependency.match(/([^:]+)/g).join(path_1.sep);
}
//# sourceMappingURL=main.js.map