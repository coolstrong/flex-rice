import type { TrayItem } from "resource:///com/github/Aylur/ags/service/systemtray.js";
import config from "config.json";
import { pipe, R } from "@mobily/ts-belt";

const { Gravity } = imports.gi.Gdk;
const SystemTray = await Service.import("systemtray");

const PanelButton = ({ className, content, ...rest }) =>
    Widget.Button({
        className: `panel-button ${className} unset`,
        child: Widget.Box({ children: [content] }),
        ...rest,
    });

const SysTrayItem = (item: TrayItem) =>
    PanelButton({
        className: "tray-btn unset",
        content: Widget.Icon().bind("icon", item, "icon"),
        tooltip_markup: item.bind("tooltip_markup"),
        setup: btn => {
            const menu = item.menu;
            if (!menu) return;
            const id = item.menu?.connect("popped-up", () => {
                btn.toggleClassName("active");
                menu.connect("notify::visible", () => {
                    btn.toggleClassName("active", menu.visible);
                });
                id && menu.disconnect(id);
            });

            if (id) btn.connect("destroy", () => item.menu?.disconnect(id));
        },
        onPrimaryClick: btn =>
            pipe(
                R.fromExecution(() => item.activate),
                R.tapError(() =>
                    item.menu?.popup_at_widget(
                        btn,
                        Gravity.SOUTH,
                        Gravity.NORTH,
                        null,
                    ),
                ),
            ),

        onSecondaryClick: btn =>
            item.menu?.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null),
    });

export const SysTrayBox = () =>
    Widget.Box({
        class_name: "systray unset",
        children: SystemTray.bind("items").as(items =>
            items
                .filter(
                    ({ id }) => !(<string[]>config.systray.ignore).includes(id),
                )
                .map(SysTrayItem),
        ),
    });
