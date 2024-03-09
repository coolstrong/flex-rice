import { TrayItem } from "@/types/service/systemtray";
import { ButtonProps } from "@/types/widgets/button";
import Gtk30 from "gi://Gtk";
import { systemTray } from "resource:///com/github/Aylur/ags/service/systemtray.js";

const { Gravity } = imports.gi.Gdk;

const PanelButton = ({
    className,
    content,
    ...rest
}: ButtonProps & { content: Gtk30.Widget }) =>
    Widget.Button({
        className: `panel-button ${className} unset`,
        child: Widget.Box({ children: [content] }),
        ...rest,
    });

const SysTrayItem = (item: TrayItem) =>
    PanelButton({
        className: "tray-btn unset",
        content: Widget.Icon().bind("icon", item, "icon"),
        setup: (btn) => {
            const id = item.menu?.connect("popped-up", (menu) => {
                btn.toggleClassName("active");
                menu.connect("notify::visible", (menu) => {
                    btn.toggleClassName("active", menu.visible);
                });
                menu.disconnect(id);
            });
        },
        onPrimaryClick: (_, event) => {
            item.activate(event);
        },
        onSecondaryClick: (btn) =>
            item.menu?.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null),
    });

export const SysTrayBox = () =>
    Widget.Box({
        className: "systray unset",
        attribute: {
            items: new Map(),
            onAdded: (box, id) => {
                const item = systemTray.getItem(id);
                if (box.attribute.items.has(id) || !item) return;

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
    })
        .hook(systemTray, (box, id) => box.attribute.onAdded(box, id), "added")
        .hook(
            systemTray,
            (box, id) => box.attribute.onRemoved(box, id),
            "removed"
        );
