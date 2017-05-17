declare global  {
    interface Array<T> {
        everyAsync<S>(callback: (this: S, item?: T, index?: number, array?: this) => Promise<boolean>, thisArg?: S): Promise<boolean>;
    }
}
export {  };
export {};
