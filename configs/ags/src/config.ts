import App from "resource:///com/github/Aylur/ags/app.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import { Bar } from "./widgets/Bar.js";
import { HardwareMenu } from "./widgets/menus/HardwareMenu.js";
import { NotificationCenter } from "./widgets/menus/NotificationCenter.js";
import MyNotifications from "./notifications/OSDNotifications.js";
import { OSD } from "./widgets/OSD.js";
import { SystemMenu } from "./widgets/menus/SystemMenu.js";
import { batteryReaction } from "./reactions/battery.js";
import { CalendarMenu } from "./widgets/menus/CalendarMenu.js";

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

const br = batteryReaction();

App.config({
    style: css,
    cacheNotificationActions: true,
    windows: [
        OSD(),
        MyNotifications(),
        NotificationCenter(),
        HardwareMenu(),
        CalendarMenu(),
        Bar({ monitor: 0 }).hook(br.object, br.callback, br.signal),
        SystemMenu(),
    ],
});

globalThis.getNot = () => Notifications;
