export interface IWriteOptions {
    encoding?: string;
    mode?: number | string;
    flag?: string;
}
export default function (path: string, data: any, options?: IWriteOptions): Promise<void>;
