/// <reference types="node" />
import { Stats } from "fs";
export default function (path: string | Buffer): Promise<Stats>;
