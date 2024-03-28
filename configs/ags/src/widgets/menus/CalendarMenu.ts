import { Popup } from "./Popup";

export const CalendarMenu = () => {
    const date = Variable(new Date());

    return Popup({
        transition: "slide_up",
        anchor: ["bottom", "right"],
        name: "calendar-menu",
        margins: [40, 50],
        child: Widget.Box({
            className: "menu calendar-menu",
            child: Widget.Calendar({
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
        }),
        onOpen: () => {
            const newDate = new Date();
            if (date.value.getDay() !== newDate.getDay()) date.value = newDate;
        },
    });
};
