import { Popup } from "./Popup";
import { utcClockVar } from "@/services/clock.ts";

import "./style.sass";
import { D } from "@mobily/ts-belt";

export const CalendarMenu = () => {
    const date = Variable(new Date());
    const clock = Utils.derive([utcClockVar], cl => {
        const [date, time] = cl.split(" | ");
        return { date: date ?? "", time: time ?? "" };
    });

    return Popup({
        transition: "slide_up",
        anchor: ["bottom", "right"],
        name: "calendar-menu",
        margins: [40, 50],

        onOpen: () => {
            const newDate = new Date();
            if (date.value.getDay() !== newDate.getDay()) date.value = newDate;
        },

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
                            label: clock.bind().as(D.getUnsafe("time")),
                        }),
                        Widget.Box({
                            hexpand: true,
                        }),
                        Widget.Label({
                            className: "calendar-menu__clock__date",
                            label: clock.bind().as(D.getUnsafe("date")),
                        }),
                    ],
                }),
                Widget.Calendar({
                    expand: true,
                    className: "calendar",
                    year: date.bind().as(d => d.getFullYear()),
                    month: date.bind().as(d => d.getMonth()),
                    day: date.bind().as(d => d.getDate()),
                    // onDaySelected: self => {
                    //     const [year, month, day] = self.get_date();
                    //     if (
                    //         month === date.value.getMonth() &&
                    //         year === date.value.getFullYear() &&
                    //     )
                    //         self.toggleClassName("calendar__active");

                    // },
                }),
            ],
        }),
    });
};
