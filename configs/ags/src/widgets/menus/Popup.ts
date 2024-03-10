import type { WindowProps } from "@/types/widgets/window";
import { F } from "@mobily/ts-belt";
import config from "config";
import { P, match } from "ts-pattern";

type PopupRevealerProps = {
    name: string;
    child: WindowProps["child"];
    transition: Transition;
};
const PopupRevealer = ({ child, name, transition }: PopupRevealerProps) =>
    Widget.Revealer({
        transition,
        child,
        transitionDuration: config.transitionDuration,

        setup: self =>
            self.hook(
                App,
                (_, ...args) =>
                    match(args).with(
                        [name, P.boolean],
                        ([_, visible]) => (self.revealChild = visible)
                    ),
                "window-toggled"
            ),
    });

export const Popup = ({
    transition,
    name,
    child,
    ...props
}: WindowProps & { name: string; transition: Transition }) => {
    const closing = F.makeControlledDebounce(() => App.closeWindow(name), {
        delay: config.popupCloseDelay,
        leading: false,
    });

    return Widget.Window({
        exclusivity: "ignore",
        name,
        visible: false,
        ...props,
        setup: w => w.keybind("Escape", closing.invoke),
        keymode: "on-demand",
        child: Widget.Box({
            css: `min-height: 2px;`,
            child: PopupRevealer({
                transition,
                name,
                child: Widget.EventBox({
                    onHoverLost: closing.schedule,
                    onHover: closing.cancel,
                    child,
                    css: `min-height: 2px;`
                }),
            })
        }),
    });
};
