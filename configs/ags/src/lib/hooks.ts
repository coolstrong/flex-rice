import { undef } from "@/utils/common";
import Service from "@/types/service";
import { Widget } from "@/types/widgets/widget";
import GLib20 from "gi://GLib?version=2.0";

export const useUpdatableVar = <T>(
    factory: () => T,
    initial: T | undef = undef,
    isDistinct?: (x: T, y: T) => boolean,
) => {
    const variable = Variable(initial ?? factory());
    return {
        variable,
        update: () => {
            const newVal = factory();
            if (isDistinct?.(variable.value, newVal) ?? true)
                variable.value = newVal;
        },
    };
};

export const useIntervalVar = <T>({
    factory,
    interval,
    initialState = true,
}: {
    factory: () => T;
    interval: number;
    initialState?: boolean;
}) => {
    const { update, variable } = useUpdatableVar(factory);
    let timerid: number | null = initialState
        ? Utils.interval(interval, update)
        : null;

    return {
        variable,
        update,
        stop: () => {
            if (timerid) {
                GLib20.source_remove(timerid);
                timerid = null;
            }
        },
        start: () => {
            if (!timerid) timerid = Utils.interval(interval, update);
        },
    };
};

export const setupRebuild =
    <const T extends Widget<unknown> & { destroy: () => void }>({
        builder,
        service,
        signal,
    }: {
        builder: () => T[];
        service: Service;
        signal: string | undef;
    }) =>
    (self: Widget<unknown> & { children: T[] }) => {
        self.children = builder();
        self.hook(
            service,
            () => {
                self.children.forEach(c => c.destroy());
                self.children = builder();
            },
            signal,
        );
    };
