import {writeFile} from "fs";

export interface IWriteOptions {
    encoding?: string;
    mode?: number | string;
    flag?: string;
}

export default async function(path: string, data: any, options: IWriteOptions = {}) {
    return new Promise<void>((resolve, reject) => {
        writeFile(path, data, <any> options, (error) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
}