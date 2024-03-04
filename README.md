# My Hyprland Config

<details>

**Note:** This configuration is a work in progress, and I will continue to add more features as time permits.

### Required dependencies:

-   [Hyprland](https://wiki.hyprland.org/Getting-Started/Installation/)
-   [AGS](https://github.com/Aylur/ags/wiki/installation)
-   Wofi
-   network-manager-applet
-   playerctl
-   polkit-kde-agent
-   ttf-font-awesome-5
-   qt5ct
-   Dolphin
-   brightnessctl
-   gammastep
-   wl-clipboard
-   hyprpicker
-   sysstat
-   bc
-   kitty
-   sassc
-   systemsettings
-   acpi
-   [KDE Material You Colors](https://github.com/luisbocanegra/kde-material-you-colors)

### Optional dependencies:

-   strawberry
-   easyeffects
-   nwg-look
-   blueman
-   telegram-desktop
-   discord
-   qt5-gsettings
-   kvantum
-   lightly-qt
-   konsole
-   vs code
-   firefox

## Installing:

### Installing dependencies for Arch Users:

```bash
yay -S base-devel strawberry brightnessctl network-manager-applet telegram-desktop wofi qt5-gsettings konsole blueman ark dolphin ffmpegthumbs playerctl lightly-qt kvantum polkit-kde-agent ttf-font-awesome-5 jq gufw qt5ct tar gammastep wl-clipboard nwg-look-bin visual-studio-code-bin firefox easyeffects hyprpicker discord hyprshot-git bc sysstat kitty sassc systemsettings ttf-font-awesome-5 orchis-theme-git acpi fish kde-material-you-colors
```

**Note:** If you use an operating system other than Arch, you will need to install all required dependencies. The specific steps may vary depending on your distro.

#### Example:

-   For **Debian/Ubuntu-based** systems, you can install dependencies using `apt install` or search using `apt search hyprland`.
-   On **Fedora/RHEL**, use `dnf install` or `yum install`
-   For other package managers, search for each dependency and install using your system's package manager.

### Setting up files:

    git clone git@github.com:AhmedSaadi0/my-hyprland-config.git

    # backup your files
    mv ~/.config/hypr/ ~/.config/hypr-old
    mv ~/.config/ags/ ~/.config/ags-old
    mv ~/.config/wofi/ ~/.config/wofi-old
    cp ~/.config/fish/config.fish ~/.config/fish/config.back.fish

    # copy files
    cp -r my-hyprland-config ~/.config/hypr
    cp -r ~/.config/hypr/configs/ags ~/.config/ags
    cp -r ~/.config/hypr/configs/wofi ~/.config/wofi
    cp ~/.config/hypr/configs/config.fish ~/.config/fish/config.fish

    # set permissions for scripts
    sudo chmod +x ~/.config/hypr/scripts/*
    sudo chmod +x ~/.config/ags/scripts/*

    # setup environment
    sudo cp /etc/environment /etc/environmentOLD
    echo 'QT_QPA_PLATFORMTHEME=qt5ct' | sudo tee -a /etc/environment

    # copy theme files
    mkdir ~/.local/share/color-schemes/
    cp ~/.config/ags/modules/theme/plasma-colors/* ~/.local/share/color-schemes/
    cp ~/.config/hypr/configs/qt5ct.conf ~/.config/qt5ct/

    mkdir ~/.fonts
    cp -r ~/.config/hypr/configs/.fonts/* ~/.fonts

    mkdir ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/BeautySolar.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/Delight-brown-dark.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/Gradient-Dark-Icons.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/Infinity-Dark-Icons.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/kora-grey-light-panel.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/Magma.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/NeonIcons.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/la-capitaine-icon-theme.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/oomox-aesthetic-dark.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/Vivid-Dark-Icons.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/Windows11-red-dark.tar.gz -C ~/.local/share/icons
    tar xvf ~/.config/hypr/configs/icons/Zafiro-Nord-Dark-Black.tar.gz -C ~/.local/share/icons

    mkdir ~/.themes
    tar xvf ~/.config/hypr/configs/gtk-themes/Cabinet-Light-Orange.tar.gz -C ~/.themes
    tar xvf ~/.config/hypr/configs/gtk-themes/Kimi-dark.tar.gz -C ~/.themes
    tar xvf ~/.config/hypr/configs/gtk-themes/Nordic-darker-standard-buttons.tar.gz -C ~/.themes
    tar xvf ~/.config/hypr/configs/gtk-themes/Orchis-Green-Dark-Compact.tar.gz -C ~/.themes
    tar xvf ~/.config/hypr/configs/gtk-themes/Shades-of-purple.tar.xz -C ~/.themes
    tar xvf ~/.config/hypr/configs/gtk-themes/Tokyonight-Dark-BL.tar.gz -C ~/.themes
    tar xvf ~/.config/hypr/configs/gtk-themes/Dracula.tar.gz -C ~/.themes

### You can change system fonts if you want to 'JF Flat' to have the same font I had

### Creating crontab for battery 40-80 rule:

    VISUAL=/usr/bin/nano crontab -e
    * * * * * ~/.config/hypr/scripts/battery.sh

### Change weather location

-   From the settings file in `.configs/ags/modules/settings.js`

```javascript
weather:{
	// provider is 'ar.wttr.in'
	language: 'ar', // Not implemented yot - only arabic is supported
	location: 'sanaa',
	format: 'j1',
}
```

### Setting up Material 3 theme

-   You need to have [KDE Material You Colors](https://github.com/luisbocanegra/kde-material-you-colors) installed on your system

_If you use Arch you can install it from aur_

```Arch
yay -S kde-material-you-colors
```

-   Change wallpapers paths for dark & light themes in `modules/theme/themes.js`
-   `wallpaper_path: "path/to/folder"`
-   `interval: time_in_millisecond`

```javascript
const dynamicM3Dark = {
    wallpaper_path: `/media/shared/Pictures/wallpapers/dark`,
    interval: 15 * 60 * 1000,
    ...other_settings,
};
const dynamicM3Light = {
    wallpaper_path: `/media/shared/Pictures/wallpapers/light`,
    interval: 15 * 60 * 1000,
    ...other_settings,
};
```

</details>
