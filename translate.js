const arRegex = /[\u0600-\u06FF][\u0600-\u06FF\s]+[\u0600-\u06FF]/g;
const EXTS = [".js", ".conf", ".sh"];

const scanDir = async (path, callback) => {
    for await (const dirEntry of Deno.readDir(path)) {
        const fullPath = `${path}/${dirEntry.name}`;

        if (dirEntry.isDirectory) {
            await scanDir(fullPath, callback);
        } else {
            if (!EXTS.some($ => fullPath.endsWith($))) continue;

            if (callback) await callback(fullPath);
        }
    }
};

const decoder = new TextDecoder();
const translate = async str => {
    const { stdout } = await new Deno.Command("trans", {
        args: ["-b", str],
    }).output();

    return decoder.decode(stdout).trim();
};

const translateFile = async path => {
    const content = await Deno.readTextFile(path);
    const dict = {};

    for (const ar of [...content.matchAll(arRegex)])
        dict[ar] = await translate(ar);

    if (Object.entries(dict).length > 0)
        await Deno.writeTextFile(
            path,
            content.replace(arRegex, s => dict[s])
        );
};

await scanDir(".", translateFile);
