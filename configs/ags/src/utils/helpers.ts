export const local: "LTR" | "RTL" = "LTR";

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
