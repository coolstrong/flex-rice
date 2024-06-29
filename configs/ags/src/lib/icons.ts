//copied from https://github.com/Aylur/dotfiles/blob/main/ags/lib/icons.ts
import { undef } from "@/utils/common";
import type { Client } from "@/types/service/hyprland";
import GLib from "@/types/@girs/glib-2.0";
import { O, pipe } from "@mobily/ts-belt";

export const icons = {
    missing: "image-missing-symbolic",
    fallback: {
        executable: "application-x-executable",
        notification: "dialog-information-symbolic",
        video: "video-x-generic-symbolic",
        audio: "audio-x-generic-symbolic",
    },
    ui: {
        close: "window-close-symbolic",
        colorpicker: "color-select-symbolic",
        info: "info-symbolic",
        link: "external-link-symbolic",
        lock: "system-lock-screen-symbolic",
        menu: "open-menu-symbolic",
        refresh: "view-refresh-symbolic",
        search: "system-search-symbolic",
        settings: "emblem-system-symbolic",
        themes: "preferences-desktop-theme-symbolic",
        tick: "object-select-symbolic",
        time: "hourglass-symbolic",
        toolbars: "toolbars-symbolic",
        warning: "dialog-warning-symbolic",
        avatar: "avatar-default-symbolic",
        arrow: {
            right: "pan-end-symbolic",
            left: "pan-start-symbolic",
            down: "pan-down-symbolic",
            up: "pan-up-symbolic",
        },
    },
    audio: {
        mic: {
            muted: "microphone-disabled-symbolic",
            low: "microphone-sensitivity-low-symbolic",
            medium: "microphone-sensitivity-medium-symbolic",
            high: "microphone-sensitivity-high-symbolic",
        },
        volume: {
            muted: "audio-volume-muted-symbolic",
            low: "audio-volume-low-symbolic",
            medium: "audio-volume-medium-symbolic",
            high: "audio-volume-high-symbolic",
            overamplified: "audio-volume-overamplified-symbolic",
        },
        type: {
            headset: "audio-headphones-symbolic",
            speaker: "audio-speakers-symbolic",
            card: "audio-card-symbolic",
        },
        mixer: "mixer-symbolic",
    },
    powerprofile: {
        balanced: "power-profile-balanced-symbolic",
        "power-saver": "power-profile-power-saver-symbolic",
        performance: "power-profile-performance-symbolic",
    },
    asusctl: {
        profile: {
            Balanced: "power-profile-balanced-symbolic",
            Quiet: "power-profile-power-saver-symbolic",
            Performance: "power-profile-performance-symbolic",
        },
        mode: {
            Integrated: "processor-symbolic",
            Hybrid: "controller-symbolic",
        },
    },
    battery: {
        charging: "battery-flash-symbolic",
        warning: "battery-empty-symbolic",
    },
    bluetooth: {
        enabled: "bluetooth-active-symbolic",
        disabled: "bluetooth-disabled-symbolic",
    },
    brightness: {
        indicator: "display-brightness-symbolic",
        keyboard: "keyboard-brightness-symbolic",
        screen: "display-brightness-symbolic",
    },
    powermenu: {
        sleep: "weather-clear-night-symbolic",
        reboot: "system-reboot-symbolic",
        logout: "system-log-out-symbolic",
        shutdown: "system-shutdown-symbolic",
    },
    recorder: {
        recording: "media-record-symbolic",
    },
    notifications: {
        noisy: "org.gnome.Settings-notifications-symbolic",
        silent: "notifications-disabled-symbolic",
        message: "chat-bubbles-symbolic",
    },
    trash: {
        full: "user-trash-full-symbolic",
        empty: "user-trash-symbolic",
    },
    mpris: {
        shuffle: {
            enabled: "media-playlist-shuffle-symbolic",
            disabled: "media-playlist-consecutive-symbolic",
        },
        loop: {
            none: "media-playlist-repeat-symbolic",
            track: "media-playlist-repeat-song-symbolic",
            playlist: "media-playlist-repeat-symbolic",
        },
        playing: "media-playback-pause-symbolic",
        paused: "media-playback-start-symbolic",
        stopped: "media-playback-start-symbolic",
        prev: "media-skip-backward-symbolic",
        next: "media-skip-forward-symbolic",
    },
    system: {
        cpu: "org.gnome.SystemMonitor-symbolic",
        ram: "drive-harddisk-solidstate-symbolic",
        temp: "temperature-symbolic",
    },
    color: {
        dark: "dark-mode-symbolic",
        light: "light-mode-symbolic",
    },
    network: {
        wifi: {
            0: "network-wireless-connected-00",
            25: "network-wireless-connected-25",
            50: "network-wireless-connected-50",
            75: "network-wireless-connected-75",
            100: "network-wireless-connected-100",
            disconnected: "network-wireless-disconnected",
        },
        wired: {
            connected: "network-wired",
            disconnected: "network-wired-unavailable",
        },
    },
};

const Apps = await Service.import("applications");

const directClassMatch = {
    "code-url-handler": "visual-studio-code",
    "vivaldi-hnpfjngllnobngcgfapefoaidbinmjnm-Default": "wazzapp",
    "vivaldi-knaiokfnmjjldlfhlioejgcompgenfhb-Default": "todoist",
};

const terminalApps: [RegExp, string][] = [
    [/^helix/g, "helix"],
    [/^br(oot)?/g, "/home/deni/Pictures/icons/broot.png"],
    [/^btm/g, "/home/deni/Pictures/icons/monitoring.png"],
    [/^yetris/g, "/home/deni/Pictures/icons/tetris.png"],
    [/^nvim/g, "/home/deni/Pictures/icons/neovim.png"],
    [/^Yazi/g, "yazi"],
];

const iconResolvers: Array<(client: Client) => string | undef> = [
    c => (c.initialTitle.startsWith("Spotify") ? "spotify" : undef),
    c => (c.initialTitle.startsWith("Spotify") ? "spotify-launcher" : undef),
    c =>
        c.class === "kitty"
            ? terminalApps.find(([re]) => re.test(c.title))?.[1]
            : undef,
    c => directClassMatch[c.class],
    c =>
        Apps.list.find(app => app.match(c.class) || app.wm_class === c.class)
            ?.icon_name,
];

export const ensureIconExist = (icon: string | undef | null) =>
    icon &&
    (Utils.lookUpIcon(icon) || GLib.file_test(icon, GLib.FileTest.EXISTS))
        ? icon
        : undef;

export const windowIcon = (client: Client): string =>
    iconResolvers.reduce(
        (acc, resolver) => acc ?? ensureIconExist(resolver(client)),
        undef as string | undef,
    ) ?? icons.fallback.executable;
