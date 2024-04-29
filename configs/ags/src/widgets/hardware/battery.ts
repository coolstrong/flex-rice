import clsx from "clsx";
import battery from "resource:///com/github/Aylur/ags/service/battery.js";

export const BatteryWidget = () =>
    Widget.Box({
        spacing: 2,
        children: [
            Widget.Icon({
                className: "BatteryWidget__icon",
                icon: battery.bind("icon_name"),
            }),
            Widget.Label({
                className: battery
                    .bind("charging")
                    .as(charging =>
                        clsx(
                            "BatteryWidget__label",
                            charging && "BatteryWidget__label--charging"
                        )
                    ),
                label: battery.bind("percent").as(p => p.toString()),
            }),
        ],

        tooltip_markup: battery
            .bind("percent")
            .as(
                p =>
                    `<span weight='bold' foreground='#FF8580'>Battery percentage (${p}%)</span>`
            ),
    }).hook(battery, () => {
        if (!battery.charging && battery.percent <= 10)
            Utils.notify(
                "Battery charge is below 10%",
                "Battery charge reached critical level. Please put laptop on charge.",
                "battery-010"
            );
    });
