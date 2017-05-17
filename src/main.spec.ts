import test from "ava";
import * as Vinyl from "vinyl";
import {parse, join} from "path";
import {readFileAsync, statAsync} from "./util/node/fs";
import loadTasks from "./main";
import globAsync from "./util/glob/globAsync";
import "./util/shim";
import gulp = require("gulp");

async function readVinylFileTree(src: string, vinylRoot: string) {
    let paths = await globAsync(src);
    return await paths.mapAsync(async (path) => {
        let stats = await statAsync(path);
        if (stats.isDirectory()) {

        }
        return await readVinylFile(path, join(vinylRoot, path));
    });
}

async function readVinylFile(srcPath: string, vinylPath: string) {
    let data = {
        contents: await readFileAsync(srcPath),
        stat: await statAsync(srcPath)
    };
    let fileOptions = parse(vinylPath);
    return new Vinyl({
        base: fileOptions.base,
        cwd: ".",
        path: vinylPath,
        contents: Buffer.from(data.contents),
        stat: data.stat
    });
}

test("loadsAllTasksInDirectory", async (assert) => {
    await loadTasks({
        rootDir: "test/subtasks",
        gulp: gulp
    });
    console.log("executing task...");
    gulp.run("annotate:docs:comment");
});