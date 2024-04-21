import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import {
    Button,
    CircularProgress,
    Label,
} from "resource:///com/github/Aylur/ags/widget.js";
import { showHardwareMenu } from "./all";

export const BatteryWidget = () => {
    const label = Label({
        className: "battery-inner",
        label: "",
    });

    const button = Button({
        className: "unset no-hover",
        child: label,
        onClicked: () => showHardwareMenu(),
    });

    return CircularProgress({
        className: "battery",
        child: button,
        startAt: 0,
        rounded: false,
        // inverted: true,
    }).hook(Battery, batteryProgress => {
        if (Battery.charging) {
            label.class_name = "battery-inner-charging";
        } else {
            label.class_name = "battery-inner";
        }
        batteryProgress.value = Battery.percent / 100;

        if (!Battery.charging && Battery.percent <= 10)
            Utils.notify(
                "Battery charge is below 10%",
                "Battery charge reached critical level. Please put laptop on charge.",
                "battery-010",
            );

        label.tooltipMarkup = `<span weight='bold' foreground='#FF8580'>Battery percentage (${Battery.percent}%)</span>`;
    });
};
