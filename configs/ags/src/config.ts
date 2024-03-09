import App from "resource:///com/github/Aylur/ags/app.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import { Bar } from "./Bar.js";
import { HardwareMenu } from "./menus/HardwareMenu.js";
import { WeatherMenu } from "./menus/WeatherMenu.js";
import { NotificationCenter } from "./menus/notification_center.js";
import MyNotifications from "./notifications/OSDNotifications.js";
import { VolumeOSD } from "./on-screen/volume.js";
import { LeftMenu } from "./widgets/menus/LeftMenu.js";
// import ScreenCorners from './modules/components/ScreenCorners.js';

// in config.js
const scss = App.configDir + "/scss/main.scss";
const css = App.configDir + "/style.css";

Utils.exec(`sassc ${scss} ${css}`);

let windows = [
    VolumeOSD(),
    MyNotifications(),
    NotificationCenter(),
    HardwareMenu(),
    WeatherMenu(),

    Bar({ monitor: 0 }),
    LeftMenu(),

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

export default {
    css,
    cacheNotificationActions: true,
    windows,
};

globalThis.getNot = () => Notifications;
