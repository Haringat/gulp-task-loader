/// <reference types="glob" />
import glob = require("glob");
export default function globAsync(pattern: string, options?: glob.IOptions): Promise<string[]>;
