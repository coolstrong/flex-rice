import { match, P } from "ts-pattern";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import themeService from "@/services/ThemeService";
import config from "config.json";

const optionsToModify = ["general:gaps_out", "decoration:rounding"] as const;
const isSingleMonitor = () => hyprland.monitors.length === 1;
const isCurrentWindowFullscreen = () =>
    hyprland.getClient(hyprland.active.client.address)?.fullscreen ?? false;

class HyprExtensionsService extends Service {
    static {
        Service.register(
            this,
            {
                "monitors-changed": [],
            },
            {
                fullscreen: ["boolean", "r"],
            }
        );
    }

    #enabled = isSingleMonitor();
    #fullscreen = isCurrentWindowFullscreen();

    get fullscreen() {
        return this.#fullscreen;
    }

    constructor() {
        super();
        hyprland.connect("event", this.#handleEvent);
    }

    #handleEvent = (_: unknown, ...args: unknown[]) =>
        match(args)
            .with(["fullscreen", P.string.select()], fstate =>
                this.#toggleFullscreenMode(!!parseInt(fstate.trim()))
            )
            .with(["activewindowv2", P.string.select()], winaddr => {
                const fstate = hyprland.getClient(`0x${winaddr}`)?.fullscreen;
                this.#toggleFullscreenMode(fstate ?? false);
            })
            .with(
                [
                    P.union("monitoraddedv2", "monitorremoved"),
                    ...P.array(P.any),
                ],
                //when sending without timeout hyprland.monitors sometimes
                //dont have time to update
                () => setTimeout(this.#onMonitorsChanged, 500)
            );

    #onMonitorsChanged = async () => {
        const singleMon = isSingleMonitor();
        await this.#toggleFullscreenMode(
            singleMon ? isCurrentWindowFullscreen() : false
        );
        this.#enabled = singleMon;
        this.emit("monitors-changed");
    };

    #toggleFullscreenMode = async (newfstate: boolean) => {
        if (!this.#enabled || newfstate === this.#fullscreen) return;

        if (newfstate) {
            await Promise.all(
                optionsToModify.map(opt =>
                    hyprland.messageAsync(`keyword ${opt} 0`)
                )
            );
        } else {
            const rounding = themeService.themeConfig.hypr.rounding;
            await Promise.all([
                hyprland.messageAsync(
                    `keyword decoration:rounding ${rounding}`
                ),
                hyprland.messageAsync(
                    `keyword general:gaps_out ${config.gapsOut}`
                ),
            ]);
        }

        this.#fullscreen = newfstate;
        this.changed("fullscreen");
    };

    toggleEnabled = () => {
        if (this.#enabled) {
            this.#toggleFullscreenMode(false);
        }
        this.#enabled = !this.#enabled;
    };
}

export const hyprext = new HyprExtensionsService();

globalThis.toggleFullscreenWatching = hyprext.toggleEnabled;
