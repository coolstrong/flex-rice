import { E, undef } from "@/utils/common";
import Gtk from "gi://Gtk";
import {
    Box,
    Button,
    Label,
    Revealer,
    Scrollable,
    Window,
} from "resource:///com/github/Aylur/ags/widget.js";
import Notification from "../notifications/MenuNotification";
import { local } from "../utils/helpers.js";
const Notifications = await Service.import("notifications");

const NotificationsBox = () => {
    return Box({
        className: "notification-menu-header",
        vertical: true,
        children: [] as Gtk.Widget[],
    }).hook(Notifications, (self) => {
        let notificationList = [] as (Gtk.Widget | undef)[];

        const array = Notifications.notifications.reverse();

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const line =
                index !== array.length - 1
                    ? Box({
                          class_name: "horizontal-line",
                      })
                    : undef;

            notificationList.push(Notification(element), line);
        }

        let noNotifications = Box({
            vertical: true,
            className: "notification-this-is-all",
            children: [
                Label({
                    className: "no-notification-icon",
                    // label: "󰂛"
                    // label: "",
                    label: "󱇥",
                }),
                Label({
                    className: "no-notification-text",
                    label: "There are no new notifications",
                }),
            ],
        });

        if (array.length < 1) {
            notificationList.push(noNotifications);
        }

        self.children = notificationList.filter(E);
    });
};

const NotificationHeader = () => {
    return Box({
        className: "notification-header-box",
        // homogeneous: true,
        spacing: 70,
        children: [
            Button({
                className: "unset notification-center-header-clear",
                label: "",
                // label: "",
                // label: "",
                // label: "",
                // label: "",
                // label: "󰅖",
                onClicked: () => {
                    Notifications.clear();
                },
            }),
            Label({
                className: "notification-center-header-text",
                label: "Notification Center",
            }),
            Button({
                className: "unset notification-center-header-mute",
                label: "󰂚",
                onClicked: () => (Notifications.dnd = !Notifications.dnd),
                // label: "",
            }),
        ],
    }).hook(Notifications, (self) => {
        if (Notifications.dnd) {
            self.children[2].label = "󰂛";
        } else {
            self.children[2].label = "󰂚";
        }
    });
};

const notificationContainer = Scrollable({
    hscroll: "never",
    vscroll: "automatic",
    className: "notification-center-container",
    child: NotificationsBox(),
});

const menuRevealer = Revealer({
    transition: "slide_down",
    child: Box({
        className: "left-menu-box",
        vertical: true,
        children: [NotificationHeader(), notificationContainer],
    }),
});

export const NotificationCenter = () =>
    Window({
        name: `notification_center`,
        margins: [0, local === "RTL" ? 500 : 400],
        // layer: 'overlay',
        anchor: ["top", local === "RTL" ? "left" : "right"],
        child: Box({
            css: `
            min-height: 2px;
        `,
            children: [menuRevealer],
        }),
    });

globalThis.showNotificationCenter = () =>
    (menuRevealer.revealChild = !menuRevealer.revealChild);

// Notification muted  |  | 󰂛 |  | 
// Notification 󰂜 | 󰂚 |  | 
// Notification Broadcast 󰂞 | 󰂟 | 󰪒 | 
// Notification has data 
export const NotificationCenterButton = () =>
    Button({
        className: "notification-center-button unset",
        // child: Label({ label: "" }),
        label: "",
        onClicked: () => globalThis.showNotificationCenter(),
    }).hook(Notifications, (self) => {
        if (Notifications.dnd) {
            self.label = "󰂛";
        } else if (Notifications.notifications.length === 0) {
            self.label = "󰂚";
            // self.label = "󱇥";
        } else if (Notifications.notifications.length > 0) {
            self.label = `${Notifications.notifications.length} `;
        }
    });
