import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import {
    Box,
    Button,
    CircularProgress,
    Label,
} from "resource:///com/github/Aylur/ags/widget.js";
import { showHardwareMenu } from "./all";

export const RamWidget = () => {
    const label = Label({
        className: "ram-inner",
        label: "",
    });

    const values = Label({
        className: "RamWidget__values",
        label: "",
    });

    const progress = CircularProgress({
        className: "ram",
        startAt: 0,
        rounded: false,
        // inverted: true,
        child: Button({
            className: "unset no-hover",
            child: label,
            onClicked: () => showHardwareMenu(),
        }),
    });

    return Box({
        className: "bar-hw-ram-box",
        spacing: 3,
        children: [progress, values],
    }).poll(5000, box => {
        execAsync(`/home/${Utils.USER}/.config/ags/scripts/ram.sh`)
            .then(val => {
                progress.value = Number(val) / 100;
                label.tooltipMarkup = `<span weight='bold' foreground='#79A7EC'>(${val}%) RAM used</span>`;
                values.label = val.toString();
            })
            .catch(print);

        // box.children = [progress];
        box.show_all();
    });
};
