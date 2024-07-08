const emptySymbol = Symbol();

export class CacheContainer<T> {
    constructor(private factory: () => T) {}

    #value: typeof emptySymbol | T = emptySymbol;

    get = () =>
        this.#value === emptySymbol
            ? (this.#value = this.factory())
            : this.#value;

    invalidate = () => {
        this.#value = emptySymbol;
        return this;
    };
}
