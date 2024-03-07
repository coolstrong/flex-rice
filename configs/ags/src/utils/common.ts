import { G } from "@mobily/ts-belt";

export const undef = undefined;

export const optArr = <T>(condition: boolean, arr: T[]) =>
    condition ? arr : [];

export const E = G.isNotNullable;

/**
 * This function replaces "as const" annotation on arrays (as I consider it clumsy)
 */
export const tuple = <const T>(...items: T[]) => items;
