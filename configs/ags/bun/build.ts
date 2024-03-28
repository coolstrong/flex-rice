import { watch } from "node:fs";
import saasPlugin from "./saasPlugin.ts";
import * as path from "path";

const build = () =>
    Bun.build({
        entrypoints: ["./src/config.js"],
        external: ["resource://*", "gi://*"],
        plugins: [saasPlugin],
        root: ".",
    }).then(async output => {
        const artifact = output.outputs[0];
        if (artifact)
            await Bun.write("./dist/config.js", await artifact.text());

        console.log(
            output.success
                ? "Built successfully"
                : `Build failed: ${output.logs}`,
        );
    });

if (Bun.argv.at(-1) === "watch") {
    const watcher = watch("./src", { recursive: true }, (event, filename) => {
        if (
            filename &&
            [".sass", ".scss", ".ts", ".js"].includes(path.extname(filename))
        ) {
            console.log(`${event}: ${filename}`);
            build();
        }
    });

    process.on("SIGINT", () => {
        watcher.close();
        process.exit();
    });
}

await build();
