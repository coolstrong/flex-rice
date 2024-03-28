import { SysTrayBox } from "./SystemTray.js";
import { Workspaces } from "./Workspaces";
import { HardwareBox } from "./hardware/all.js";
import { NetVolumeBox } from "./NetVolume.js";
import { NotificationCenterButton } from "./menus/NotificationCenter.js";
import { MenuButton } from "./menus/SystemMenu.js";

import {
    Box,
    CenterBox,
    Window,
} from "resource:///com/github/Aylur/ags/widget.js";
import themeService from "../services/ThemeService.js";

const Clock = () =>
    Widget.Button({
        className: "clock small-shadow unset",
        label: Variable("", {
            poll: [1000, ["date", "+%Y-%m-%d | %H:%M:%S"]],
        }).bind(),
        onClicked: () => App.toggleWindow("calendar-menu"),
    });

const DynamicWallpaper = () =>
    Widget.Button({
        className: "unset dynamic-wallpaper",
        onClicked: () => {
            themeService.toggleDynamicWallpaper();
        },
    }).hook(themeService, btn => {
        if (!themeService.isDynamicTheme) {
            btn.visible = false;
            return;
        }

        btn.visible = true;
        if (themeService.dynamicWallpaperIsOn) btn.label = "";
        else btn.label = "";
    });

// layout of the bar
const Right = () =>
    Box({
        spacing: 8,
        children: [Workspaces(), HardwareBox(), DynamicWallpaper()],
    });

const Center = () => Box({});

const Left = () =>
    Box({
        hpack: "end",
        spacing: 8,
        children: [
            NotificationCenterButton(),
            NetVolumeBox(),
            SysTrayBox(),
            Clock(),
            MenuButton(),
        ],
    });

export const Bar = ({ monitor }: { monitor?: number } | undef = {}) =>
    Window({
        name: `bar${monitor || ""}`, // name has to be unique
        className: "bar-bg unset",
        monitor: monitor,
        anchor: ["bottom", "left", "right"],
        exclusivity: "exclusive",
        child: CenterBox({
            className: "bar shadow",
            startWidget: Right(),
            centerWidget: Center(),
            endWidget: Left(),
        }),
    });
