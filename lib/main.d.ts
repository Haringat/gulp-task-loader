import gulp = require("gulp");
import { Options, Module } from "./types";
import "./util/shim";
export { Options, Module };
export default function (options: Options): Promise<typeof gulp>;
