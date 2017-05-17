import glob = require("glob");

export default async function globAsync(pattern: string, options?: glob.IOptions) {
    return await new Promise<Array<string>>((resolve, reject) => {
        glob(pattern, options, (error, matches) => {
            if (error) {
                reject(error);
            } else {
                resolve(matches);
            }
        });
    });
}