const MAIN_PATH = `${App.configDir}`;
export const ASSETS_PATH = `${App.configDir}/assets`;

const getAssets = path => {
    return `${ASSETS_PATH}/${path}`;
};

const getPath = path => {
    return `${MAIN_PATH}/${path}`;
};

const settings = {
    assets: {
        wallpapers: getAssets("wallpapers"),
        icons: {
            hot_weather: `${getAssets("icons")}/hot-weather.png`,
            cold_weather: `${getAssets("icons")}/cold-weather.png`,
            mosque: `${getAssets("icons")}/mosque.png`,
        },
        audio: {
            cold_weather: `${getAssets("audio")}/cold-weather.mp3`,
        },
    },
    scripts: {
        scripts: getPath("scripts"),
        dynamicM3Py: getPath("scripts/m3/dynamic-m3.py"),
        get_wallpapers: getPath("scripts/get_wallpapers.sh"),
    },
    theme: {
        scss: `${getPath("scss")}`,
        absoluteDynamicM3Scss: `${getPath("scss/themes/m3/dynamic.scss")}`,
        mainCss: `${getPath("/scss/main.scss")}`,
        styleCss: `${getPath("/style.scss")}`,
    },
};

export default settings;
