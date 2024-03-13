import { NotificationCenterButton } from "./widgets/menus/NotificationCenter.js";
import { Workspaces } from "./widgets/Workspaces.js";
import { HardwareBox } from "./widgets/hardware/all.js";
import { NetworkInformation } from "./widgets/internet.js";
import { MenuButton } from "./widgets/menus/LeftMenu.js";
import { SysTrayBox } from "./widgets/systray.js";

import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import {
    Box,
    CenterBox,
    Label,
    Window,
} from "resource:///com/github/Aylur/ags/widget.js";
import themeService from "./services/ThemeService.js";
// import weatherService from "./services/WeatherService.js";

const Clock = () =>
    Label({
        className: "clock small-shadow unset",
        label: Variable("", {
            poll: [1000, ["date", "+%Y-%m-%d | %H:%M:%S"]],
        }).bind(),
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
        children: [
            Workspaces(),
            HardwareBox(),
            DynamicWallpaper(),
            // NotificationIndicator(),
            // ClientTitle(),
        ],
    });

const Center = () => Box({});

const Left = () =>
    Box({
        hpack: "end",
        spacing: 8,
        children: [
            // Volume(),
            NotificationCenterButton(),
            // Weather(),
            NetworkInformation(),
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
