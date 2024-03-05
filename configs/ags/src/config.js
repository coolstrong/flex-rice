import App from "resource:///com/github/Aylur/ags/app.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import { HardwareMenu } from "./menus/HardwareMenu.js";
import { WeatherMenu } from "./menus/WeatherMenu.js";
import { LeftMenu } from "./menus/left_menu.js";
import { NotificationCenter } from "./menus/notification_center.js";
import MyNotifications from "./notifications/OSDNotifications.js";
import { VolumeOSD } from "./on-screen/volume.js";
import { Bar } from "./topbar.js";
import { Utils } from "./utils/imports.js";
import blackHoleWidget from "./widgets/desktop/BlackHole.js";
import circlesMusicWidget from "./widgets/desktop/Circles.js";
import ColorWidget from "./widgets/desktop/ColorsWidget.js";
import deerWidget from "./widgets/desktop/DeerWidget.js";
import goldenWidget from "./widgets/desktop/Golden.js";
import harmonyWidget from "./widgets/desktop/Harmony.js";
import materialWidget from "./widgets/desktop/MaterialYouOne.js";
import newCatWidget from "./widgets/desktop/NewCat.js";
import unicatWidget from "./widgets/desktop/UnicatWidget.js";
import whiteFlowerWidget from "./widgets/desktop/WhiteFlower.js";
import win20Widget from "./widgets/desktop/Win20Widget.js";
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
    ColorWidget,
    win20Widget,
    materialWidget,
    unicatWidget,
    blackHoleWidget,
    goldenWidget,
    harmonyWidget,
    newCatWidget,
    deerWidget,
    circlesMusicWidget,
    whiteFlowerWidget,
];

const screens = JSON.parse(Utils.exec("hyprctl monitors all -j"));

for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];

    windows.push(Bar({ monitor: screen.id }));

    const leftMene = LeftMenu({ monitor: screen.id });
    windows.push(leftMene);
}

export default {
    css: css,
    cacheNotificationActions: true,
    windows: windows,
};

globalThis.getNot = () => Notifications;
