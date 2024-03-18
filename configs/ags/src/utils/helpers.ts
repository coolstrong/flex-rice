import { undef } from "./common";

export const TitleText = ({
    title = undef as string | undef,
    titleClass = "",
    text = undef as string | undef,
    textClass = "",
    boxClass = "",
    homogeneous = false,
    titleXalign = 0.5,
    textXalign = 0.5,
    vertical = true,
    spacing = 0,
}) => {
    const _title = Widget.Label({
        label: title,
        className: titleClass,
        xalign: titleXalign,
    });

    const _text = Widget.Label({
        label: text,
        className: textClass,
        xalign: textXalign,
    });

    return Widget.Box({
        className: boxClass,
        vertical: vertical,
        homogeneous: homogeneous,
        spacing: spacing,
        children: [_title, _text],
    });
};

export const local = Utils.exec(
    `/home/${Utils.USER}/.config/ags/scripts/lang.sh`
);

export const notify = ({
    tonePath,
    title,
    message,
    icon,
    priority = "normal",
}) => {
    Utils.execAsync([`paplay`, tonePath]).catch(print);

    Utils.execAsync([
        `notify-send`,
        "-u",
        priority,
        "-i",
        icon,
        title,
        message,
    ]);
};
/**
Widget({
    replacement for properties
    attribute: {
        'custom-prop': 123,
        'another': 'xyz',
    },

    setup: self => self
        .on('some-signal-on-this', self => { }) // replacement for connections
        .hook(gobject, self => { }, 'event') // replacement for connections
        .poll(1000, self => { }) // replacement connections
        .bind('prop', gobject, 'target_prop', v => v) // replacement for binds
    })
 * 
 */
export async function bash(
    strings: TemplateStringsArray | string,
    ...values: unknown[]
) {
    const cmd =
        typeof strings === "string"
            ? strings
            : strings.flatMap((str, i) => str + `${values[i] ?? ""}`).join("");

    return Utils.execAsync(["bash", "-c", cmd]).catch(err => {
        console.error(cmd, err);
        return "";
    });
}

/**
 * @returns execAsync(cmd)
 */
export async function sh(cmd: string | string[]) {
    return Utils.execAsync(cmd).catch(err => {
        console.error(typeof cmd === "string" ? cmd : cmd.join(" "), err);
        return "";
    });
}

export function dependencies(...bins: string[]) {
    const missing = bins.filter(bin => {
        return !Utils.exec(`which ${bin}`);
    });

    if (missing.length > 0) {
        console.warn("missing dependencies:", missing.join(", "));
        Utils.notify(`missing dependencies: ${missing.join(", ")}`);
    }

    return missing.length === 0;
}
