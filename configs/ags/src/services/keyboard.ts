import { undef } from "@/utils/common";
import { O, flow, pipe } from "@mobily/ts-belt";
import config from "config";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import { P, match } from "ts-pattern";

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
                O.map(flow(kb => kb.active_keymap, parseKeymap))
            )
        )
        .otherwise(() => undef) ?? config.keyboard.default.keymap;

class KeyboardService extends Service {
    static {
        Service.register(
            this,
            {},
            {
                kbname: ["string", "r"],
                layout: ["string", "r"],
            }
        );
    }

    #kbname = config.keyboard.default.name;
    #layout = getInitialKeymap();

    get kbname() {
        return this.#kbname;
    }
    get layout() {
        return this.#layout;
    }

    constructor() {
        super();
        hyprland.connect("keyboard-layout", (_, ...args) =>
            match(args).with([P.string, P.string], ([kbname, layout]) => {
                this.#kbname = kbname;
                this.changed("kbname");

                this.#layout = parseKeymap(layout);
                this.changed("layout");
            })
        );
    }

    nextLayout() {
        return hyprland.messageAsync(`switchxkblayout ${this.#kbname} next`);
    }
}

export default new KeyboardService();
