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
        label: "",
    });

    const button = Button({
        className: "unset no-hover",
        child: label,
        onClicked: () => showHardwareMenu(),
    });

    // const values = Label({
    //     className: "CpuWidget__values",
    //     label: "",
    // });

    const progress = CircularProgress({
        className: "cpu",
        child: button,
        startAt: 0,
        rounded: false,
        // inverted: true,
    });

    return Box({
        className: "bar-hw-cpu-box",
        spacing: 3,
        children: [progress],
    }).poll(3000, box => {
        execAsync(`/home/${Utils.USER}/.config/ags/scripts/cpu.sh`)
            .then(val => {
                progress.value = Number(val) / 100;
                label.tooltipMarkup = `<span weight='bold' foreground='#FDC227'>(${val}%) of CPU is used</span>`;
                // values.label = Math.round(parseFloat(val)).toString();
            })
            .catch(print);
        box.show_all();
    });
};
