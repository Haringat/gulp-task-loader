import rmDirAsync from "./rmDirAsync";
import unlinkAsync from "./unlinkAsync";
import readDirAsync from "./readDirAsync";
import statAsync from "./statAsync";
import {sep, normalize} from "path";
import "../../shim/array/forEachAsync";

export default async function rmRecursiveAsync(path: string | Buffer) {
    const entries = await readDirAsync(path);
    await entries.forEachAsync(async (entry) => {
        const entryPath = normalize(path.toString() + sep + entry);
        const stat = await statAsync(entryPath);
        if (stat.isDirectory()) {
            await rmRecursiveAsync(entryPath);
        } else {
            await unlinkAsync(entryPath);
        }
    });
    await rmDirAsync(normalize(path.toString()));
}