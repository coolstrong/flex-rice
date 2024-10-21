import { useUpdatableVar } from "@/lib/hooks";
import { windowIcon } from "@/lib/icons";
import { cssComponent } from "@/utils/helpers";
import { Array, Record, flow, pipe } from "effect";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import config from "config.json";
import { optArr } from "@/utils/common";

type Client = (typeof hyprland)["clients"][number];

type TaskbarItemData = {
    windowClass: string;
    addrs: string[];
    icon: string;
};

const focusWindow = (addrs: string[]) => {
    const addr = pipe(
        addrs.indexOf(hyprland.active.client.address),
        x => (x >= 0 ? (x + 1) % addrs.length : 0),
        x => addrs[x]!,
    );

    hyprland.messageAsync(`dispatch focuswindow address:${addr}`);
};

const transformClients: (clients: Client[]) => TaskbarItemData[] = flow(
    Array.groupBy(x => x.class),
    Record.filter((_, c) => !config.workspace.ignore.includes(c)),
    Record.values,
    Array.map(clients => ({
        windowClass: clients[0].class,
        addrs: clients.map(x => x.address),
        icon: windowIcon(clients[0]),
    })),
);

const TaskbarItem = (
    { icon, addrs, windowClass }: TaskbarItemData,
    i: number,
) => {
    const isFocused = hyprland.active.client
        .bind("class")
        .as(c => c === windowClass);

    return Widget.Overlay({
        child: Widget.Button({
            className: "taskbar__item",
            vexpand: true,
            onClicked: () => focusWindow(addrs),
            child: Widget.Box({
                vexpand: true,
                vertical: true,
                spacing: 2,
                children: [
                    Widget.Icon({
                        expand: true,
                        icon: icon,
                    }),
                    Widget.Box({
                        hexpand: true,
                        hpack: isFocused.as(f => (f ? "fill" : "center")),
                        spacing: 3,
                        children: addrs.map((_, i) => {
                            const isFocused = hyprland.active.client
                                .bind("address")
                                .as(addr => addrs.indexOf(addr) === i);

                            return Widget.Box({
                                hpack: isFocused.as(f =>
                                    f ? "fill" : "center",
                                ),
                                hexpand: isFocused.as(
                                    f => f || addrs.length === 1,
                                ),
                                className: isFocused.as(f =>
                                    cssComponent(
                                        ["taskbar", "item", "indicator"],
                                        optArr(f, ["focused"]),
                                    ),
                                ),
                            });
                        }),
                    }),
                ],
            }),
        }),
        overlay: Widget.Label({
            className: "taskbar__item__number",
            label: (i + 1).toString(),
            hpack: "end",
            vpack: "start",
            yalign: 0,
            ypad: 0,
        }),
    });
};

export const Taskbar = () => {
    const { variable, update } = useUpdatableVar(() =>
        transformClients(hyprland.clients),
    );

    globalThis.focusWindow = (i: number) => {
        const task = variable.value[i];
        if (task) focusWindow(task.addrs);
    };

    return Widget.Box({
        hpack: "center",
        children: variable.bind().as(Array.map(TaskbarItem)),
    })
        .hook(hyprland, update, "client-removed")
        .hook(hyprland, update, "client-added");
};
