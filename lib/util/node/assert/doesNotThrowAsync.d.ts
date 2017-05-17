export default function doesNotThrowAsync(block: () => Promise<any>, errorOrMessage: string | Function | RegExp | ((err: any) => boolean), message?: string): Promise<void>;
