import ThemesDictionary, {
    BLACK_HOLE_THEME,
    CIRCLES_THEME,
    COLOR_THEME,
    DARK_THEME,
    DEER_THEME,
    MATERIAL_YOU,
    NEW_CAT_THEME,
    SIBERIAN_THEME,
    UNICAT_THEME,
    WIN_20,
} from "../theme/themes.js";
import {
    execAsync,
    timeout,
    USER,
} from "resource:///com/github/Aylur/ags/utils.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Service from "resource:///com/github/Aylur/ags/service.js";
import { bash, hyprBatch } from "@/utils/helpers.js";

class ThemeService extends Service {
    static {
        Service.register(
            this,
            {},
            {
                dynamicWallpaperIsOn: ["boolean", "r"],
                isDynamicTheme: ["boolean", "r"],
            },
        );
    }

    qt5FilePath = `/home/${USER}/.config/qt5ct/qt5ct.conf`;
    qt6FilePath = `/home/${USER}/.config/qt6ct/qt6ct.conf`;
    plasmaColorChanger = App.configDir + "/modules/theme/bin/plasma-theme";
    plasmaColorsPath = App.configDir + "/modules/theme/plasma-colors/";
    selectedTheme = BLACK_HOLE_THEME;

    CACHE_FILE_PATH = `/home/${USER}/.cache/ahmed-hyprland-conf.temp`;

    constructor() {
        super();
        this.getCachedVariables();
        this.changeTheme(this.selectedTheme);
    }

    /**
     * @param {number} selectedTheme
     */
    changeTheme(selectedTheme) {
        let theme = ThemesDictionary[selectedTheme];

        this.changeCss(theme.css_theme);
        this.changeWallpaper(theme.wallpaper);

        this.changePlasmaColor(theme.plasma_color);

        this.changeGTKTheme(
            theme.gtk_theme,
            theme.gtk_mode,
            theme.gtk_icon_theme,
        );

        this.changeQtStyle(theme.qt_5_style_theme, theme.qt_6_style_theme);
        this.changeIcons(theme.qt_icon_theme);
        this.changeKvantumTheme(theme.kvantum_theme);

        let hypr = theme.hypr;
        this.steHyprland(
            hypr.border_width,
            hypr.active_border,
            hypr.inactive_border,
            hypr.rounding,
            hypr.drop_shadow,
        );

        //TODO: add dynamic change via @kitten set-colors
        this.setKitty(hypr.kitty);

        this.selectedTheme = selectedTheme;
        this.emit("changed");

        this.cacheVariables();
    }

    async changeWallpaper(wallpaper) {
        await execAsync("pkill swaybg").catch(print);
        await bash`swaybg --mode fill --image '${wallpaper}' &`.catch(print);
    }

    changeCss(cssTheme) {
        const newTh = `@import './themes/${cssTheme}';`;
        Utils.writeFile(newTh, `${App.configDir}/scss/theme.scss`).catch(print);
    }

    changePlasmaColor(plasmaColor) {
        const plasmaCmd = `plasma-apply-colorscheme`;
        execAsync([plasmaCmd, plasmaColor.split(".")[0]]).catch(print);
    }

    changeGTKTheme(GTKTheme, gtkMode, iconTheme, fontName) {
        execAsync([
            `gsettings`,
            `set`,
            `org.gnome.desktop.interface`,
            `color-scheme`,
            `prefer-${gtkMode}`,
        ]).catch(print);

        execAsync([
            `gsettings`,
            `set`,
            `org.gnome.desktop.interface`,
            `gtk-theme`,
            `Adwaita`,
        ]).catch(print);

        setTimeout(() => {
            execAsync([
                `gsettings`,
                `set`,
                `org.gnome.desktop.interface`,
                `gtk-theme`,
                GTKTheme,
            ]).catch(print);

            execAsync([
                `gsettings`,
                `set`,
                `org.gnome.desktop.wm.preferences`,
                `theme`,
                GTKTheme,
            ]).catch(print);
        }, 2000);

        execAsync([
            `gsettings`,
            `set`,
            `org.gnome.desktop.interface`,
            `icon-theme`,
            iconTheme,
        ]).catch(print);
    }

