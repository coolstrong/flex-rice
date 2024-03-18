import { appIcon } from "@/lib/icons";
import { assert, tuple, undef } from "@/utils/common";
import { A, F, pipe } from "@mobily/ts-belt";
import config from "config";
import Gtk30 from "gi://Gtk?version=3.0";
import { Box, Button } from "resource:///com/github/Aylur/ags/widget.js";

const Hyprland = await Service.import("hyprland");
const Apps = await Service.import("applications");

const setWorkspace = (num: number) =>
    Hyprland.messageAsync(`dispatch workspace ${num}`);

const ClientRenderer = ({ wsId }: { wsId: number }) =>
    Widget.Box({
        halign: Gtk30.Align.CENTER,
        spacing: 2,
        css: "padding: 2 0;",
        children: Hyprland.bind("clients").as(
            A.filterMap(client =>
                client.workspace.id === wsId && client.mapped
                    ? Widget.Icon({
                          icon: pipe(
                              Apps.list.find(app => app.match(client.class)),
                              app => appIcon(app?.icon_name ?? undef)
                          ),
                          css: "font-size: 12px;",
                      })
                    : undef
            )
        ),
    });

const MonitorWorkspaces = (monitorId = 0) => {
    const firstWsId = config.workspacesPerMonitor * monitorId + 1;
    // const scale = getScale(assert(Hyprland.getMonitor(monitorId)));

    return Box({
        className: "unset workspaces",
        children: A.range(
            firstWsId,
            firstWsId + config.workspacesPerMonitor - 1
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
            })
        ),
    });
};

export const Workspaces = () =>
    Box({
        className: "unset workspace-box",

        spacing: 4,
        children: Hyprland.monitors.map(m => MonitorWorkspaces(m.id)),
    });
