/// <reference path="../node_modules/typings-npm-gulp/3.9.1/index.d.ts" />
import { Gulp } from "gulp";
export interface Module {
    fn?: (done?: Function) => NodeJS.WritableStream;
    dependencies?: Array<string>;
    default?: Module;
}
export interface Options {
    rootDir?: string;
    extensions?: Array<string>;
    gulp?: typeof Gulp.prototype;
}
