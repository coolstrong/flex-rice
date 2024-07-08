import { useUpdatableVar } from "@/lib/hooks";
import { windowIcon } from "@/lib/icons";
import { cssComponent } from "@/utils/helpers";
import { Array, Record, pipe } from "effect";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import config from "config.json";

type Client = (typeof hyprland)["clients"][number];

type TaskbarItemData = {
    windowClass: string;
    pids: number[];
    addrs: string[];
    icon: string;
};

const transformClients = (clients: Client[]): TaskbarItemData[] =>
    pipe(
        clients,
        Array.groupBy(x => x.class),
        Record.filter((_, c) => !config.workspace.ignore.includes(c)),
        Record.values,
        Array.map(clients => ({
            windowClass: clients[0].class,
            pids: clients.map(x => x.pid),
            addrs: clients.map(x => x.address),
            icon: windowIcon(clients[0]),
        })),
    );

const TaskbarItem = (
    { icon, pids, addrs, windowClass }: TaskbarItemData,
    index: number,
) => {
    const isFocused = hyprland.active.client
        .bind("class")
        .as(c => c === windowClass);

    const focusWindow = () => {
        const pid = pipe(
            addrs.indexOf(hyprland.active.client.address),
            x => (x >= 0 ? (x + 1) % pids.length : 0),
            x => pids[x]!,
        );
        Utils.execAsync(`hyprctl dispatch focuswindow pid:${pid}`);
        // hyprland.messageAsync(`focuswindow pid:${pid}`);
    };

    const button = Widget.Button({
        className: "taskbar__item",
        vexpand: true,
        onClicked: focusWindow,
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
                    children: pids.map((_, i) => {
                        const isFocused = hyprland.active.client
                            .bind("address")
                            .as(addr => addrs.indexOf(addr) === i);

                        return Widget.Box({
                            hpack: isFocused.as(f => (f ? "fill" : "center")),
                            hexpand: isFocused.as(f => f || pids.length === 1),
                            className: isFocused.as(f =>
                                cssComponent(
                                    ["taskbar", "item", "indicator"],
                                    [f ? "focused" : "unfocused"],
                                ),
                            ),
                        });
                    }),
                }),
            ],
        }),
    });

    if (index < 9)
        button.keybind(["SUPER"], (index + 1).toString() as any, focusWindow);

    return button;
};

export const Taskbar = () => {
    const { variable, update } = useUpdatableVar(() =>
        transformClients(hyprland.clients),
    );

    return Widget.Box({
        hpack: "center",
        children: variable.bind().as(Array.map(TaskbarItem)),
    })
        .hook(hyprland, update, "client-removed")
        .hook(hyprland, update, "client-added");
};
