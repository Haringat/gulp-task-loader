declare global  {
    interface Array<T> {
        forEachAsync<S>(callback: (this: S, item?: T, index?: number, array?: this) => Promise<void>, thisArg?: S): Promise<void>;
    }
}
export {  };
export {};
