import themeService from "@/services/ThemeService.js";
import settings from "@/settings.js";
import { local } from "@/utils/helpers.js";
import MusicPLayer from "@/widgets/MusicPLayer.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import { Box, Button, Label } from "resource:///com/github/Aylur/ags/widget.js";
import ThemesDictionary, {
    BLACK_HOLE_THEME,
    CIRCLES_THEME,
    COLOR_THEME,
    DARK_THEME,
    DEER_THEME,
    DYNAMIC_M3_DARK,
    DYNAMIC_M3_LIGHT,
    GAME_THEME,
    GOLDEN_THEME,
    HARMONY_THEME,
    MATERIAL_YOU,
    NEW_CAT_THEME,
    SIBERIAN_THEME,
    UNICAT_THEME,
    WHITE_FLOWER,
    WIN_20,
} from "../../theme/themes.js";
import { Popup } from "./Popup.js";

const Header = () => {
    return Box({
        className: "left-menu-header",
        css: `
            background-image: url("${settings.assets.wallpapers}/black-hole.png");
        `,
        vertical: true,
    }).hook(themeService, box => {
        let wallpaper = ThemesDictionary[themeService.selectedTheme].wallpaper;
        box.css = `background-image: url("${wallpaper}");`;
    });
};

const ThemeButton = ({
    label,
    icon,
    theme,
    label_css = "theme-btn-label",
    icon_css = "theme-btn-icon",

    css = `
        min-height: 2rem;
        border-radius: 1rem;
    `,
}) => {
    const _label = Label({
        className: `unset ${label_css}`,
        hpack: "start",
        label: label,
    });

    const _icon = Label({
        className: `unset ${icon_css}`,
        css: `min-width: 1.5rem;`,
        label: icon,
        xalign: 0.5,
    });

    const box = Box({
        className: "unset theme-btn-box",
        // hexpand: true,
        // homogeneous: true,
        children: [_label, Widget.Box({ hexpand: true }), _icon],
    });

    const button = Button({
        // hexpand: true,
        css,
        child: box,
        onClicked: () => themeService.changeTheme(theme),
    }).hook(themeService, btn => {
        btn.class_name = "theme-btn";
        if (themeService.selectedTheme === theme) {
            btn.class_name = "selected-theme";
        }
    });

    return button;
};