    /**
     * @param {string} kittyTheme
     */
    setKitty(kittyTheme) {
        return Utils.writeFile(
            `include ./themes/${kittyTheme}`,
            ".config/kitty/colors.conf",
        ).catch(print);
    }

    steHyprland(
        border_width,
        active_border,
        inactive_border,
        rounding,
        drop_shadow,
    ) {
        timeout(1000, () => {
            hyprBatch(
                `keyword general:border_size ${border_width}`,

                `keyword general:col.active_border ${active_border}`,
                `keyword group:col.border_active ${active_border}`,
                // `keyword group:groupbar:col.active ${active_border}`,

                `keyword general:cdol.inactive_border ${inactive_border}`,
                `keyword group:col.inactive_border ${inactive_border}`,
                // `keyword group:groupbar:col.inactive ${inactive_border}`,

                `keyword decoration:drop_shadow ${drop_shadow ? "yes" : "no"}`,
                `keyword decoration:rounding ${rounding}`,
            );
        });
    }

    changeQtStyle(qt5Style, qt6Style) {
        execAsync([
            "sed",
            "-i",
            `s/style=.*/style=${qt5Style}/g`,
            this.qt5FilePath,
        ]).catch(print);

        execAsync([
            "sed",
            "-i",
            `s/style=.*/style=${qt6Style}/g`,
            this.qt6FilePath,
        ]).catch(print);
    }

    changeIcons(icons) {
        execAsync([
            "sed",
            "-i",
            `s/icon_theme=.*/icon_theme=${icons}/g`,
            this.qt5FilePath,
        ]).catch(print);

        execAsync([
            "sed",
            "-i",
            `s/icon_theme=.*/icon_theme=${icons}/g`,
            this.qt6FilePath,
        ]).catch(print);
    }

    changeKvantumTheme(kvantumTheme) {
        execAsync(["kvantummanager", "--set", kvantumTheme]).catch(print);
    }

    cacheVariables() {
        const newData = {
            selected_theme: this.selectedTheme,
            selected_dark_wallpaper: this.selectedDarkWallpaper,
            selected_light_wallpaper: this.selectedLightWallpaper,
            dynamic_wallpaper_status: this.dynamicWallpaperStatus,
        };
        Utils.writeFile(
            JSON.stringify(newData, null, 2),
            this.CACHE_FILE_PATH,
        ).catch(err => print(err));
    }

    getCachedVariables() {
        try {
            const cachedData = JSON.parse(Utils.readFile(this.CACHE_FILE_PATH));
            this.selectedTheme = cachedData.selected_theme;
            this.selectedDarkWallpaper = cachedData.selected_dark_wallpaper;
            this.selectedLightWallpaper = cachedData.selected_light_wallpaper;
            this.dynamicWallpaperStatus = cachedData.dynamic_wallpaper_status;

            if (!this.selectedTheme) {
                this.selectedTheme = UNICAT_THEME;
            }
        } catch (TypeError) {
            this.cacheVariables();
        }
    }
}

// the singleton instance
const themeService = new ThemeService();

const dictionary = {
    "Black hole": BLACK_HOLE_THEME,
    Deer: DEER_THEME,
    Color: COLOR_THEME,
    Water: SIBERIAN_THEME,
    Pastel: MATERIAL_YOU,
    Windows: WIN_20,
    Dark: DARK_THEME,
    Unicat: UNICAT_THEME,
    "New cat": NEW_CAT_THEME,
    Circles: CIRCLES_THEME,
};
//hook for changing themes with external scripts
/**
 * @param {string} theme
 */
globalThis.changeTheme = theme => {
    if (theme in dictionary) themeService.changeTheme(dictionary[theme]);
};

export default themeService;
