declare global  {
    interface Array<T> {
        reduceRightAsync<R>(callback: (accumulator: R, currentValue?: T, currentIndex?: number, array?: this) => Promise<R>, initialValue?: R): Promise<R>;
    }
}
export {  };
export {};
