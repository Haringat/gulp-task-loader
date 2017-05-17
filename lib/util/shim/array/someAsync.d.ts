declare global  {
    interface Array<T> {
        someAsync<S>(callback: (this: S, item?: T, index?: number, array?: this) => Promise<boolean>, thisArg?: S): Promise<boolean>;
    }
}
export {  };
export {};
