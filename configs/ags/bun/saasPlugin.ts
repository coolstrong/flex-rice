import type { BunPlugin } from "bun";
import fs from "node:fs/promises";

const plugin: BunPlugin = {
    name: "scss-bundler",
    setup: async build => {
        let bundlePath = `${build.config.root}/scss/widgets.scss`;
        await Bun.write(bundlePath, ""); //clear

        build.onLoad({ filter: /\.scss$/ }, async args => {
            const content = await Bun.file(args.path).text();
            await fs.appendFile(bundlePath, content + "\n");
            return undefined;
        });
    },
};
export default plugin;
