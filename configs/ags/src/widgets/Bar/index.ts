import { NetVolumeBox } from "../NetVolume.js";
import { SysTrayBox } from "./SystemTray.js";
import { Workspaces } from "./Workspaces.ts";
import { HardwareBox } from "../hardware/all.js";
import { NotificationCenterButton } from "../menus/NotificationCenter.js";
import { MenuButton } from "../menus/SystemMenu.js";
import { hyprext } from "@/services/hyprext.ts";
import {
    Box,
    CenterBox,
    Window,
} from "resource:///com/github/Aylur/ags/widget.js";
import clsx from "clsx";
import Gtk from "gi://Gtk?version=3.0";
import keyboard from "@/services/keyboard.ts";

import "./style.sass";
import { useIntervalVar } from "@/lib/hooks.ts";
import config from "config.json";

export const KeyboardLayout = () => {
    return Widget.Button({
        className: "keyboardLayout",
        label: keyboard.bind("layout"),
        valign: Gtk.Align.CENTER,
        onClicked: () => keyboard.nextLayout(),
        tooltipMarkup: keyboard
            .bind("kbname")
            .as(name => `Current keyboard: <span weight="bold">${name}</span>`),
    });
};

const Clock = () => {
    const { variable: date } = useIntervalVar({
        factory: () => new Date(),
        interval: 1000,
    });
    const locale = config.time.locale;

    return Widget.Button({
        className: "clock small-shadow unset",
        label: date.bind().as(
            // prettier-ignore
            d => `${d.toLocaleDateString(locale)}   ${d.toLocaleTimeString(locale)}`
        ),
        onClicked: () => App.toggleWindow("calendar-menu"),
    });
};

// layout of the bar
const Start = () =>
    Box({
        spacing: 8,
        children: [Workspaces(), HardwareBox()],
    });

const Center = () => Box({});

const End = () =>
    Box({
        hpack: "end",
        spacing: 8,
        children: [
            NotificationCenterButton(),
            NetVolumeBox(),
            SysTrayBox(),
            Clock(),
            KeyboardLayout(),
            MenuButton(),
        ],
    });

export const Bar = ({ monitor }: { monitor?: number } | undef = {}) =>
    Window({
        name: `bar${monitor || ""}`, // name has to be unique
        className: hyprext
            .bind("fullscreen")
            .as(f => clsx("bar-bg", f && "bar-bg--fullscreen")),
        // className: "bar-bg unset",
        monitor: monitor,
        anchor: ["bottom", "left", "right"],
        exclusivity: "exclusive",
        child: CenterBox({
            className: hyprext
                .bind("fullscreen")
                .as(f => clsx("bar", !f && "shadow")),

            startWidget: Start(),
            centerWidget: Center(),
            endWidget: End(),
        }),
    });
