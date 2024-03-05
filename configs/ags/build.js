await Bun.build({
    entrypoints: ["./src/config.js"],
    outdir: "./dist",
    external: [`resource://*`, "gi://*"],
});

export {};
