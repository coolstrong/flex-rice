const output = await Bun.build({
    entrypoints: ["./src/config.js"],
    outdir: "./dist",
    external: [`resource://*`, "gi://*"],
});

console.log(output.logs);

export {};
