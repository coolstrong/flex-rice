import { icons } from "@/lib/icons";
import brightness from "@/services/brightness";
import { getVolumeIcon } from "@/utils/shared";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import { Icon, Window } from "resource:///com/github/Aylur/ags/widget.js";
import { match } from "ts-pattern";
import ShowWindow from "../utils/ShowWindow";

export const OSD = () => {
    const progress = Variable(Audio.speaker.volume);
    type OSDType = "volume" | "br-screen" | "br-keyboard";
    const type = Variable<OSDType>("volume");

    const icon = Utils.derive([type, progress], (type, progress) =>
        match(type)
            .with("volume", () => getVolumeIcon(progress))
            .with("br-screen", () => icons.brightness.screen)
            .with("br-keyboard", () => icons.brightness.keyboard)
            .exhaustive()
    );

    const show = (value: number, osdType: OSDType) => {
        progress.value = value;
        type.value = osdType;
        ShowWindow("osd");
    };

    return Window({
        name: `osd`,
        focusable: false,
        margins: [0, 0, 140, 0],
        layer: "overlay",
        anchor: ["bottom"],

        setup: self =>
            self
                .hook(
                    Audio.speaker,
                    () => show(Audio.speaker.volume, "volume"),
                    "notify::volume"
                )
                .hook(
                    brightness,
                    () => show(brightness.screen, "br-screen"),
                    "notify::screen"
                )
                .hook(
                    brightness,
                    () => show(brightness.screen, "br-keyboard"),
                    "notify::kbd"
                ),

        child: Widget.Box({
            className: "vol-osd shadow",
            css: "min-width: 140px",
            children: [
                Widget.Box({
                    className: "vol-stack",
                    child: Icon({
                        icon: icon.bind(),
                    }),
                }),
                Widget.Slider({
                    hexpand: true,
                    className: "unset",
                    drawValue: false,
                    value: progress.bind(),
                    onChange: ({ value }) =>
                        match(type.value)
                            .with(
                                "volume",
                                () => (Audio.speaker.volume = value)
                            )
                            .with(
                                "br-screen",
                                () => (brightness.screen = value)
                            )
                            .with("br-keyboard", () => (brightness.kbd = value))
                            .exhaustive(),
                }),
            ],
        }),
    });
};
