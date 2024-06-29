import { Popup } from "./Popup";
import audio, {
    Stream,
} from "resource:///com/github/Aylur/ags/service/audio.js";

import "./style.scss";
import { ensureIconExist } from "@/lib/icons";
import { Binding } from "@/types/service";

const RadioBox = (checked: boolean | Binding<any, any, boolean>) =>
    Widget.CenterBox(
        {
            className: "radio-box",
        },
        Widget.Box({
            className: "radio-box__inner",
            visible: checked,
        }),
    );

const StreamView = (stream: Stream) =>
    Widget.Box(
        { vertical: true, spacing: 4 },
        Widget.Box(
            { spacing: 4 },
            Widget.Icon({
                icon: stream
                    .bind("icon_name")
                    .as(icon => ensureIconExist(icon) ?? "audio-headset"),
            }),
            Widget.Label({
                label: stream.bind("description").as(s => s ?? ""),
            }),
            Widget.Box({ hexpand: true }),
            Widget.ToggleButton({
                // active: true,
            }).on("toggled", self => (self.active = !self.active)),
            /* RadioBox(
                stream
                    .bind("id")
                    .as(id => id === audio.control.get_default_sink().id),
            ) */
        ),
    );

export const VolumeMenu = () =>
    Popup({
        anchor: ["bottom", "right"],
        name: "volume-menu",
        margins: [40, 100],
        child: Widget.Box({
            className: "menu volume-menu",
            vertical: true,
            children: audio.speakers
                .filter(x => !x.stream?.isVirtual)
                .map(StreamView),
        }),
    });
