import type { TrayItem } from "resource:///com/github/Aylur/ags/service/systemtray.js";
import config from "config.json";
import { ASSETS_PATH } from "@/settings";
import { D, F, flow } from "@mobily/ts-belt";

const SystemTray = await Service.import("systemtray");

const iconSubstites = {
    TelegramDesktop: "telegram",
    breaktimer: `${ASSETS_PATH}/icons/coffee.png`,
};

const PanelButton = ({ className, content, ...rest }) =>
    Widget.Button({
        className: `panel-button ${className} unset`,
        child: Widget.Box({ children: [content] }),
        ...rest,
    });

const SysTrayItem = (item: TrayItem) =>
    PanelButton({
        className: "tray-btn unset",
        content: Widget.Icon({
            icon:
                item.title in iconSubstites
                    ? iconSubstites[item.title]
                    : item.bind("icon"),
        }),
        tooltip_markup: item.bind("tooltip_markup"),
        onPrimaryClick: (_, event) => item.activate(event),
        onSecondaryClick: (_, event) => item.openMenu(event),
    });

export const SysTrayBox = () =>
    Widget.Box({
        class_name: "systray unset",
        children: SystemTray.bind("items").as(items =>
            items
                .filter(
                    ({ status, title }) =>
                        status !== "Passive" &&
                        !(config.systray.ignore as string[]).includes(title)
                )
                .map(
                    flow(
                        // F.tap(item =>
                        //     print(
                        //         D.selectKeys(item, [
                        //             "is_menu",
                        //             "title",
                        //             "status",
                        //             "icon",
                        //         ])
                        //     )
                        // ),
                        SysTrayItem
                    )
                )
        ),
    });
