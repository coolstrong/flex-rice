import { G } from "@mobily/ts-belt";
import { Option } from "@mobily/ts-belt/Option";

export const undef = undefined;

export const optArr = <T>(condition: boolean, arr: T[]) =>
    condition ? arr : [];

export const E = G.isNotNullable;

/**
 * This function replaces "as const" annotation on arrays (as I consider it clumsy)
 */
export const tuple = <const T>(...items: T[]) => items;

export const raise = (e: unknown) => {
    throw e;
};

export const assert = <T>(
    value: Option<T>,
    message = "Value was null or undefined",
) => (E(value) ? value : raise(new Error(message)));
