import {mkdir} from "fs";

export default async function(path: string) {
    return await new Promise<void>((resolve, reject) => {
        mkdir(path, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}