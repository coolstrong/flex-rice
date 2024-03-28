import { windowIcon } from "@/lib/icons";
import { undef } from "@/utils/common";
import { A } from "@mobily/ts-belt";
import config from "config";
import Gtk30 from "gi://Gtk?version=3.0";
import { Box, Button } from "resource:///com/github/Aylur/ags/widget.js";

const Hyprland = await Service.import("hyprland");

const setWorkspace = (num: number) =>
    Hyprland.messageAsync(`dispatch workspace ${num}`);

const ClientRenderer = ({ wsId }: { wsId: number }) =>
    Widget.Box({
        halign: Gtk30.Align.CENTER,
        spacing: 2,
        css: "padding: 2 0;",
        children: Hyprland.bind("clients").as(
            A.filterMap(client =>
                !config.workspace.ignore.includes(client.class) &&
                client.workspace.id === wsId &&
                client.mapped
                    ? Widget.Icon({
                          icon: windowIcon(client),
                          css: "font-size: 12px;",
                      })
                    : undef,
            ),
        ),
    });

const MonitorWorkspaces = (monitorId = 0) => {
    const firstWsId = config.workspace.perMonitor * monitorId + 1;

    return Box({
        className: "unset workspaces",
        children: A.range(
            firstWsId,
            firstWsId + config.workspace.perMonitor - 1,
        ).map(i =>
            Button({
                css: "min-width: 30px;",
                onClicked: () => setWorkspace(i),
                className: Hyprland.active.workspace
                    .bind("id")
                    .as(id => (id === i ? "unset focused" : "unset unfocused")),
                child: ClientRenderer({
                    wsId: i,
                }),
            }),
        ),
    });
};

export const Workspaces = () =>
    Box({
        className: "unset workspace-box",

        spacing: 4,
        children: Hyprland.monitors.map(m => MonitorWorkspaces(m.id)),
    });
