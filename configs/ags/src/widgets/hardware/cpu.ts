import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import {
    Box,
    Button,
    CircularProgress,
    Label,
} from "resource:///com/github/Aylur/ags/widget.js";
import { showHardwareMenu } from "./all";

export const CpuWidget = () => {
    const label = Label({
        className: "cpu-inner",
        label: "",
    });

    const button = Button({
        className: "unset no-hover",
        child: label,
        onClicked: () => showHardwareMenu(),
    });

    const progress = CircularProgress({
        className: "cpu",
        child: button,
        startAt: 0,
        rounded: false,
        // inverted: true,
    });

    return Box({
        className: "bar-hw-cpu-box",
    }).poll(1000, box => {
        execAsync(`/home/${Utils.USER}/.config/ags/scripts/cpu.sh`)
            .then(val => {
                progress.value = Number(val) / 100;
                label.tooltipMarkup = `<span weight='bold' foreground='#FDC227'>(${val}%) of CPU is used</span>`;
            })
            .catch(print);
        box.children = [progress];
        box.show_all();
    });
};
