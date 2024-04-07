import { match, P } from "ts-pattern";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";

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
            },
        );
    }

    get fullscreen() {
        return false;
    }

    constructor() {
        super();
        hyprland.connect("event", this.#handleEvent);
    }

    #handleEvent = (_: unknown, ...args: unknown[]) =>
        match(args).with(
            [P.union("monitoraddedv2", "monitorremoved"), ...P.array(P.any)],
            //when sending without timeout hyprland.monitors sometimes
            //dont have time to update
            () => setTimeout(this.#onMonitorsChanged, 500),
        );

    #onMonitorsChanged = async () => {
        this.emit("monitors-changed");
    };
}

export const hyprext = new HyprExtensionsService();
