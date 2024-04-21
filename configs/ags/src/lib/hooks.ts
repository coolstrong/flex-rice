import { undef } from "@/utils/common";
import Service from "@/types/service";
import { Widget } from "@/types/widgets/widget";
import Gtk from "@/types/@girs/gtk-3.0";

export const useUpdatableVar = <T>(
    factory: () => T,
    initial: T | undef = undef,
) => {
    const variable = Variable(initial ?? factory());
    return {
        variable,
        update: () => (variable.value = factory()),
    };
};

export const setupRebuild =
    <const T extends Gtk.Widget[]>({
        builder,
        service,
        signal,
    }: {
        builder: () => T;
        service: Service;
        signal: string | undef;
    }) =>
    (self: Widget<unknown> & { children: T }) => {
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
