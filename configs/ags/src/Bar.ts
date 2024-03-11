import { NotificationCenterButton } from "./menus/notification_center.js";
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
    }).poll(1000, self =>
        execAsync(["date", "+(%I:%M) %A, %d %B"])
            .then(date => (self.label = date))
            .catch(print)
    );

// const Weather = () => {
//     let icon = Label({
//         className: "bar-weather-icon unset",
//     });

//     let text = Label({
//         truncate: "end",
//         xalign: 0,
//         maxWidthChars: 24,
//     });

//     let button = Widget.Button({
//         className: "unset un-hover",
//         onClicked: () => showWeatherMenu(),
//         child: Box({
//             className: "bar-weather-box small-shadow unset",
//             children: [icon, text],
//         }).hook(weatherService, self => {
//             if (weatherService.arValue != "") {
//                 const max = weatherService.maxTempC;
//                 const min = weatherService.minTempC;
//                 text.label = `(${min} - ${max}) ${weatherService.feelsLike} ${weatherService.arValue}`;
//                 icon.label = `${weatherService.weatherCode}`;
//             } else {
//                 text.label = `Weather service is not available`;
//             }
//         }),
//     });

//     return button;
// };

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

const Center = () =>
    Box({
        children: [Clock()],
    });

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
