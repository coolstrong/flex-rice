import { G } from "@mobily/ts-belt";

export const undef = undefined;

export const optArr = <T>(condition: boolean, arr: T[]) =>
    condition ? arr : [];

export const E = G.isNotNullable;
