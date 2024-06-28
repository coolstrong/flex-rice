import { Popup } from "./Popup";

import "./style.scss";
import { D } from "@mobily/ts-belt";
import { Variable as GtkVar } from "@/types/variable";
import config from "config.json";
import { useIntervalVar } from "@/lib/hooks";

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

    return Popup({
        anchor: ["bottom", "right"],
        name: "calendar-menu",
        margins: [40, 50],

        onOpen: start,
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
                Widget.Calendar({
                    expand: true,
                    className: "calendar",
                    year: date.bind().as(d => d.getFullYear()),
                    month: date.bind().as(d => d.getMonth()),
                    day: date.bind().as(d => d.getDate()),
                }),
            ],
        }),
    });
};
