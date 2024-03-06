import App from "resource:///com/github/Aylur/ags/app.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import { HardwareMenu } from "./menus/HardwareMenu";
import { WeatherMenu } from "./menus/WeatherMenu.js";
import { LeftMenu } from "./menus/left_menu.js";
import { NotificationCenter } from "./menus/notification_center.js";
import MyNotifications from "./notifications/OSDNotifications.js";
import { VolumeOSD } from "./on-screen/volume.js";
import { Bar } from "./topbar.js";
// import ScreenCorners from './modules/components/ScreenCorners.js';

// in config.js
const scss = App.configDir + "/scss/main.scss";
const css = App.configDir + "/style.css";

Utils.exec(`sassc ${scss} ${css}`);

let windows = [
    // Bar({monitor : 1}),
    // Bar({ monitor: 0 }),
    VolumeOSD(),
    MyNotifications(),
    NotificationCenter(),
    HardwareMenu(),
    WeatherMenu(),

    // ... Desktop widgets ... //
    /*     ColorWidget,
    win20Widget,
    materialWidget,
    unicatWidget,
    blackHoleWidget,
    goldenWidget,
    harmonyWidget,
    newCatWidget,
    deerWidget,
    circlesMusicWidget,
    whiteFlowerWidget, */
];

const screens = JSON.parse(Utils.exec("hyprctl monitors all -j"));

for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];

    windows.push(Bar({ monitor: screen.id }));
    windows.push(LeftMenu({ monitor: screen.id }));
}

export default {
    css: css,
    cacheNotificationActions: true,
    windows: windows,
};

globalThis.getNot = () => Notifications;
