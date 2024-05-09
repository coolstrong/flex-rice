import type { WindowProps } from "@/types/widgets/window";
import { F } from "@mobily/ts-belt";
import config from "config";
import { match, P } from "ts-pattern";

type PopupRevealerProps = {
    name: string;
    child: WindowProps["child"];
    transition: Transition;
    onOpen?: () => void;
    onClose?: () => void;
};
const PopupRevealer = ({
    child,
    name,
    transition,
    onOpen,
    onClose,
}: PopupRevealerProps) =>
    Widget.Revealer({
        transition,
        child,
        transitionDuration: config.transitionDuration,

        setup: self =>
            self.hook(
                App,
                (_, ...args) =>
                    match(args).with([name, P.boolean], ([_, visible]) => {
                        visible ? onOpen?.() : onClose?.();
                        self.revealChild = visible;
                    }),
                "window-toggled"
            ),
    });

export const Popup = ({
    transition,
    name,
    child,
    onOpen,
    onClose,
    ...props
}: WindowProps & {
    name: string;
    transition: Transition;
    onOpen?: () => void;
    onClose?: () => void;
}) => {
    const closing = F.makeControlledDebounce(() => App.closeWindow(name), {
        delay: config.popupCloseDelay,
        leading: false,
    });

    return Widget.Window({
        exclusivity: "ignore",
        name,
        focusable: true,
        monitor: 0,
        visible: false,
        ...props,
        setup: w => w.keybind("Escape", closing.invoke),
        keymode: "on-demand",
        child: Widget.Box({
            css: `min-height: 2px;`,
            child: Widget.EventBox({
                onHover: closing.cancel,
                child: PopupRevealer({
                    transition,
                    name,
                    child,
                    onOpen,
                    onClose,
                }),
            }),
        }),
    }).on("leave-notify-event", closing.schedule);
};
