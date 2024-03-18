import App from "resource:///com/github/Aylur/ags/app.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import { Bar } from "./Bar.js";
import { HardwareMenu } from "./widgets/menus/HardwareMenu.js";
import { NotificationCenter } from "./widgets/menus/NotificationCenter.js";
import MyNotifications from "./notifications/OSDNotifications.js";
import { OSD } from "./widgets/OSD.js";
import { SystemMenu } from "./widgets/menus/SystemMenu.js";

// in config.js
const scss = App.configDir + "/scss/main.scss";
const css = App.configDir + "/style.css";

const compileStyles = () => Utils.exec(`sassc ${scss} ${css}`);
compileStyles();

Utils.monitorFile(`${App.configDir}/scss`, () => {
    compileStyles();
    App.resetCss();
    App.applyCss(css);
});

let windows = [
    OSD(),
    MyNotifications(),
    NotificationCenter(),
    HardwareMenu(),
    Bar({ monitor: 0 }),
    SystemMenu(),
];

App.config({
    style: css,
    cacheNotificationActions: true,
    windows,
});

globalThis.getNot = () => Notifications;
