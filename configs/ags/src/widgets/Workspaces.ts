import { appIcon } from "@/lib/icons";
import { assert, tuple, undef } from "@/utils/common";
import { A, pipe } from "@mobily/ts-belt";
import config from "config";
import {
    Box,
    Button,
    CenterBox,
} from "resource:///com/github/Aylur/ags/widget.js";

const Hyprland = await Service.import("hyprland");
const Apps = await Service.import("applications");

const setWorkspace = (num: number) =>
    Hyprland.messageAsync(`dispatch workspace ${num}`);

const WS_SIZE = tuple(20, 16);

const getScale = ({ height, width }: { width: number; height: number }) => ({
    width: Math.round(WS_SIZE[0] / width),
    height: Math.round(WS_SIZE[1] / height),
});

const ClientRenderer = ({
    wsId,
    scale,
}: {
    wsId: number;
    scale: { width: number; height: number };
}) =>
    Widget.Fixed().hook(
        Hyprland,
        self => {
            self.get_children().forEach($ => $.destroy());

            Hyprland.clients
                .filter($ => $.workspace.id === wsId)
                .forEach(
                    client =>
                        client.mapped &&
                        self.put(
                            CenterBox({
                                centerWidget: Widget.Icon({
                                    icon: pipe(
                                        Apps.list.find(app =>
                                            app.match(client.class)
                                        ),
                                        app => appIcon(app?.icon_name ?? undef)
                                    ),
                                    css: "font-size: 12px;",
                                }),
                            }),
                            client.at[0] * scale.width,
                            client.at[1] * scale.height
                        )
                );

            self.show_all();
        },
        "notify::clients"
    );

const MonitorWorkspaces = (monitorId = 0) => {
    const firstWsId = config.workspacesPerMonitor * monitorId + 1;
    const scale = getScale(assert(Hyprland.getMonitor(monitorId)));

    return Box({
        className: "unset workspaces",
        children: A.range(
            firstWsId,
            firstWsId + config.workspacesPerMonitor
        ).map(i =>
            Button({
                onClicked: () => setWorkspace(i),
                className: Hyprland.active.workspace
                    .bind("id")
                    .as(id => (id === i ? "unset focused" : "unset unfocused")),
                child: ClientRenderer({
                    scale,
                    wsId: i,
                }),
            })
        ),
    });
};

export const Workspaces = () =>
    Box({
        className: "unset",
        vertical: false,
        spacing: 8,
        children: Hyprland.bind("monitors").as(monitors =>
            monitors.map((_, i) => MonitorWorkspaces(i))
        ),
    });