const ThemesButtonsRowOne = () => {
    // -----------------------------------
    // ---------- Theme Buttons ----------
    // -----------------------------------
    const blackHoleTheme = ThemeButton({
        label: "Black hole",
        icon: "󰇩",
        theme: BLACK_HOLE_THEME,
    });

    const deerTheme = ThemeButton({
        label: "Deer",
        icon: "",
        theme: DEER_THEME,
    });

    const colorTheme = ThemeButton({
        label: "Color",
        icon: "",
        theme: COLOR_THEME,
    });

    const siberianTheme = ThemeButton({
        label: "Gradient",
        icon: "",
        theme: SIBERIAN_THEME,
    });

    const materialYouTheme = ThemeButton({
        label: "Pastel",
        icon: "",
        theme: MATERIAL_YOU,
    });

    const win20Theme = ThemeButton({
        label: "Windows",
        icon: "",
        theme: WIN_20,
        // end: "",
    });

    const gameTheme = ThemeButton({
        label: "Game",
        icon: "",
        theme: GAME_THEME,
    });

    const darkTheme = ThemeButton({
        label: "Dark",
        icon: "󱀝",
        theme: DARK_THEME,
    });

    const unicatTheme = ThemeButton({
        label: "Unicat",
        icon: "",
        theme: UNICAT_THEME,
    });

    const newCatTheme = ThemeButton({
        label: "New cat",
        icon: "",
        theme: NEW_CAT_THEME,
    });

    const goldenTheme = ThemeButton({
        label: "Golden",
        icon: "󰉊",
        theme: GOLDEN_THEME,
    });

    const harmonyTheme = ThemeButton({
        label: "Harmony",
        icon: "󰔉",
        theme: HARMONY_THEME,
    });

    const circlesTheme = ThemeButton({
        label: "Circles",
        icon: "",
        theme: CIRCLES_THEME,
    });

    const whiteFlower = ThemeButton({
        label: "White",
        icon: "",
        theme: WHITE_FLOWER,
    });

    const dynamicTheme = Widget.Box({
        children: [
            ThemeButton({
                label: "",
                icon: "",
                theme: DYNAMIC_M3_DARK,
                label_css: "unset",
                icon_css: "dynamic-theme-btn-icon",
                css: `
              min-height: 2rem;
              border-top-right-radius: 1rem;
              border-bottom-right-radius: 1rem;

              border-top-left-radius: 0rem;
              border-bottom-left-radius: 0rem;
            `,
            }),
            ThemeButton({
                label: "",
                icon: "",
                theme: DYNAMIC_M3_LIGHT,
                label_css: "unset",
                icon_css: "dynamic-theme-btn-icon",
                css: `
                min-height: 2rem;
                border-top-left-radius: 1rem;
                border-bottom-left-radius: 1rem;

                border-top-right-radius: 0rem;
                border-bottom-right-radius: 0rem;
            `,
            }),
        ],
    });

    // --------------------------
    // ---------- ROWS ----------
    // --------------------------
    const row1 = Box({
        homogeneous: true,
        children: [materialYouTheme, win20Theme],
        spacing: 20,
    });
    const row2 = Box({
        homogeneous: true,
        css: `
            margin-top: 1rem;
        `,
        spacing: 20,
        children: [siberianTheme, blackHoleTheme],
    });
    const row3 = Box({
        homogeneous: true,
        css: `
            margin-top: 1rem;
        `,
        spacing: 20,
        children: [deerTheme, darkTheme],
    });
    const row4 = Box({
        homogeneous: true,
        css: `
            margin-top: 1rem;
        `,
        spacing: 20,
        children: [newCatTheme, circlesTheme],
    });
    const row5 = Box({
        homogeneous: true,
        css: `
            margin-top: 1rem;
        `,
        spacing: 20,
        children: [colorTheme, unicatTheme],
    });

    return Box({
        className: "themes-box",
        vertical: true,
        children: [row1, row2, row3, row4, row5],
    });
};

const PowerButtonsRow = () => {
    const powerBtnMargin =
        local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";

    const powerOff = Button({
        className: "theme-btn",
        css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
                ${powerBtnMargin}
            `,
        child: Label({
            label: "",
        }),
        onClicked: () => execAsync("poweroff").catch(print),
    });

    const reboot = Button({
        className: "theme-btn",
        css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
                ${powerBtnMargin}
            `,
        child: Label({
            label: "",
        }),
        onClicked: () => execAsync("reboot").catch(print),
    });

    const logout = Button({
        className: "theme-btn",
        css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
            `,
        child: Label({
            label: "",
        }),
        onClicked: () => execAsync("loginctl kill-session self").catch(print),
    });

    const row1 = Box({
        children: [powerOff, reboot, logout],
    });

    return Box({
        className: "power-box unset",
        css: `
            margin-top:0rem;
        `,
        vertical: true,
        children: [row1],
    });
};

export const SystemMenu = () =>
    Popup({
        name: "left_menu",
        anchor: ["bottom", "right"],
        transition: "slide_up",
        margins: [30, 6],
        child: Box({
            className: "left-menu-box unset",
            vertical: true,
            children: [
                Header(),
                ThemesButtonsRowOne(),
                MusicPLayer("left-menu-music-wd"),
                PowerButtonsRow(),
            ],
        }),
    });

export const MenuButton = () =>
    Button({
        className: "menu-button unset",
        label: "",
        onClicked: () => App.toggleWindow("left_menu"),
    });
