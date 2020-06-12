/**
 * A constructor function.
 */
export interface Type<T> {
    new (...args: unknown[]): T;
}
