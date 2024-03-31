import Gtk from "gi://Gtk?version=3.0";
import keyboard from "@/services/keyboard.ts";
import "./KeyboardLayout.sass";

export const KeyboardLayout = () => {
    return Widget.Button({
        className: "keyboardLayout",
        label: keyboard.bind("layout"),
        valign: Gtk.Align.CENTER,
        onClicked: () => keyboard.nextLayout(),
        tooltipMarkup: keyboard
            .bind("kbname")
            .as(name => `Current keyboard: <span weight="bold">${name}</span>`),
    });
};
