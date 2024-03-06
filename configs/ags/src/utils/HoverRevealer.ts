import { timeout } from "resource:///com/github/Aylur/ags/utils.js";
import {
    Box,
    EventBox,
    Revealer,
} from "resource:///com/github/Aylur/ags/widget.js";

export default ({
    boxClass,
    indicator,
    child,
    direction = "left" as "left" | "right" | "down" | "up",
    duration = 500,
    ...rest
}) => {
    let open = false;
    const vertical = direction === "down" || direction === "up";
    const posStart = direction === "down" || direction === "right";
    const posEnd = direction === "up" || direction === "left";

    const revealer = Revealer({
        transition: `slide_${direction}`,
        transitionDuration: duration,
        child,
    });

    const box = EventBox({
        ...rest,
        onHover: () => {
            if (open) return;

            revealer.revealChild = true;
            timeout(duration, () => (open = true));
        },
        onHoverLost: () => {
            if (!open) return;

            revealer.revealChild = false;
            open = false;
        },
        child: Box({
            vertical,
            className: boxClass,
            children: [posStart && indicator, revealer, posEnd && indicator],
        }),
    });

    return Box({
        children: [box],
    });
};
