import { Popup } from "./Popup";

import "./style.scss";
import { Variable as GtkVar } from "@/types/variable";
import config from "config.json";
import { useIntervalVar } from "@/lib/hooks";
import Gtk30 from "gi://Gtk?version=3.0";

const WorldTime = ({ date }: { date: GtkVar<Date> }) =>
    Widget.Box({
        vertical: true,
        spacing: 2,
        children: config.time.timezones.map(tz =>
            Widget.Box({
                className: "calendar-menu__worldtime",
                children: [
                    Widget.Label({
                        className: "calendar-menu__worldtime__time",
                        label: date.bind().as(d =>
                            d.toLocaleTimeString(config.time.locale, {
                                timeZone: tz,
                            }),
                        ),
                    }),
                    Widget.Box({ hexpand: true }),
                    Widget.Label({
                        className: "calendar-menu__worldtime__city",
                        label: tz.slice(tz.indexOf("/") + 1),
                    }),
                ],
            }),
        ),
    });

export const CalendarMenu = () => {
    const {
        start,
        stop,
        variable: date,
    } = useIntervalVar({
        factory: () => new Date(),
        interval: 1000,
        initialState: false,
    });

    const calendar = Widget.Calendar({
        expand: true,
        className: "calendar",
    });

    return Popup({
        anchor: ["bottom", "right"],
        name: "calendar-menu",
        margins: [40, 50],

        onOpen: () => {
            start();
            calendar.day = date.value.getDate();
            calendar.month = date.value.getMonth();
            calendar.year = date.value.getFullYear();
        },
        onClose: stop,

        child: Widget.Box({
            vertical: true,
            spacing: 4,
            className: "menu calendar-menu",
            children: [
                Widget.Box({
                    className: "calendar-menu__clock",
                    spacing: 4,
                    children: [
                        Widget.Label({
                            className: "calendar-menu__clock__time",
                            label: date
                                .bind()
                                .as(d =>
                                    d.toLocaleTimeString(config.time.locale),
                                ),
                        }),
                        Widget.Box({
                            hexpand: true,
                        }),
                        Widget.Label({
                            className: "calendar-menu__clock__date",
                            label: date
                                .bind()
                                .as(d =>
                                    d.toLocaleDateString(config.time.locale),
                                ),
                        }),
                    ],
                }),
                WorldTime({ date }),
                Widget.Box({
                    className: "calendar-menu__separator",
                    hexpand: true,
                }),
                calendar,
            ],
        }),
    });
};
