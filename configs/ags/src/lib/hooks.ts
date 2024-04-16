import { undef } from "@/utils/common";

export const useUpdatableVar = <T>(
    factory: () => T,
    initial: T | undef = undef
) => {
    const variable = Variable(initial ?? factory());
    return {
        variable,
        update: () => (variable.value = factory()),
    };
};
