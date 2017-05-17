import {join, sep} from "path";
import gulp = require("gulp");
import {Options, Module} from "./types";
import {statAsync, readDirAsync} from "./util/node/fs";
import "./util/shim";

export {Options, Module};

type Gulp = typeof gulp;

type Mod = Module & {
    name?: string,
    default?: {
        name?: string
    }
};

export default async function (options: Options): Promise<typeof gulp> {
    let start = new Date();
    options.rootDir = options.rootDir || "./tasks";
    options.extensions = options.extensions || [".js"];
    options.gulp = options.gulp || new gulp.Gulp();
    await loadDir(options.rootDir, options.gulp, options.rootDir);
    let end = new Date();
    console.log(`loaded tasks in ${end.valueOf() - start.valueOf()}ms`);
    return options.gulp;
}

async function loadDir(dirName: string, gulp: Gulp, rootDir: string) {
    let files = await readDirAsync(dirName);
    await files.forEachAsync(async (fileName) => {
        console.log(`rootDir: ${rootDir}`);
        console.log(`dirName: ${dirName}`);
        console.log(`fileName: ${fileName}`);
        const path = join(dirName, fileName);
        console.log(`loading module from ${path}`);
        const stats = await statAsync(path);
        if (stats.isDirectory()) {
            return await loadDir(path, gulp, rootDir);
        } else if (stats.isFile()) {
            let mod: Mod = require(path);
            if (!(mod instanceof Object)) {
                throw new Error(`task has to be an object. (path: "${path}")`);
            }
            mod = mod.default;
            mod.name = path.replace(sep, ":");
            mod.dependencies = (mod.dependencies || []).map((dep) => {
                return dependencyNameToPath(dirName, dep);
            });
            mod.fn = mod.fn || ((done: Function) => done());
            gulp.task(mod.name, mod.dependencies, mod.fn);
        }
    });
}

function dependencyNameToPath(dirName: string, dependency: string) {
    let depPath: string = "";
    if (dependency.startsWith(":")) {
        depPath += dirName;
        let m = dependency.match(/^:(:+)/);
        if (m && m[1]) {
            let upDirs = m[1].length;
            depPath += (sep + "..").repeat(upDirs);
            depPath += sep + new Array(...new Array(upDirs)).map(() => "..").join(sep);
        }
    }
    return depPath + sep + dependency.match(/([^:]+)/g).join(sep);
}