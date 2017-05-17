declare global  {
    interface Array<T> {
        mapAsync<R, S>(callback: (this: S, item?: T, index?: number, array?: this) => Promise<R>, thisArg?: S): Promise<Array<R>>;
    }
}
export {  };
export {};
