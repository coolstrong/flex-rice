const { Service } = ags;
const { USER, exec, execAsync } = ags.Utils;

import ThemesDictionary from "./themes.js";
import { BLACK_HOLE_THEME } from "./themes.js";


class ThemeService extends Service {
    static {
        Service.register(this,
            {
                'selected-theme': []
            }
        );
    }

    qtFilePath = `/home/${USER}/.config/qt5ct/qt5ct.conf`;
    plasmaColorChanger = ags.App.configDir + '/modules/theme/bin/plasma-theme';
    plasmaColorsPath = ags.App.configDir + '/modules/theme/plasma-colors/';
    selectedTheme = BLACK_HOLE_THEME;

    constructor() {
        super();
        exec('swww init');
        this.changeTheme(this.selectedTheme);
    }

    changeTheme(selectedTheme) {
        let theme = ThemesDictionary[selectedTheme];
        this.selectedTheme = selectedTheme;

        this.changeCss(theme.css_theme);
        this.changeWallpaper(theme.wallpaper);
        this.changePlasmaColor(theme.plasma_color);
        this.changeGTKTheme(theme.gtk_theme, theme.gtk_icon_theme);
        this.changeQtStyle(theme.qt_style_theme);
        this.changeIcons(theme.qt_icon_theme);
        this.changeKvantumTheme(theme.kvantum_theme);
        let hypr = theme.hypr;

        this.steHyprland(
            hypr.border_width,
            hypr.active_border,
            hypr.inactive_border,
            hypr.rounding,
            hypr.drop_shadow,
        )
        this.emit("changed");
    }

    changeWallpaper(wallpaper) {
        execAsync([
            'swww',
            'img',
            '--transition-type',
            'grow',
            '--transition-pos',
            exec('hyprctl cursorpos').replace(' ', ''),
            wallpaper,
        ]).catch(print);
    }

    changeCss(cssTheme) {
        const scss = ags.App.configDir + '/scss/main.scss';
        const css = ags.App.configDir + '/style.css';

        // const sedCommand = `sed -i "1s/^.*$/@import '\\''${cssTheme}.scss'\\'';/" ${scss}`;
        // const sedCommand = `sed -i "1s/.*/This is the new first line/" ${scss}`;
        const newTh = `@import './themes/${cssTheme}';`;

        execAsync([
            "sed",
            "-i",
            `1s|.*|${newTh}|`,
            scss
        ]).then(() => {
            exec(`sassc ${scss} ${css}`);
            ags.App.resetCss();
            ags.App.applyCss(css);
        }).catch(print)
    }

    changePlasmaColor(plasmaColor) {
        execAsync([
            this.plasmaColorChanger,
            '-c',
            this.plasmaColorsPath + plasmaColor
        ]).catch(print);
    }

    changeGTKTheme(GTKTheme, iconTheme) {
        execAsync([
            `gsettings`,
            `set`,
            `org.gnome.desktop.interface`,
            `gtk-theme`,
            GTKTheme
        ]).catch(print);

        execAsync([
            `gsettings`,
            `set`,
            `org.gnome.desktop.wm.preferences`,
            `theme`,
            GTKTheme
        ]).catch(print);

        execAsync([
            `gsettings`,
            `set`,
            `org.gnome.desktop.interface`,
            `icon-theme`,
            iconTheme
        ]).catch(print);
    }

    steHyprland(
        border_width,
        active_border,
        inactive_border,
        rounding,
        drop_shadow,
    ) {
        execAsync(`hyprctl keyword general:border_size ${border_width}`);
        execAsync(`hyprctl keyword general:col.active_border ${active_border}`);
        execAsync(`hyprctl keyword general:col.inactive_border ${inactive_border}`);
        execAsync(`hyprctl keyword decoration:rounding ${rounding}`);
        execAsync(`hyprctl keyword decoration:drop_shadow ${drop_shadow ? 'yes' : 'no'}`);
    }

    changeQtStyle(qtStyle) {
        execAsync([
            'sed',
            '-i',
            `s/style=.*/style=${qtStyle}/g`,
            this.qtFilePath,
        ]).catch(print);
    }

    changeIcons(icons) {
        execAsync([
            'sed',
            '-i',
            `s/icon_theme=.*/icon_theme=${icons}/g`,
            this.qtFilePath,
        ]).catch(print);
    }

    changeKvantumTheme(kvantumTheme) {
        execAsync([
            'kvantummanager',
            '--set',
            kvantumTheme,
        ]).catch(print);
    }

}


// the singleton instance
const themeService = new ThemeService();

// export to use in other modules
export default themeService;