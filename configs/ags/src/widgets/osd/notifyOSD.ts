import { Window } from "resource:///com/github/Aylur/ags/widget.js";

export const OSD = () => {
    return Window({
        name: `osd`,
        focusable: false,
        margins: [0, 0, 140, 0],
        layer: "overlay",
        anchor: [],

        child: Widget.Box({
            className: "vol-osd shadow",
            css: "min-width: 140px",
            children: [],
        }),
    });
};
