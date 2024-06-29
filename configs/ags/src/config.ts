import App from "resource:///com/github/Aylur/ags/app.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import MyNotifications from "./notifications/OSDNotifications.js";
import { Bar } from "./widgets/Bar";
import { OSD } from "./widgets/OSD.js";
import { CalendarMenu } from "./widgets/menus/CalendarMenu.js";
import { NotificationCenter } from "./widgets/menus/NotificationCenter.js";
import { SystemMenu } from "./widgets/menus/SystemMenu.js";
import { VolumeMenu } from "./widgets/menus/VolumeMenu.ts";
import { TodoistWidget } from "./widgets/desktop/TodoistWidget.ts";

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

App.config({
    style: css,
    cacheNotificationActions: true,
    windows: [
        OSD(),
        MyNotifications(),
        NotificationCenter(),
        VolumeMenu(),
        CalendarMenu(),
        Bar({ monitor: 0 }),
        SystemMenu(),

        TodoistWidget(),
    ],
});

globalThis.getNot = () => Notifications;
