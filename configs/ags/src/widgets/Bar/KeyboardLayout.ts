import { match, P } from "ts-pattern";
import config from "config";
import { flow, O, pipe } from "@mobily/ts-belt";
import { undef } from "@/utils/common.ts";
import hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import Gtk from "gi://Gtk?version=3.0";

import "./KeyboardLayout.sass";

const hyprctlDevicesPattern = {
    keyboards: P.array({
        name: P.string,
        active_keymap: P.string,
    }).select(),
};

const parseKeymap = (keymap: string) => keymap.slice(0, 2).toLowerCase();

const getInitialKeymap = () =>
    match(JSON.parse(Utils.exec("hyprctl devices -j")))
        .with(hyprctlDevicesPattern, keyboards =>
            pipe(
                keyboards.find(kb => kb.name === config.keyboard.default.name),
                O.map(flow(kb => kb.active_keymap, parseKeymap)),
            ),
        )
        .otherwise(() => undef) ?? config.keyboard.default.keymap;

export const KeyboardLayout = () => {
    let activeKeyboard = Variable(config.keyboard.default.name);
    const currentLayout = Variable(getInitialKeymap());

    return Widget.Button({
        className: "keyboardLayout",
        label: currentLayout.bind(),
        valign: Gtk.Align.CENTER,
        onClicked: () =>
            Utils.execAsync(
                `hyprctl switchxkblayout ${activeKeyboard.value} next`,
            ),
        tooltipMarkup: activeKeyboard
            .bind()
            .as(name => `Current keyboard: <span weight="bold">${name}</span>`),
        setup: self =>
            self.hook(
                hyprland,
                (_, ...args) =>
                    match(args).with(
                        [P.string, P.string],
                        ([kbname, layout]) => {
                            activeKeyboard.value = kbname;
                            currentLayout.value = parseKeymap(layout);
                        },
                    ),
                "keyboard-layout",
            ),
    });
};
