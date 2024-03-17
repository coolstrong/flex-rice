import type { TrayItem } from "resource:///com/github/Aylur/ags/service/systemtray.js";
import config from "config.json";
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
        onPrimaryClick: (btn, event) => {
            try {
                item.activate(event);
            } catch (TypeError) {
                // item.menu.popup_at_widget(
                //     btn,
                //     Gravity.SOUTH,
                //     Gravity.NORTH,
                //     null
                // );
            }
        },
        onSecondaryClick: btn =>
            item.menu?.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null),
    });

export const SysTrayBox = () =>
    Widget.Box({
        className: "systray unset",
        attribute: {
            items: new Map(),
            onAdded: (box, id) => {
                const item = SystemTray.getItem(id);
                if (
                    config.systray.ignore.includes(id) ||
                    box.attribute.items.has(id) ||
                    !item
                )
                    return;

                const widget = SysTrayItem(item);
                box.attribute.items.set(id, widget);
                box.add(widget);
                box.show_all();
            },
            onRemoved: (box, id) => {
                if (!box.attribute.items.has(id)) return;

                box.attribute.items.get(id).destroy();
                box.attribute.items.delete(id);
            },
        },
        setup: self =>
            SystemTray.items.forEach(item =>
                self.attribute.onAdded(self, item.id)
            ),
    })
        .hook(SystemTray, (box, id) => box.attribute.onAdded(box, id), "added")
        .hook(
            SystemTray,
            (box, id) => box.attribute.onRemoved(box, id),
            "removed"
        );
