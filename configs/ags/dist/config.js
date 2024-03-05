// src/config.js
import App4 from "resource:///com/github/Aylur/ags/app.js";
import Notifications4 from "resource:///com/github/Aylur/ags/service/notifications.js";

// src/utils/common.ts
var undef = undefined;

// src/utils/helpers.js
var TitleText = ({
  title = undef,
  titleClass = "",
  text = undef,
  textClass = "",
  boxClass = "",
  homogeneous = false,
  titleXalign = 0.5,
  textXalign = 0.5,
  vertical = true,
  spacing = 0
}) => {
  const _title = Widget.Label({
    label: title,
    className: titleClass,
    xalign: titleXalign
  });
  const _text = Widget.Label({
    label: text,
    className: textClass,
    xalign: textXalign
  });
  return Widget.Box({
    className: boxClass,
    vertical,
    homogeneous,
    spacing,
    children: [_title, _text]
  });
};
var local = Utils.exec(`/home/${Utils.USER}/.config/ags/scripts/lang.sh`);
var notify = ({
  tonePath,
  title,
  message,
  icon,
  priority = "normal"
}) => {
  Utils.execAsync([`paplay`, tonePath]).catch(print);
  Utils.execAsync([
    `notify-send`,
    "-u",
    priority,
    "-i",
    icon,
    title,
    message
  ]);
};

// src/menus/HardwareMenu.ts
var Battery = await Service.import("battery");
var menuIsOpen = null;
var cpuIsInitialized = false;
var ramIsInitialized = false;
var ramUsage = 0;
var cpuUsage = 0;
var cpuProgress = Widget.CircularProgress({
  className: "menu-cpu",
  child: Widget.Label({
    className: "menu-cpu-icon",
    label: "\uF2DB"
  }),
  startAt: 0,
  rounded: false
}).poll(1000, (self) => {
  if (menuIsOpen) {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/cpu.sh`).then(parseFloat).then((val) => {
      cpuProgress.value = val / 100;
      self.child.tooltipMarkup = `<span weight='bold'>CPU usage (${val}%)</span>`;
      cpuUsage = val;
    }).catch(print);
  }
});
var ramProgress = Widget.CircularProgress({
  className: "menu-ram",
  child: Widget.Label({
    className: "menu-ram-icon",
    label: "\uF538"
  }),
  startAt: 0,
  rounded: false
}).poll(1000, (self) => {
  if (menuIsOpen) {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/ram.sh`).then(parseFloat).then((val) => {
      self.value = val / 100;
      self.child.tooltipMarkup = `<span weight='bold'>RAM usage (${val}%)</span>`;
      ramUsage = val;
    }).catch(print);
  }
});
var batteryProgress = Widget.CircularProgress({
  className: "menu-battery",
  child: Widget.Label({
    className: "menu-battery-icon",
    label: "\uF240"
  }),
  startAt: 0,
  rounded: false
}).hook(Battery, (self) => {
  let percentage = Battery.percent;
  self.value = percentage / 100;
  var label = "";
  if (Battery.charging) {
    if (percentage <= 55) {
      label = "\uDB84\uDEA4";
    } else if (percentage <= 70) {
      label = "\uDB84\uDEA5";
    } else if (percentage > 70) {
      label = "\uDB84\uDEA6";
    }
    self.child.class_name = "menu-battery-icon-charging";
  } else {
    if (percentage <= 55) {
      label = "\uDB84\uDEA1";
    } else if (percentage <= 70) {
      label = "\uDB84\uDEA2";
    } else if (percentage > 70) {
      label = "\uDB84\uDEA3";
    }
    self.child.class_name = "menu-battery-icon";
  }
  self.child.label = label;
  self.child.tooltipMarkup = `<span weight='bold'>Battery percentage (${percentage}%)</span>`;
});
var tempProgress = Widget.CircularProgress({
  className: "menu-temp",
  child: Widget.Label({
    className: "menu-temp-icon",
    label: "\uF769"
  }),
  startAt: 0,
  rounded: false
}).poll(30000, (self) => {
  Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/temp.sh`).then((val) => {
    const temps = val.split("\n");
    let total = 0;
    for (let index = 0;index < temps.length; index++) {
      const element = temps[index].replace("+", "").replace("\xB0C", "");
      total += parseInt(element);
    }
    total = total / temps.length;
    self.value = total / 100;
    self.child.tooltipMarkup = `<span weight='bold'>Total temperature of the devices (${total}%)</span>`;
  }).catch(print);
});
var headerBox = Widget.Box({
  className: "hardware-menu-header-box",
  spacing: 32,
  children: [cpuProgress, ramProgress, batteryProgress, tempProgress]
});
var tableRow = ({
  appName = "",
  percentage = "",
  header = false,
  deviceName,
  rightTextMaxWidthChars = 9,
  rightTextXalign = 0,
  leftTextMaxWidthChars = 5,
  leftTextXalign = 1
}) => Widget.Box({
  className: header ? `hardware-${deviceName}-table-row-header` : `hardware-${deviceName}-table-row`,
  children: [
    Widget.Label({
      className: header ? "table-row-app-name-header" : "table-row-app-name",
      label: appName,
      justification: "center",
      truncate: "end",
      xalign: rightTextXalign,
      maxWidthChars: rightTextMaxWidthChars,
      wrap: true,
      useMarkup: true
    }),
    Widget.Label({
      className: header ? "table-row-app-percentage-header" : "table-row-app-percentage",
      label: percentage,
      justification: "center",
      truncate: "end",
      xalign: leftTextXalign,
      maxWidthChars: leftTextMaxWidthChars,
      wrap: true,
      useMarkup: true
    })
  ]
});
var hardwareUsageTable = ({
  scriptPath,
  deviceName,
  interval = 2000,
  headerRightText = "Operation",
  headerLeftText = "%"
}) => {
  const table = Widget.Box({
    className: `hardware-${deviceName}-box`,
    vertical: true,
    children: []
  });
  if (scriptPath) {
    table.poll(interval, (self) => {
      if (deviceName === "cpu") {
        headerLeftText = `${cpuUsage}%`;
      }
      if (deviceName === "ram") {
        headerLeftText = `${ramUsage}%`;
      }
      if (!cpuIsInitialized || !ramIsInitialized || menuIsOpen) {
        Utils.execAsync(scriptPath).then((val) => {
          let data = JSON.parse(val);
          let children = [
            tableRow({
              appName: headerRightText,
              percentage: headerLeftText,
              header: true,
              deviceName
            })
          ];
          for (let index = 0;index < data.length; index++) {
            const element = data[index];
            children.push(tableRow({
              appName: element["process"],
              percentage: element["%"],
              deviceName
            }));
          }
          self.children = children;
        }).catch(print);
        if (deviceName === "cpu" && !cpuIsInitialized) {
          cpuIsInitialized = true;
        }
        if (deviceName === "ram" && !ramIsInitialized) {
          ramIsInitialized = true;
        }
      }
    });
  }
  return table;
};
var tablesBox = () => {
  let batDeviceName = "bat";
  let batteryTable = hardwareUsageTable({
    scriptPath: "",
    deviceName: batDeviceName
  }).hook(Battery, (self) => {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/hardware_info.sh`).then((val) => {
      let data = JSON.parse(val);
      let children = [
        tableRow({
          appName: "the battery",
          percentage: "",
          header: true,
          deviceName: batDeviceName,
          rightTextXalign: 1
        }),
        tableRow({
          appName: "The ratio  ",
          percentage: `${Battery.percent}%`,
          deviceName: batDeviceName
        }),
        tableRow({
          appName: local === "RTL" ? "the health   \uE793" : "Health   \uE793",
          percentage: data["Capacity"] + "%",
          deviceName: batDeviceName
        }),
        tableRow({
          appName: local === "RTL" ? "Voltages  \uEB2D" : "Voltage  \uEB2D",
          percentage: data["Voltage"],
          deviceName: batDeviceName
        }),
        tableRow({
          appName: local === "RTL" ? "energy  \uEA16" : "Energy  \uEA16",
          percentage: `${Battery.energy}`,
          deviceName: batDeviceName
        }),
        tableRow({
          appName: local === "RTL" ? "Courses  \uED3E" : "Cycles  \uED3E",
          percentage: data["Charge_Cycles"],
          deviceName: batDeviceName
        })
      ];
      self.children = children;
    }).catch(print);
  });
  let osClassName = "os";
  let tempTable = hardwareUsageTable({
    scriptPath: "",
    deviceName: osClassName
  }).hook(Battery, (self) => {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/uptime.sh`).then((val) => {
      let children = [
        tableRow({
          appName: "System",
          percentage: "",
          header: true,
          rightTextXalign: 1,
          deviceName: osClassName
        }),
        tableRow({
          appName: "Arch",
          percentage: "\uF303",
          deviceName: osClassName
        }),
        tableRow({
          appName: val,
          percentage: "\uECC5",
          deviceName: osClassName
        }),
        tableRow({
          appName: "Ahmed",
          percentage: "\uF345",
          deviceName: osClassName
        })
      ];
      self.children = children;
    }).catch(print);
  });
  return Widget.Box({
    className: "hardware-menu-tables-box",
    spacing: 13,
    children: [
      hardwareUsageTable({
        scriptPath: `/home/${Utils.USER}/.config/ags/scripts/cpu_usage.sh`,
        deviceName: "cpu",
        headerRightText: "CPU"
      }),
      hardwareUsageTable({
        scriptPath: `/home/${Utils.USER}/.config/ags/scripts/ram_usage.sh`,
        deviceName: "ram",
        headerRightText: "RAM"
      }),
      Widget.Box({
        vertical: true,
        children: [batteryTable, tempTable]
      })
    ]
  });
};
var menuRevealer = Widget.Revealer({
  transition: "slide_down",
  child: Widget.Box({
    className: "hardware-menu-box",
    vertical: true,
    children: [headerBox, tablesBox()]
  })
});
var HardwareMenu = () => Widget.Window({
  name: `hardware_menu`,
  margins: [6, 250],
  anchor: ["top", local === "RTL" ? "right" : "left"],
  child: Widget.Box({
    css: `
            min-height: 2px;
        `,
    children: [menuRevealer]
  })
});
globalThis.showHardwareMenu = () => {
  menuRevealer.revealChild = !menuRevealer.revealChild;
  menuIsOpen = menuRevealer.revealChild;
};

// src/settings.js
var MAIN_PATH = `${App.configDir}`;
var ASSETS_PATH = `${App.configDir}/assets`;
var getAssets = (path) => {
  return `${ASSETS_PATH}/${path}`;
};
var getPath = (path) => {
  return `${MAIN_PATH}/${path}`;
};
var settings = {
  assets: {
    wallpapers: getAssets("wallpapers"),
    icons: {
      hot_weather: `${getAssets("icons")}/hot-weather.png`,
      cold_weather: `${getAssets("icons")}/cold-weather.png`,
      mosque: `${getAssets("icons")}/mosque.png`
    },
    audio: {
      cold_weather: `${getAssets("audio")}/cold-weather.mp3`
    }
  },
  scripts: {
    scripts: getPath("scripts"),
    dynamicM3Py: getPath("scripts/m3/dynamic-m3.py"),
    get_wallpapers: getPath("scripts/get_wallpapers.sh")
  },
  theme: {
    scss: `${getPath("scss")}`,
    absoluteDynamicM3Scss: `${getPath("scss/themes/m3/dynamic.scss")}`,
    mainCss: `${getPath("/scss/main.scss")}`,
    styleCss: `${getPath("/style.scss")}`
  },
  weather: {
    language: "ar",
    location: "sanaa",
    format: "j1"
  }
};
var settings_default = settings;

// src/services/WeatherService.js
class WeatherService extends Service {
  static {
    Service.register(this, {}, {
      arValue: ["string", "r"],
      weatherCode: ["string", "r"],
      maxTempC: ["float", "r"],
      minTempC: ["float", "r"],
      feelsLike: ["float", "r"],
      tempC: ["float", "r"],
      pressure: ["float", "r"],
      windspeedKmph: ["float", "r"],
      humidity: ["float", "r"],
      cloudcover: ["float", "r"],
      observation_time: ["string", "r"],
      areaName: ["string", "r"],
      sunrise: ["string", "r"],
      sunset: ["string", "r"],
      moonrise: ["string", "r"],
      moonset: ["string", "r"],
      avgTempC1: ["string", "r"],
      weatherCode1: ["string", "r"],
      weatherTime1: ["string", "r"],
      avgTempC2: ["string", "r"],
      weatherCode2: ["string", "r"],
      weatherTime2: ["string", "r"],
      avgTempC3: ["string", "r"],
      weatherCode3: ["string", "r"],
      weatherTime3: ["string", "r"],
      hourly: ["dictionary", "r"]
    });
  }
  coldWeatherWarned = false;
  hotWeatherWarned = false;
  constructor() {
    super();
    this.state = {};
    this.initWeather();
  }
  initWeather() {
    Utils.interval(900000, () => {
      this.getWeather();
    });
  }
  getWeather() {
    Utils.execAsync([
      "curl",
      `${settings_default.weather.language}.wttr.in/${settings_default.weather.location}?format=${settings_default.weather.format}`
    ]).then((val) => {
      const jsonData = JSON.parse(val);
      this.state = jsonData;
      this.checkColdWeather();
      this.emit("changed");
    }).catch(() => {
      const source = setTimeout(() => {
        this.getWeather();
        source.destroy();
        this.checkColdWeather();
      }, 300000);
    });
  }
  checkColdWeather() {
    if (parseInt(this.minTempC) <= 7 && !this.coldWeatherWarned) {
      notify({
        tonePath: settings_default.assets.audio.cold_weather,
        title: "Cold weather",
        message: `Lowest temperature today ${this.minTempC}\xB0`,
        icon: settings_default.assets.icons.cold_weather,
        priority: "critical"
      });
      this.coldWeatherWarned = true;
    } else if (parseInt(this.maxTempC) > 30 && !this.hotWeatherWarned) {
      notify({
        tonePath: settings_default.assets.audio.cold_weather,
        title: "Hot weather",
        message: `High temperature today ${this.maxTempC}\xB0`,
        icon: settings_default.assets.icons.hot_weather
      });
      this.hotWeatherWarned = true;
    }
  }
  isDay() {
    const sunriseTime = this.sunrise;
    const sunsetTime = this.sunset;
    const currentTime = new Date;
    const sunrise = new Date;
    const sunset = new Date;
    const sunriseComponents = sunriseTime.split(" ")[0].split(":");
    const sunriseHour = Number(sunriseComponents[0]);
    const sunriseMinute = Number(sunriseComponents[1]);
    const sunrisePeriod = sunriseTime.split(" ")[1];
    const sunsetComponents = sunsetTime.split(" ")[0].split(":");
    const sunsetHour = Number(sunsetComponents[0]);
    const sunsetMinute = Number(sunsetComponents[1]);
    const sunsetPeriod = sunsetTime.split(" ")[1];
    sunrise.setHours(sunriseHour + (sunrisePeriod === "PM" && sunriseHour !== 12 ? 12 : 0));
    sunrise.setMinutes(sunriseMinute);
    sunset.setHours(sunsetHour + (sunsetPeriod === "PM" && sunsetHour !== 12 ? 12 : 0));
    sunset.setMinutes(sunsetMinute);
    return currentTime > sunrise && currentTime < sunset;
  }
  get arValue() {
    try {
      return this.state?.current_condition?.[0]?.lang_ar[0].value;
    } catch (TypeError) {
      return this.state?.current_condition?.[0]?.weatherDesc?.[0]?.value || "";
    }
  }
  get weatherCode() {
    const weatherCode = this.state?.current_condition?.[0]?.weatherCode;
    if (this.isDay()) {
      return sun_icon_dic[weatherCode] || "";
    } else {
      return moon_icon_dic[weatherCode] || "";
    }
  }
  get maxTempC() {
    return this.state?.weather?.[0]?.maxtempC || "";
  }
  get minTempC() {
    return this.state?.weather?.[0]?.mintempC || "";
  }
  get tempC() {
    return this.state?.current_condition?.[0]?.temp_C || "";
  }
  get feelsLike() {
    return this.state?.current_condition?.[0].FeelsLikeC || "";
  }
  get pressure() {
    return this.state?.current_condition?.[0].pressure || "";
  }
  get windspeedKmph() {
    return this.state?.current_condition?.[0].windspeedKmph || "";
  }
  get humidity() {
    return this.state?.current_condition?.[0].humidity || "";
  }
  get cloudcover() {
    return this.state?.current_condition?.[0].cloudcover || "";
  }
  get observation_time() {
    return this.state?.current_condition?.[0].observation_time || "";
  }
  get areaName() {
    return this.state?.nearest_area?.[0].areaName[0].value || "";
  }
  get sunrise() {
    return this.state?.weather?.[0].astronomy[0].sunrise || "18:00";
  }
  get sunset() {
    return this.state?.weather?.[0].astronomy[0].sunset || "05:00";
  }
  get moonrise() {
    return this.state?.weather?.[0].astronomy[0].moonrise || "";
  }
  get moonset() {
    return this.state?.weather?.[0].astronomy[0].moonset || "";
  }
  get avgTempC1() {
    return `${this.state?.weather?.[0]?.avgtempC || ""} C\xB0`;
  }
  get weatherCode1() {
    const weatherCode = this.state?.weather?.[0]?.hourly?.[4]?.weatherCode;
    if (this.isDay()) {
      return sun_icon_dic[weatherCode] || "";
    } else {
      return moon_icon_dic[weatherCode] || "";
    }
  }
  get weatherTime1() {
    return "today";
  }
  get avgTempC2() {
    return `${this.state?.weather?.[1]?.avgtempC || ""} C\xB0`;
  }
  get weatherCode2() {
    const weatherCode = this.state?.weather?.[1]?.hourly?.[4]?.weatherCode;
    if (this.isDay()) {
      return sun_icon_dic[weatherCode] || "";
    } else {
      return moon_icon_dic[weatherCode] || "";
    }
  }
  get weatherTime2() {
    return "tomorrow";
  }
  get avgTempC3() {
    return `${this.state?.weather?.[2]?.avgtempC || ""} C\xB0`;
  }
  get weatherCode3() {
    const weatherCode = this.state?.weather?.[2]?.hourly?.[4]?.weatherCode;
    if (this.isDay()) {
      return sun_icon_dic[weatherCode] || "";
    } else {
      return moon_icon_dic[weatherCode] || "";
    }
  }
  get weatherTime3() {
    return "after tomorrow";
  }
  getHourlyByIndex(index, dict) {
    var arValue = null;
    try {
      arValue = this.state?.weather?.[0]?.hourly?.[index]?.lang_ar[0]?.value;
    } catch (TypeError) {
      arValue = this.state?.weather?.[0]?.hourly?.[index]?.weatherDesc?.[0]?.value || "-";
    }
    const hourly = {
      tempC: this.state?.weather?.[0]?.hourly?.[index]?.tempC || "",
      lang_ar: arValue,
      weatherDesc: this.state?.weather?.[0]?.hourly?.[index]?.weatherDesc?.[0]?.value || "",
      weatherCode: dict[this.state?.weather?.[0]?.hourly?.[index]?.weatherCode] || ""
    };
    return hourly;
  }
  get hourly() {
    const weatherData = {
      hour1: {
        time: `09:00 AM`,
        ...this.getHourlyByIndex(3, sun_icon_dic)
      },
      hour2: {
        time: `12:00 PM`,
        ...this.getHourlyByIndex(4, sun_icon_dic)
      },
      hour3: {
        time: `09:00 PM`,
        ...this.getHourlyByIndex(6, moon_icon_dic)
      },
      hour4: {
        time: `12:00 AM`,
        ...this.getHourlyByIndex(7, moon_icon_dic)
      }
    };
    return weatherData;
  }
}
var weatherService = new WeatherService;
var WeatherService_default = weatherService;
var moon_icon_dic = {
  395: "",
  392: "\u26C8",
  389: "\u26C8",
  386: "\u26C8",
  377: "",
  374: "",
  371: "",
  368: "",
  365: "",
  362: "",
  359: "\uF73C",
  356: "\uF740",
  353: "\uF73C",
  350: "",
  338: "",
  335: "",
  332: "",
  329: "",
  326: "",
  323: "",
  320: "",
  317: "",
  314: "",
  311: "",
  308: "\uF73C",
  305: "\uF740",
  302: "\uF73C",
  299: "\uF73D",
  296: "\uF73C",
  293: "\uF73C",
  284: "",
  281: "",
  266: "\uF73C",
  263: "\uF73C",
  260: "\uD83C\uDF2B",
  248: "\uD83C\uDF2B",
  230: "",
  227: "",
  200: "\u26C8",
  185: "",
  182: "",
  179: "",
  176: "\uF73C",
  143: "\uD83C\uDF2B",
  122: "\uD83C\uDF25",
  119: "\uF0C2",
  116: "\uF6C3",
  113: "\uF186"
};
var sun_icon_dic = {
  395: "",
  392: "\u26C8",
  389: "\u26C8",
  386: "\u26C8",
  377: "",
  374: "",
  371: "",
  368: "",
  365: "",
  362: "",
  359: "\uF743",
  356: "\uF740",
  353: "\uF743",
  350: "",
  338: "",
  335: "",
  332: "",
  329: "",
  326: "",
  323: "",
  320: "",
  317: "",
  314: "",
  311: "",
  308: "\uF743",
  305: "\uF740",
  302: "\uF743",
  299: "\uF73D",
  296: "\uF743",
  293: "\uF743",
  284: "",
  281: "",
  266: "\uF743",
  263: "\uF743",
  260: "\uD83C\uDF2B",
  248: "\uD83C\uDF2B",
  230: "",
  227: "",
  200: "\u26C8",
  185: "",
  182: "",
  179: "",
  176: "\uF743",
  143: "\uD83C\uDF2B",
  122: "\uD83C\uDF25",
  119: "\uF0C2",
  116: "\uF6C4",
  113: "\uF185"
};

// src/menus/WeatherMenu.js
var createWeatherDay = () => {
  const time = Widget.Label({
    className: "weather-menu-today-time"
  });
  const tempC = Widget.Label({
    className: "weather-menu-today-temp"
  });
  const weather = Widget.Label({
    className: "weather-menu-today-weather",
    max_width_chars: 10,
    justification: "left",
    truncate: "end"
  });
  return Widget.Box({
    vertical: true,
    className: "weather-menu-today-box",
    children: [time, tempC, weather]
  });
};
var MenuRevealer = () => {
  const weatherIcon = Widget.Label({
    className: "weather-menu-icon"
  });
  const weatherCity = Widget.Label({
    xalign: 0,
    className: "weather-menu-city"
  });
  const weatherValue = Widget.Label({
    xalign: 0,
    className: "weather-menu-value"
  });
  const sunrise = TitleText({
    titleClass: "weather-menu-sunrise",
    textClass: "weather-menu-sunrise-icon",
    vertical: false
  });
  const sunset = TitleText({
    titleClass: "weather-menu-sunset",
    textClass: "weather-menu-sunset-icon",
    vertical: false
  });
  const latestUpdate = Widget.Button({
    className: "weather-menu-latest-update",
    onClicked: () => {
      WeatherService_default.getWeather();
      latestUpdate.label = " ... ";
    }
  });
  const feelsLike = Widget.Label({
    xalign: 0,
    className: "weather-menu-feels-like"
  });
  const humidity = Widget.Label({
    xalign: 0,
    className: "weather-menu-humidity"
  });
  const pressure = Widget.Label({
    xalign: 0,
    className: "weather-menu-pressure"
  });
  const wind = Widget.Label({
    xalign: 0,
    className: "weather-menu-wind"
  });
  const clouds = Widget.Label({
    xalign: 0,
    className: "weather-menu-clouds"
  });
  const minAndMax = Widget.Label({
    xalign: 0,
    className: "weather-menu-min-max"
  });
  const generalInformation = Widget.Box({
    vertical: true,
    className: "weather-menu-general-information-box",
    children: [
      weatherCity,
      weatherValue,
      Widget.Box({
        homogeneous: true,
        children: [sunrise, sunset, latestUpdate]
      })
    ]
  });
  const detailedInformation = Widget.Box({
    vertical: true,
    className: "weather-menu-detail-box",
    children: [feelsLike, humidity, pressure, wind, clouds, minAndMax]
  });
  const rowOne = Widget.Box({
    children: [weatherIcon, generalInformation, detailedInformation]
  });
  const today1 = createWeatherDay();
  const today2 = createWeatherDay();
  const today3 = createWeatherDay();
  const today4 = createWeatherDay();
  const rowTwo = Widget.Box({
    className: "weather-row-two",
    homogeneous: true,
    children: [today1, today2, today3, today4]
  });
  return Widget.Revealer({
    transition: "slide_down",
    child: Widget.Box({
      className: "weather-menu-box",
      vertical: true,
      children: [rowOne, rowTwo]
    }).hook(WeatherService_default, (box) => {
      weatherIcon.label = WeatherService_default.weatherCode;
      weatherValue.label = `${WeatherService_default.arValue}, ${WeatherService_default.tempC} C\xB0`;
      weatherCity.label = WeatherService_default.areaName;
      sunrise.children[0].label = WeatherService_default.sunrise;
      sunrise.children[1].label = `\uF185`;
      sunset.children[0].label = WeatherService_default.sunset;
      sunset.children[1].label = `\uF186`;
      latestUpdate.label = `\uE9C7 ${WeatherService_default.observation_time}`;
      feelsLike.label = `Feels like : ${WeatherService_default.feelsLike} C\xB0`;
      humidity.label = `Humidity : ${WeatherService_default.humidity}%`;
      pressure.label = `Pressure : ${WeatherService_default.pressure}`;
      wind.label = `Wind : ${WeatherService_default.windspeedKmph}`;
      clouds.label = `Clouds : ${WeatherService_default.cloudcover}`;
      minAndMax.label = `Min and max : ${WeatherService_default.minTempC} - ${WeatherService_default.maxTempC}`;
      today1.children[0].label = WeatherService_default.hourly.hour1.time;
      today1.children[1].label = `${WeatherService_default.hourly.hour1.weatherCode} ${WeatherService_default.hourly.hour1.tempC} C\xB0`;
      if (WeatherService_default.hourly.hour1.lang_ar !== undefined) {
        today1.children[2].label = WeatherService_default.hourly.hour1.lang_ar;
      } else {
        today1.children[2].label = "";
      }
      today2.children[0].label = WeatherService_default.hourly.hour2.time;
      today2.children[1].label = `${WeatherService_default.hourly.hour2.weatherCode} ${WeatherService_default.hourly.hour2.tempC} C\xB0`;
      if (WeatherService_default.hourly.hour2.lang_ar !== undefined) {
        today2.children[2].label = WeatherService_default.hourly.hour2.lang_ar;
      } else {
        today2.children[2].label = "";
      }
      today3.children[0].label = WeatherService_default.hourly.hour3.time;
      today3.children[1].label = `${WeatherService_default.hourly.hour3.weatherCode} ${WeatherService_default.hourly.hour3.tempC} C\xB0`;
      if (WeatherService_default.hourly.hour3.lang_ar !== undefined) {
        today3.children[2].label = WeatherService_default.hourly.hour3.lang_ar;
      } else {
        today3.children[2].label = "";
      }
      today4.children[0].label = WeatherService_default.hourly.hour4.time;
      today4.children[1].label = `${WeatherService_default.hourly.hour4.weatherCode} ${WeatherService_default.hourly.hour4.tempC} C\xB0`;
      if (WeatherService_default.hourly.hour4.lang_ar !== undefined) {
        today4.children[2].label = WeatherService_default.hourly.hour4.lang_ar;
      } else {
        today4.children[2].label = "";
      }
    })
  });
};
var menuRevealer2 = MenuRevealer();
var WeatherMenu = () => Widget.Window({
  name: `weather_menu`,
  margins: [6, 210],
  anchor: ["top", local === "RTL" ? "left" : "right"],
  child: Widget.Box({
    css: `
            min-height: 2px;
            min-width: 2px;
        `,
    children: [menuRevealer2]
  })
});
globalThis.showWeatherMenu = () => {
  menuRevealer2.revealChild = !menuRevealer2.revealChild;
};

// src/services/ThemeService.js
import App2 from "resource:///com/github/Aylur/ags/app.js";
import Service2 from "resource:///com/github/Aylur/ags/service.js";
import {
USER,
exec,
execAsync,
timeout
} from "resource:///com/github/Aylur/ags/utils.js";

// src/theme/themes.js
var WALLPAPER_PATH = settings_default.assets.wallpapers;
var black_hole = {
  wallpaper: `${WALLPAPER_PATH}/black-hole.png`,
  css_theme: "black-hole.scss",
  plasma_color: "ArcMidnightDark.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "BeautySolar",
  kvantum_theme: "a-color",
  gtk_theme: "Shades-of-purple",
  gtk_icon_theme: "BeautySolar",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(FDBBC4ff) rgba(ff00ffff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 15,
    drop_shadow: "no",
    kitty: "black_hole.conf",
    konsole: "pinky"
  },
  desktop_widget: "BHWidget",
  dynamic: false
};
var win_20 = {
  wallpaper: `${WALLPAPER_PATH}/win20.png`,
  css_theme: "win20.scss",
  plasma_color: "ArcMidnightDark.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "BeautySolar",
  kvantum_theme: "a-color",
  gtk_theme: "Shades-of-purple",
  gtk_icon_theme: "BeautySolar",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(EB08FBff) rgba(16D7BAff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 12,
    drop_shadow: "no",
    kitty: "win_20.conf",
    konsole: "pinky"
  },
  desktop_widget: "Win20Widget",
  dynamic: false
};
var deer = {
  wallpaper: `${WALLPAPER_PATH}/deer.jpg`,
  css_theme: "deer.scss",
  plasma_color: "BlueDeer.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Vivid-Dark-Icons",
  kvantum_theme: "a-color",
  gtk_theme: "Kimi-dark",
  gtk_icon_theme: "Vivid-Dark-Icons",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(FDB4B7ff) rgba(A2E8FFff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "deer.conf",
    konsole: "Islamic"
  },
  desktop_widget: "DeerWidget",
  dynamic: false
};
var colors = {
  wallpaper: `${WALLPAPER_PATH}/colors.png`,
  css_theme: "colors.scss",
  plasma_color: "AColors.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Magma",
  kvantum_theme: "a-color",
  gtk_icon_theme: "Magma",
  gtk_theme: "Shades-of-purple",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(FD02FFff) rgba(1ed4fdff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "colors.conf",
    konsole: "pinky"
  },
  desktop_widget: "ColorWidget",
  dynamic: false
};
var siberian = {
  wallpaper: `${WALLPAPER_PATH}/tapet_Siberian.png`,
  css_theme: "siberian.scss",
  plasma_color: "BlueDeer.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "NeonIcons",
  kvantum_theme: "a-color",
  gtk_theme: "Shades-of-purple",
  gtk_icon_theme: "NeonIcons",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(FDB4B7ff) rgba(A2E8FFff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 5,
    drop_shadow: "no",
    kitty: "siberian.conf",
    konsole: "Islamic"
  },
  desktop_widget: "ColorWidget",
  dynamic: false
};
var materialYou = {
  wallpaper: `${WALLPAPER_PATH}/pastel.jpg`,
  css_theme: "material-you.scss",
  plasma_color: "MyMaterialYou.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Zafiro-Nord-Dark-Black",
  kvantum_theme: "a-m-you",
  gtk_theme: "Cabinet-Light-Orange",
  gtk_icon_theme: "kora-grey-light-panel",
  gtk_mode: "light",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 30,
    drop_shadow: "no",
    kitty: "materialYou.conf",
    konsole: "material-you"
  },
  desktop_widget: "MYWidget",
  dynamic: false
};
var game = {
  wallpaper: `${WALLPAPER_PATH}/game.png`,
  css_theme: "game.scss",
  plasma_color: "ArcStarryDark.colors",
  qt_style_theme: "Lightly",
  qt_icon_theme: "la-capitaine-icon-theme",
  kvantum_theme: "a-color",
  gtk_theme: "Tokyonight-Dark-BL",
  gtk_icon_theme: "la-capitaine-icon-theme",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(ffff7fff) rgba(ffaa7fff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "game.conf",
    konsole: "game"
  },
  desktop_widget: null,
  dynamic: false
};
var dark = {
  wallpaper: `${WALLPAPER_PATH}/dark.jpg`,
  css_theme: "dark.scss",
  plasma_color: "DarkAGS.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Infinity-Dark-Icons",
  kvantum_theme: "a-color",
  gtk_theme: "Tokyonight-Dark-BL",
  gtk_icon_theme: "Infinity-Dark-Icons",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(ff9a4cff) rgba(0080ffff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "dark.conf",
    konsole: "dark"
  },
  desktop_widget: "Win20Widget",
  dynamic: false
};
var uniCat = {
  wallpaper: `${WALLPAPER_PATH}/unicat.png`,
  css_theme: "unicat.scss",
  plasma_color: "Unicat.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Magma",
  kvantum_theme: "a-color",
  gtk_theme: "Dracula",
  gtk_icon_theme: "Magma",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(C6AAE8ff) rgba(F0AFE1ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "unicat.conf",
    konsole: "unicat"
  },
  desktop_widget: "UnicatWidget",
  dynamic: false
};
var newCat = {
  wallpaper: `${WALLPAPER_PATH}/catMachup.jpg`,
  css_theme: "newCat.scss",
  plasma_color: "NewCat.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Gradient-Dark-Icons",
  kvantum_theme: "a-color",
  gtk_theme: "Tokyonight-Dark-BL",
  gtk_icon_theme: "Gradient-Dark-Icons",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(ECBFBDff) rgba(F0AFE1ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "new_cat.conf",
    konsole: "NewCat"
  },
  desktop_widget: "NewCatWidget",
  dynamic: false
};
var golden = {
  wallpaper: `${WALLPAPER_PATH}/golden.png`,
  css_theme: "golden.scss",
  plasma_color: "Gold.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Zafiro-Nord-Dark-Black",
  kvantum_theme: "a-m-you",
  gtk_theme: "Cabinet-Light-Orange",
  gtk_icon_theme: "kora-grey-light-panel",
  gtk_mode: "light",
  hypr: {
    border_width: 2,
    active_border: "rgba(2C3041ff) rgba(611a15ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "golden.conf",
    konsole: "material-you"
  },
  desktop_widget: "GoldenWidget",
  dynamic: false
};
var harmony = {
  wallpaper: `${WALLPAPER_PATH}/ign_wanderlust.jpg`,
  css_theme: "harmony.scss",
  plasma_color: "Nordic.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Windows11-red-dark",
  kvantum_theme: "Sweet-Mars",
  gtk_theme: "Nordic-darker-standard-buttons",
  gtk_icon_theme: "Windows11-red-dark",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(BF616Bff) rgba(BF616Bff) 0deg",
    inactive_border: "rgba(2E3440ff) 0deg",
    rounding: 10,
    drop_shadow: "no",
    kitty: "harmony.conf",
    konsole: "NewCat"
  },
  desktop_widget: "HarmonyWidget",
  dynamic: false
};
var circles = {
  wallpaper: `${WALLPAPER_PATH}/wall_arch.png`,
  css_theme: "circles.scss",
  plasma_color: "Circles.colors",
  qt_style_theme: "Breeze",
  kvantum_theme: "a-circles",
  qt_icon_theme: "FairyWren",
  gtk_theme: "Nordic-darker-standard-buttons",
  gtk_icon_theme: "FairyWren",
  gtk_mode: "dark",
  hypr: {
    border_width: 2,
    active_border: "rgba(61AFEFff) rgba(7EC7A2ff) 0deg",
    inactive_border: "rgba(00000000) 0deg",
    rounding: 10,
    drop_shadow: "no",
    kitty: "circles.conf",
    konsole: "Circles"
  },
  desktop_widget: "CirclesWidget",
  dynamic: false
};
var whiteFlower = {
  wallpaper: `${WALLPAPER_PATH}/white-flower.jpg`,
  css_theme: "white-flower.scss",
  plasma_color: "MateriaYaruLight.colors",
  qt_style_theme: "Breeze",
  qt_icon_theme: "Rowaita-Pink-Light",
  kvantum_theme: "a-m-you",
  gtk_theme: "Jasper-Light-Dracula",
  gtk_icon_theme: "Rowaita-Pink-Light",
  gtk_mode: "light",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 8,
    drop_shadow: "no",
    kitty: "white_flower.conf",
    konsole: "light"
  },
  desktop_widget: "WhiteFlower",
  dynamic: false
};
var dynamicM3Dark = {
  wallpaper_path: `/media/shared/Pictures/wallpapers/dark`,
  dynamic: true,
  interval: 15 * 60 * 1000,
  gtk_mode: "dark",
  plasma_color: "MateriaYaruDark.colors",
  qt_style_theme: "Breeze",
  kvantum_theme: "MateriaDark",
  gtk_theme: "Nordic-darker-standard-buttons",
  qt_icon_theme: "BeautySolar",
  gtk_icon_theme: "BeautySolar",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "material-you.conf",
    konsole: "MaterialYouAlt"
  },
  desktop_widget: null,
  desktop_widget: "BHWidget"
};
var dynamicM3Light = {
  wallpaper_path: `/media/shared/Pictures/wallpapers/light`,
  dynamic: true,
  interval: 15 * 60 * 1000,
  gtk_mode: "light",
  plasma_color: "MateriaYaruDark.colors",
  qt_style_theme: "Breeze",
  kvantum_theme: "MateriaDark",
  gtk_theme: "Victory-black-light-compact",
  qt_icon_theme: "BeautySolar",
  gtk_icon_theme: "BeautySolar",
  hypr: {
    border_width: 2,
    active_border: "rgba(678382ff) rgba(9d6c73ff) 0deg",
    inactive_border: "rgba(59595900) 0deg",
    rounding: 17,
    drop_shadow: "no",
    kitty: "material-you.conf",
    konsole: "MaterialYouAlt"
  },
  desktop_widget: "BHWidget"
};
var BLACK_HOLE_THEME = 0;
var DEER_THEME = 1;
var COLOR_THEME = 2;
var SIBERIAN_THEME = 3;
var MATERIAL_YOU = 4;
var WIN_20 = 5;
var GAME_THEME = 6;
var DARK_THEME = 7;
var UNICAT_THEME = 8;
var NEW_CAT_THEME = 9;
var GOLDEN_THEME = 10;
var HARMONY_THEME = 11;
var CIRCLES_THEME = 12;
var WHITE_FLOWER = 13;
var DYNAMIC_M3_DARK = 14;
var DYNAMIC_M3_LIGHT = 15;
var ThemesDictionary = {
  [BLACK_HOLE_THEME]: black_hole,
  [DEER_THEME]: deer,
  [COLOR_THEME]: colors,
  [SIBERIAN_THEME]: siberian,
  [MATERIAL_YOU]: materialYou,
  [WIN_20]: win_20,
  [GAME_THEME]: game,
  [DARK_THEME]: dark,
  [UNICAT_THEME]: uniCat,
  [NEW_CAT_THEME]: newCat,
  [GOLDEN_THEME]: golden,
  [HARMONY_THEME]: harmony,
  [CIRCLES_THEME]: circles,
  [WHITE_FLOWER]: whiteFlower,
  [DYNAMIC_M3_DARK]: dynamicM3Dark,
  [DYNAMIC_M3_LIGHT]: dynamicM3Light
};
var themes_default = ThemesDictionary;

// src/services/ThemeService.js
class ThemeService extends Service2 {
  static {
    Service2.register(this, {}, {
      dynamicWallpaperIsOn: ["boolean", "r"],
      isDynamicTheme: ["boolean", "r"]
    });
  }
  qtFilePath = `/home/${USER}/.config/qt5ct/qt5ct.conf`;
  plasmaColorChanger = App2.configDir + "/modules/theme/bin/plasma-theme";
  plasmaColorsPath = App2.configDir + "/modules/theme/plasma-colors/";
  selectedTheme = UNICAT_THEME;
  rofiFilePath = `/home/${USER}/.config/rofi/config.rasi`;
  wallpapersList = [];
  CACHE_FILE_PATH = `/home/${USER}/.cache/ahmed-hyprland-conf.temp`;
  wallpaperIntervalId;
  selectedLightWallpaper = 0;
  selectedDarkWallpaper = 0;
  dynamicWallpaperStatus = true;
  constructor() {
    super();
    exec("swww init");
    this.getCachedVariables();
    this.changeTheme(this.selectedTheme);
  }
  changeTheme(selectedTheme) {
    let theme = themes_default[selectedTheme];
    this.clearDynamicWallpaperInterval();
    if (theme.dynamic) {
      this.setDynamicWallpapers(theme.wallpaper_path, theme.gtk_mode, theme.interval);
    } else {
      this.changeCss(theme.css_theme);
      this.changeWallpaper(theme.wallpaper);
    }
    this.changePlasmaColor(theme.plasma_color);
    this.changeGTKTheme(theme.gtk_theme, theme.gtk_mode, theme.gtk_icon_theme);
    this.changeQtStyle(theme.qt_style_theme);
    this.changeIcons(theme.qt_icon_theme);
    this.showDesktopWidget(theme.desktop_widget);
    let hypr = theme.hypr;
    this.steHyprland(hypr.border_width, hypr.active_border, hypr.inactive_border, hypr.rounding, hypr.drop_shadow, hypr.kitty, hypr.konsole);
    this.selectedTheme = selectedTheme;
    this.emit("changed");
    this.cacheVariables();
  }
  changeWallpaper(wallpaper) {
    execAsync([
      "swww",
      "img",
      "--transition-type",
      "random",
      "--transition-pos",
      exec("hyprctl cursorpos").replace(" ", ""),
      wallpaper
    ]).catch(print);
  }
  changeCss(cssTheme) {
    const scss = settings_default.theme.mainCss;
    const css = settings_default.theme.styleCss;
    const newTh = `@import './themes/${cssTheme}';`;
    execAsync(["sed", "-i", `1s|.*|${newTh}|`, scss]).then(() => {
      exec(`sassc ${scss} ${css}`);
      App2.resetCss();
      App2.applyCss(css);
    }).catch(print);
  }
  get dynamicWallpaperIsOn() {
    return this.dynamicWallpaperStatus;
  }
  get isDynamicTheme() {
    return themes_default[this.selectedTheme].dynamic;
  }
  setDynamicWallpapers(path, themeMode, interval) {
    Utils.execAsync([settings_default.scripts.get_wallpapers, path]).then((out) => {
      const wallpapers = JSON.parse(out);
      this.wallpapersList = wallpapers;
      this.callNextWallpaper(themeMode);
      if (this.dynamicWallpaperIsOn) {
        this.wallpaperIntervalId = setInterval(() => {
          this.callNextWallpaper(themeMode);
        }, interval);
      } else {
        this.clearDynamicWallpaperInterval();
      }
    }).catch((err) => print(err));
  }
  toggleDynamicWallpaper() {
    if (this.isDynamicTheme && this.dynamicWallpaperIsOn)
      this.stopDynamicWallpaper();
    else
      this.startDynamicWallpaper();
  }
  clearDynamicWallpaperInterval() {
    if (this.wallpaperIntervalId) {
      clearInterval(this.wallpaperIntervalId);
    }
  }
  stopDynamicWallpaper() {
    this.dynamicWallpaperStatus = false;
    this.clearDynamicWallpaperInterval();
    this.cacheVariables();
    this.emit("changed");
  }
  startDynamicWallpaper() {
    let theme = themes_default[this.selectedTheme];
    this.dynamicWallpaperStatus = true;
    if (this.wallpaperIntervalId) {
      clearInterval(this.wallpaperIntervalId);
    }
    this.setDynamicWallpapers(theme.wallpaper_path, theme.gtk_mode, theme.interval);
    this.cacheVariables();
    this.emit("changed");
  }
  callNextWallpaper(themeMode) {
    let selectedWallpaperIndex = 0;
    if (themeMode == "dark") {
      selectedWallpaperIndex = this.selectedDarkWallpaper;
      if (this.dynamicWallpaperIsOn)
        this.selectedDarkWallpaper = (this.selectedDarkWallpaper + 1) % this.wallpapersList.length;
    } else {
      selectedWallpaperIndex = this.selectedLightWallpaper;
      if (this.dynamicWallpaperIsOn)
        this.selectedLightWallpaper = (this.selectedLightWallpaper + 1) % this.wallpapersList.length;
    }
    const wallpaper = this.wallpapersList[selectedWallpaperIndex];
    this.changeWallpaper(wallpaper);
    this.createM3ColorSchema(wallpaper, themeMode);
    this.cacheVariables();
  }
  createM3ColorSchema(wallpaper, mode) {
    execAsync([
      "python",
      settings_default.scripts.dynamicM3Py,
      wallpaper,
      "-m",
      mode
    ]).then(() => {
      this.changeCss("m3/dynamic.scss");
    }).catch(print);
  }
  changePlasmaColor(plasmaColor) {
    const plasmaCmd = `plasma-apply-colorscheme`;
    execAsync([plasmaCmd, plasmaColor.split(".")[0]]).catch(print);
  }
  changeGTKTheme(GTKTheme, gtkMode, iconTheme) {
    execAsync([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `color-scheme`,
      `prefer-${gtkMode}`
    ]).catch(print);
    execAsync([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `gtk-theme`,
      `Adwaita`
    ]).catch(print);
    setTimeout(() => {
      execAsync([
        `gsettings`,
        `set`,
        `org.gnome.desktop.interface`,
        `gtk-theme`,
        GTKTheme
      ]).catch(print);
      execAsync([
        `gsettings`,
        `set`,
        `org.gnome.desktop.wm.preferences`,
        `theme`,
        GTKTheme
      ]).catch(print);
    }, 2000);
    execAsync([
      `gsettings`,
      `set`,
      `org.gnome.desktop.interface`,
      `icon-theme`,
      iconTheme
    ]).catch(print);
  }
  steHyprland(border_width, active_border, inactive_border, rounding, drop_shadow, kittyConfig, konsoleTheme) {
    const kittyBind = `bind = \$mainMod, Return, exec, kitty -c ${App2.configDir}/modules/theme/kitty/${kittyConfig}`;
    const konsoleBind = `bind = \$mainMod, Return, exec, konsole --profile ${konsoleTheme}`;
    execAsync([
      "sed",
      "-i",
      `42s|.*|${konsoleBind}|`,
      `/home/${USER}/.config/hypr/binding.conf`
    ]).then(() => {
      timeout(1000, () => {
        execAsync(`hyprctl keyword general:border_size ${border_width}`);
        execAsync(`hyprctl keyword general:col.active_border ${active_border}`);
        execAsync(`hyprctl keyword general:col.inactive_border ${inactive_border}`);
        execAsync(`hyprctl keyword decoration:drop_shadow ${drop_shadow ? "yes" : "no"}`);
        execAsync(`hyprctl keyword decoration:rounding ${rounding}`);
      });
    }).catch(print);
  }
  changeQtStyle(qtStyle) {
    execAsync([
      "sed",
      "-i",
      `s/style=.*/style=${qtStyle}/g`,
      this.qtFilePath
    ]).catch(print);
  }
  changeIcons(icons) {
    execAsync([
      "sed",
      "-i",
      `s/icon_theme=.*/icon_theme=${icons}/g`,
      this.qtFilePath
    ]).catch(print);
  }
  changeRofiTheme(rofiTheme) {
    const newTheme = `@import "${App2.configDir}/modules/theme/rofi/${rofiTheme}"`;
    execAsync([
      "sed",
      "-i",
      `11s|.*|${newTheme}|`,
      this.rofiFilePath
    ]).catch(print);
  }
  changeKvantumTheme(kvantumTheme) {
    execAsync(["kvantummanager", "--set", kvantumTheme]).catch(print);
  }
  showDesktopWidget(widget) {
    let oldTheme = themes_default[this.selectedTheme];
    if (oldTheme.desktop_widget !== widget && oldTheme.desktop_widget !== null) {
      this.hideWidget(oldTheme.desktop_widget);
    }
    if (widget !== null) {
      timeout(1000, () => {
        this.showWidget(widget);
      });
    }
  }
  hideWidget(functionName) {
    execAsync(["ags", "-r", `Hide${functionName}()`]).catch(print);
  }
  showWidget(functionName) {
    execAsync(["ags", "-r", `Show${functionName}()`]).catch(print);
  }
  cacheVariables() {
    const newData = {
      selected_theme: this.selectedTheme,
      selected_dark_wallpaper: this.selectedDarkWallpaper,
      selected_light_wallpaper: this.selectedLightWallpaper,
      dynamic_wallpaper_status: this.dynamicWallpaperStatus
    };
    Utils.writeFile(JSON.stringify(newData, null, 2), this.CACHE_FILE_PATH).catch((err) => print(err));
  }
  getCachedVariables() {
    try {
      const cachedData = JSON.parse(Utils.readFile(this.CACHE_FILE_PATH));
      this.selectedTheme = cachedData.selected_theme;
      this.selectedDarkWallpaper = cachedData.selected_dark_wallpaper;
      this.selectedLightWallpaper = cachedData.selected_light_wallpaper;
      this.dynamicWallpaperStatus = cachedData.dynamic_wallpaper_status;
      if (!this.selectedTheme) {
        this.selectedTheme = UNICAT_THEME;
      }
    } catch (TypeError) {
      this.cacheVariables();
    }
  }
}
var themeService = new ThemeService;
var ThemeService_default = themeService;

// src/widgets/MusicPLayer.js
import Gdk2 from "gi://Gdk";
var Mpris = await Service.import("mpris");
var selectedMusicPlayer = null;
var PLAYER_MENU_ARROW = "\uD83D\uDF83";

class PlayersMenu {
  constructor() {
    this.menu = Widget.Menu({
      children: []
    });
  }
  popup(event) {
    this.menu.popup_at_widget(event, Gdk2.Gravity.SOUTH, Gdk2.Gravity.NORTH, null);
  }
  setChildren(children) {
    this.menu.children = children;
  }
}
var length = () => Widget.Label({
  css: `
      min-width: 4rem;
    `,
  label: "",
  className: "music-wd-length",
  vexpand: false,
  maxWidthChars: 4
});
var RowOne = () => {
  let playerName = Widget.Label({
    css: `
          min-width: 6rem;
        `,
    label: "",
    justification: "right",
    truncate: "end",
    xalign: 0,
    maxWidthChars: 10,
    wrap: true,
    useMarkup: true
  });
  const playersMenu = new PlayersMenu;
  const selectPlayerBtn = Widget.Button({
    className: "music-wd-player",
    child: playerName,
    onClicked: (event) => {
      playersMenu.popup(event);
    }
  });
  return Widget.Box({
    className: "music-wd-row-one",
    spacing: 120,
    children: [length(), selectPlayerBtn]
  }).hook(Mpris, (self) => {
    let playersList = [];
    for (const player2 in Mpris.players) {
      if (Object.hasOwnProperty.call(Mpris.players, player2)) {
        const element = Mpris.players[player2];
        playersList.push(Widget.MenuItem({
          child: Widget.Label({
            label: element.name,
            xalign: 0.5
          }),
          onActivate: () => {
            playerName.label = `${PLAYER_MENU_ARROW} ${element.name}`;
            selectedMusicPlayer = element.name;
            Mpris.emit("changed");
          }
        }));
      }
    }
    playersMenu.setChildren(playersList);
    if (playersList.length > 0 && selectedMusicPlayer === null) {
      playerName.label = `${PLAYER_MENU_ARROW} ${playersList[0].child.label}`;
      selectedMusicPlayer = playersList[0].child.label;
    }
    let player = Mpris.getPlayer(selectedMusicPlayer);
    const songLengthInSeconds = player?.length;
    const minutes = Math.floor(songLengthInSeconds / 60);
    const seconds = Math.round(songLengthInSeconds % 60);
    if (minutes && seconds) {
      self.children[0].label = `${minutes}:${seconds}   \uF001`;
    }
  });
};
var RowTwo = () => {
  let title = Widget.Label({
    className: "music-wd-title",
    justification: "left",
    truncate: "end",
    xalign: 0,
    maxWidthChars: 24,
    wrap: true,
    useMarkup: true
  });
  let artist = Widget.Label({
    className: "music-wd-file-name",
    justification: "left",
    truncate: "end",
    xalign: 0,
    maxWidthChars: 1,
    vexpand: false
  });
  return Widget.Box({
    vertical: true,
    className: "music-wd-row-two",
    children: [title, artist]
  }).hook(Mpris, (self) => {
    let player = Mpris.getPlayer(selectedMusicPlayer);
    if (player !== null) {
      title.label = player?.trackTitle;
      artist.label = player?.trackArtists[0];
    } else {
      title.label = "No track";
      artist.label = "There is no artist";
    }
  });
};
var ButtonsRow = () => {
  let backBtn = Widget.Button({
    className: "unset music-wd-button",
    label: local === "RTL" ? "\uF051" : "\uF048",
    onClicked: () => {
      Mpris.getPlayer(selectedMusicPlayer)?.previous();
    }
  });
  let playBtn = Widget.Button({
    className: "unset music-wd-button-play",
    label: "\uF04B",
    onClicked: () => {
      Mpris.getPlayer(selectedMusicPlayer)?.playPause();
    }
  });
  let nextBtn = Widget.Button({
    className: "unset music-wd-button",
    label: local === "RTL" ? "\uF048" : "\uF051",
    onClicked: () => {
      Mpris.getPlayer(selectedMusicPlayer)?.next();
    }
  });
  let skipForwardBtn = Widget.Button({
    className: "unset music-wd-button",
    label: local === "RTL" ? "\uF04A" : "\uF04E",
    css: `
            ${local === "RTL" ? "padding-right: 2px;" : "padding-left: 2px;"}
        `,
    onClicked: () => {
      const decimalNumber = Mpris.getPlayer(selectedMusicPlayer)?.position;
      Utils.execAsync([
        "playerctl",
        "-p",
        selectedMusicPlayer,
        "position",
        `${decimalNumber + 10}`
      ]).catch(print);
    }
  });
  let skipBackwardBtn = Widget.Button({
    css: `
            padding-left: 2px;
        `,
    className: "unset music-wd-button",
    label: local === "RTL" ? "\uF04E" : "\uF04A",
    onClicked: () => {
      const decimalNumber = Mpris.getPlayer(selectedMusicPlayer)?.position;
      Utils.execAsync([
        "playerctl",
        "-p",
        selectedMusicPlayer,
        "position",
        `${decimalNumber - 10}`
      ]).catch(print);
    }
  });
  return Widget.Box({
    className: "music-wd-row-three",
    spacing: 10,
    children: [backBtn, playBtn, nextBtn, skipBackwardBtn, skipForwardBtn]
  }).hook(Mpris, (self) => {
    let player = Mpris.getPlayer(selectedMusicPlayer);
    nextBtn.set_sensitive(player?.canGoNext);
    backBtn.set_sensitive(player?.canGoPrev);
    playBtn.set_sensitive(player?.canPlay);
    if (player?.playBackStatus === "Playing") {
      playBtn.label = "\u23F8";
      playBtn.className = "unset music-wd-button-play";
    } else if (player?.playBackStatus === "Paused") {
      playBtn.label = "\uF04B";
      playBtn.className = "unset music-wd-button-stop";
    } else if (player?.playBackStatus === "Stopped") {
      playBtn.label = "\uF04B";
      playBtn.className = "unset music-wd-button-stop";
    }
  });
};
var MusicPLayer_default = (className) => Widget.Box({
  className: className || "music-wd-box",
  vertical: true,
  children: [RowOne(), RowTwo(), ButtonsRow()]
});
globalThis.mp = () => {
  Mpris.players;
};

// src/menus/left_menu.ts
import {execAsync as execAsync2} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box,
Button,
Icon,
Label,
Revealer,
Window
} from "resource:///com/github/Aylur/ags/widget.js";
var changeMenuBtn = function() {
};
var Profile = () => {
  const userImage = Icon({
    className: "profile-icon",
    icon: `${settings_default.assets.wallpapers}/image.png`,
    size: 80
  });
  const myName = Label({
    className: "profile-label",
    label: "Ahmed Al-Saadi"
  });
  return Box({
    className: "profile-box",
    vertical: true,
    children: [userImage, myName]
  });
};
var Header = () => {
  return Box({
    className: "left-menu-header",
    css: `
            background-image: url("${settings_default.assets.wallpapers}/black-hole.png");
        `,
    vertical: true
  }).hook(ThemeService_default, (box) => {
    let wallpaper = themes_default[ThemeService_default.selectedTheme].wallpaper;
    box.css = `background-image: url("${wallpaper}");`;
  });
};
var ThemeButton = ({
  label,
  icon,
  theme,
  label_css = "theme-btn-label",
  icon_css = "theme-btn-icon",
  end = local === "RTL" ? "margin-left: 1.1rem;" : "margin-right: 1.1rem;",
  css = `
        min-width: 5rem;
        min-height: 2rem;
        ${end}
        border-radius: 1rem;
    `
}) => {
  const _label = Label({
    className: `unset ${label_css}`,
    label
  });
  const _icon = Label({
    className: `unset ${icon_css}`,
    label: icon,
    xalign: 0.5
  });
  const box = Box({
    className: "unset theme-btn-box",
    children: [_label, _icon]
  });
  const button = Button({
    css,
    child: box,
    onClicked: () => ThemeService_default.changeTheme(theme)
  }).hook(ThemeService_default, (btn) => {
    btn.class_name = "theme-btn";
    if (ThemeService_default.selectedTheme === theme) {
      btn.class_name = "selected-theme";
    }
  });
  return button;
};
var ThemesButtonsRowOne = () => {
  const blackHoleTheme = ThemeButton({
    label: "Black hole",
    icon: "\uDB80\uDDE9",
    theme: BLACK_HOLE_THEME
  });
  const deerTheme = ThemeButton({
    label: "Deer",
    icon: "\uF3D2",
    theme: DEER_THEME
  });
  const colorTheme = ThemeButton({
    label: "Color",
    icon: "\uE2B1",
    theme: COLOR_THEME,
    end: ""
  });
  const siberianTheme = ThemeButton({
    label: "Gradient",
    icon: "\uE3E9",
    theme: SIBERIAN_THEME
  });
  const materialYouTheme = ThemeButton({
    label: "Material",
    icon: "\uE3F2",
    theme: MATERIAL_YOU
  });
  const win20Theme = ThemeButton({
    label: "Windows",
    icon: "\uF3CA",
    theme: WIN_20,
    end: ""
  });
  const gameTheme = ThemeButton({
    label: "Game",
    icon: "\uF11B",
    theme: GAME_THEME
  });
  const darkTheme = ThemeButton({
    label: "dark",
    icon: "\uDB84\uDC1D",
    theme: DARK_THEME
  });
  const unicatTheme = ThemeButton({
    label: "Unicat",
    icon: "\uF3D2",
    theme: UNICAT_THEME,
    end: ""
  });
  const newCatTheme = ThemeButton({
    label: "New cat",
    icon: "\uF7E3",
    theme: NEW_CAT_THEME
  });
  const goldenTheme = ThemeButton({
    label: "Golden",
    icon: "\uDB80\uDE4A",
    theme: GOLDEN_THEME
  });
  const harmonyTheme = ThemeButton({
    label: "Harmony",
    icon: "\uDB81\uDD09",
    theme: HARMONY_THEME,
    end: ""
  });
  const circlesTheme = ThemeButton({
    label: "Circles",
    icon: "\uF32E",
    theme: CIRCLES_THEME
  });
  const whiteFlower2 = ThemeButton({
    label: "White",
    icon: "\uE793",
    theme: WHITE_FLOWER
  });
  const dynamicTheme = Widget.Box({
    children: [
      ThemeButton({
        label: "",
        icon: "\uF186",
        theme: DYNAMIC_M3_DARK,
        label_css: "unset",
        icon_css: "dynamic-theme-btn-icon",
        css: `
              min-height: 2rem;
              border-top-right-radius: 1rem;
              border-bottom-right-radius: 1rem;

              border-top-left-radius: 0rem;
              border-bottom-left-radius: 0rem;
            `
      }),
      ThemeButton({
        label: "",
        icon: "\uF185",
        theme: DYNAMIC_M3_LIGHT,
        label_css: "unset",
        icon_css: "dynamic-theme-btn-icon",
        css: `
                min-height: 2rem;
                border-top-left-radius: 1rem;
                border-bottom-left-radius: 1rem;

                border-top-right-radius: 0rem;
                border-bottom-right-radius: 0rem;
            `,
        end: ""
      })
    ]
  });
  const row1 = Box({
    children: [blackHoleTheme, deerTheme, colorTheme]
  });
  const row2 = Box({
    css: `
            margin-top: 1rem;
        `,
    children: [siberianTheme, materialYouTheme, win20Theme]
  });
  const row3 = Box({
    css: `
            margin-top: 1rem;
        `,
    children: [gameTheme, darkTheme, unicatTheme]
  });
  const row4 = Box({
    css: `
            margin-top: 1rem;
        `,
    children: [newCatTheme, goldenTheme, harmonyTheme]
  });
  const row5 = Box({
    css: `
            margin-top: 1rem;
        `,
    children: [circlesTheme, whiteFlower2, dynamicTheme]
  });
  return Box({
    className: "themes-box",
    vertical: true,
    children: [row1, row2, row3, row4, row5]
  });
};
var PowerButtonsRow = () => {
  const powerBtnMargin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
  const powerOff = Button({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
                ${powerBtnMargin}
            `,
    child: Label({
      label: "\uE9C0"
    }),
    onClicked: () => execAsync2("poweroff").catch(print)
  });
  const reboot = Button({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
                ${powerBtnMargin}
            `,
    child: Label({
      label: "\uE9C7"
    }),
    onClicked: () => execAsync2("reboot").catch(print)
  });
  const logout = Button({
    className: "theme-btn",
    css: `
                min-width: 5rem;
                min-height: 2rem;
                border-radius: 1rem;
            `,
    child: Label({
      label: "\uE9D0"
    }),
    onClicked: () => execAsync2("loginctl kill-session self").catch(print)
  });
  const row1 = Box({
    children: [powerOff, reboot, logout]
  });
  return Box({
    className: "power-box unset",
    css: `
            margin-top:0rem;
        `,
    vertical: true,
    children: [row1]
  });
};
var widgets = Box({
  className: "left-menu-box unset",
  vertical: true,
  children: [
    Header(),
    Profile(),
    ThemesButtonsRowOne(),
    MusicPLayer_default("left-menu-music-wd"),
    PowerButtonsRow()
  ]
});
var menuRevealer3 = Revealer({
  transition: "slide_down",
  child: widgets
});
var LeftMenu = ({ monitor } = {}) => Window({
  name: `left_menu_${monitor}`,
  margins: [0, 0, 0, 0],
  anchor: ["top", local === "RTL" ? "left" : "right"],
  child: Box({
    css: `
            min-height: 2px;
        `,
    children: [menuRevealer3]
  })
});
var MenuButton = () => Button({
  className: "menu-button unset",
  label: "\uF063",
  onClicked: () => {
    menuRevealer3.revealChild = !menuRevealer3.revealChild;
    changeMenuBtn();
  }
});
globalThis.showLeftMenu = () => {
  menuRevealer3.revealChild = !menuRevealer3.revealChild;
  changeMenuBtn();
};

// src/menus/notification_center.ts
import {
Box as Box3,
Button as Button3,
Label as Label3,
Revealer as Revealer2,
Scrollable,
Window as Window2
} from "resource:///com/github/Aylur/ags/widget.js";

// src/notifications/MenuNotification.js
import {lookUpIcon} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box2,
Button as Button2,
EventBox,
Icon as Icon2,
Label as Label2
} from "resource:///com/github/Aylur/ags/widget.js";
var { GLib } = imports.gi;
var margin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
var NotificationIcon = ({ appEntry, appIcon, image }) => {
  if (image) {
    return Box2({
      vpack: "start",
      hexpand: false,
      className: "notification-img",
      css: `
              background-image: url("${image}");
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              min-width: 78px;
              min-height: 78px;
              ${margin}
              border-radius: 1rem;
          `
    });
  }
  let icon = "dialog-information-symbolic";
  if (lookUpIcon(appIcon))
    icon = appIcon;
  if (lookUpIcon(appEntry))
    icon = appEntry;
  return Box2({
    vpack: "start",
    hexpand: false,
    css: `
          min-width: 78px;
          min-height: 78px;
          ${margin}
        `,
    children: [
      Icon2({
        icon,
        size: 58,
        hpack: "center",
        hexpand: true,
        vpack: "center",
        vexpand: true
      })
    ]
  });
};
var MenuNotification_default = (notification) => {
  const bodyLabel = Label2({
    css: `margin-top: 1rem;`,
    className: "notification-description",
    hexpand: true,
    useMarkup: true,
    xalign: 0,
    justification: "left",
    wrap: true
  });
  try {
    bodyLabel.label = notification.body;
  } catch (error) {
    bodyLabel.label = "...";
  }
  const content = Box2({
    css: `min-width: 330px;`,
    children: [
      NotificationIcon(notification),
      Box2({
        hexpand: true,
        vertical: true,
        children: [
          Box2({
            children: [
              Label2({
                className: "notification-title",
                css: margin,
                xalign: 0,
                justification: "left",
                hexpand: true,
                maxWidthChars: 24,
                truncate: "end",
                wrap: true,
                label: notification.summary,
                useMarkup: notification.summary.startsWith("<")
              }),
              Label2({
                className: "notification-time",
                css: `${margin} margin-top: 0.5rem;`,
                vpack: "start",
                label: GLib.DateTime.new_from_unix_local(notification.time).format("%H:%M")
              }),
              Button2({
                className: "notification-close-button",
                vpack: "start",
                child: Icon2("window-close-symbolic"),
                onClicked: () => {
                  notification.close();
                }
              })
            ]
          }),
          bodyLabel
        ]
      })
    ]
  });
  const actionsbox = Box2({
    className: "notification-actions",
    children: notification.actions.map((action) => Button2({
      css: `margin-bottom: 0.5rem; margin-top: 1rem; margin-left: 0.5rem; margin-right: 0.5rem`,
      className: "action-button",
      onClicked: () => notification.invoke(action.id),
      hexpand: true,
      child: Label2(action.label)
    }))
  });
  const mainbox = EventBox({
    className: `menu-notification ${notification.urgency}`,
    vexpand: false,
    onPrimaryClick: () => {
    },
    child: Box2({
      vertical: true,
      children: [content, notification.actions.length > 0 && actionsbox]
    })
  });
  return mainbox;
};

// src/menus/notification_center.ts
var Notifications = await Service.import("notifications");
var NotificationsBox = () => {
  return Box3({
    className: "notification-menu-header",
    vertical: true,
    children: []
  }).hook(Notifications, (self) => {
    let notificationList = [];
    const array = Notifications.notifications.reverse();
    for (let index = 0;index < array.length; index++) {
      const element = array[index];
      const line = index !== array.length - 1 ? Box3({
        class_name: "horizontal-line"
      }) : null;
      notificationList.push(MenuNotification_default(element), line);
    }
    let noNotifications = Box3({
      vertical: true,
      className: "notification-this-is-all",
      children: [
        Label3({
          className: "no-notification-icon",
          label: "\uDB84\uDDE5"
        }),
        Label3({
          className: "no-notification-text",
          label: "There are no new notifications"
        })
      ]
    });
    if (array.length < 1) {
      notificationList.push(noNotifications);
    }
    self.children = [...notificationList];
  });
};
var NotificationHeader = () => {
  return Box3({
    className: "notification-header-box",
    spacing: 70,
    children: [
      Button3({
        className: "unset notification-center-header-clear",
        label: "\uEA81",
        onClicked: () => {
          Notifications.clear();
        }
      }),
      Label3({
        className: "notification-center-header-text",
        label: "Notification Center"
      }),
      Button3({
        className: "unset notification-center-header-mute",
        label: "\uDB80\uDC9A",
        onClicked: () => Notifications.dnd = !Notifications.dnd
      })
    ]
  }).hook(Notifications, (self) => {
    if (Notifications.dnd) {
      self.children[2].label = "\uDB80\uDC9B";
    } else {
      self.children[2].label = "\uDB80\uDC9A";
    }
  });
};
var notificationContainer = Scrollable({
  hscroll: "never",
  vscroll: "automatic",
  className: "notification-center-container",
  child: NotificationsBox()
});
var menuRevealer4 = Revealer2({
  transition: "slide_down",
  child: Box3({
    className: "left-menu-box",
    vertical: true,
    children: [NotificationHeader(), notificationContainer]
  })
});
var NotificationCenter = () => Window2({
  name: `notification_center`,
  margins: [0, local === "RTL" ? 500 : 400],
  anchor: ["top", local === "RTL" ? "left" : "right"],
  child: Box3({
    css: `
            min-height: 2px;
        `,
    children: [menuRevealer4]
  })
});
globalThis.showNotificationCenter = () => menuRevealer4.revealChild = !menuRevealer4.revealChild;
var NotificationCenterButton = () => Button3({
  className: "notification-center-button unset",
  label: "\uF0F3",
  onClicked: () => showNotificationCenter()
}).hook(Notifications, (self) => {
  if (Notifications.dnd) {
    self.label = "\uDB80\uDC9B";
  } else if (Notifications.notifications.length === 0) {
    self.label = "\uDB80\uDC9A";
  } else if (Notifications.notifications.length > 0) {
    self.label = `${Notifications.notifications.length} \uEB9A`;
  }
});

// src/notifications/OSDNotifications.js
import Notifications3 from "resource:///com/github/Aylur/ags/service/notifications.js";
import {timeout as timeout3} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box5,
Revealer as Revealer4,
Window as Window3
} from "resource:///com/github/Aylur/ags/widget.js";

// src/notifications/Notification.js
import Notifications2 from "resource:///com/github/Aylur/ags/service/notifications.js";
import {lookUpIcon as lookUpIcon2, timeout as timeout2} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box4,
Icon as Icon3,
Label as Label4,
EventBox as EventBox2,
Button as Button4,
Revealer as Revealer3
} from "resource:///com/github/Aylur/ags/widget.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";
var { GLib: GLib2 } = imports.gi;
var rtlMargin = local === "RTL" ? "margin-left: 1rem;" : "margin-right: 1rem;";
var NotificationIcon2 = ({ appEntry, appIcon, image }) => {
  if (image) {
    return Box4({
      vpack: "start",
      hexpand: false,
      className: "notification-img",
      css: `
              background-image: url("${image}");
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              min-width: 78px;
              min-height: 78px;
              ${rtlMargin}
              border-radius: 1rem;
            `
    });
  }
  let icon = "dialog-information-symbolic";
  if (lookUpIcon2(appIcon))
    icon = appIcon;
  if (lookUpIcon2(appEntry))
    icon = appEntry;
  return Box4({
    vpack: "start",
    hexpand: false,
    css: `
            min-width: 78px;
            min-height: 78px;
            ${rtlMargin}
        `,
    children: [
      Icon3({
        icon,
        size: 58,
        hpack: "center",
        hexpand: true,
        vpack: "center",
        vexpand: true
      })
    ]
  });
};
var Notification_default = (notification) => {
  const hovered = Variable(false);
  let timeoutId;
  const bodyLabel = Label4({
    css: `margin-top: 1rem;`,
    className: "notification-description",
    hexpand: true,
    useMarkup: true,
    xalign: 0,
    justification: "left",
    wrap: true
  });
  try {
    bodyLabel.label = notification.body;
  } catch (error) {
    bodyLabel.label = "...";
  }
  const hover = () => {
    hovered.value = true;
    hovered._block = true;
    clearTimeout(timeoutId);
    timeout2(100, () => hovered._block = false);
  };
  const hoverLost = () => GLib2.idle_add(0, () => {
    timeoutId = setTimeout(() => {
      if (hovered._block)
        return GLib2.SOURCE_REMOVE;
      hovered.value = false;
      notification.dismiss();
      return GLib2.SOURCE_REMOVE;
    }, 3000);
  });
  const content = Box4({
    css: `min-width: 400px;`,
    children: [
      NotificationIcon2(notification),
      Box4({
        hexpand: true,
        vertical: true,
        children: [
          Box4({
            children: [
              Label4({
                className: "notification-title",
                css: `${rtlMargin}`,
                xalign: 0,
                justification: "left",
                hexpand: true,
                maxWidthChars: 24,
                truncate: "end",
                wrap: true,
                label: notification.summary,
                useMarkup: notification.summary.startsWith("<")
              }),
              Label4({
                className: "notification-time",
                css: `${rtlMargin} margin-top: 0.5rem;`,
                vpack: "start",
                label: GLib2.DateTime.new_from_unix_local(notification.time).format("%H:%M")
              }),
              Button4({
                onHover: hover,
                className: "notification-close-button",
                vpack: "start",
                child: Icon3("window-close-symbolic"),
                onClicked: () => {
                  notification.close();
                }
              })
            ]
          }),
          bodyLabel
        ]
      })
    ]
  });
  const actionsbox = Revealer3({
    transition: "slide_up",
    child: EventBox2({
      onHover: hover,
      child: Box4({
        className: "notification-actions",
        children: notification.actions.map((action) => Button4({
          onHover: hover,
          css: `margin-bottom: 0.5rem; margin-top: 1rem; margin-left: 0.5rem; margin-right: 0.5rem`,
          className: "action-button",
          onClicked: () => Notifications2.invoke(notification.id, action.id),
          hexpand: true,
          child: Label4(action.label)
        }))
      })
    })
  }).bind("revealChild", hovered);
  const mainbox = EventBox2({
    className: `notification ${notification.urgency}`,
    vexpand: false,
    onPrimaryClick: () => {
      hovered.value = false;
      notification.dismiss();
    },
    attribute: { hovered },
    onHover: hover,
    onHoverLost: hoverLost,
    child: Box4({
      vertical: true,
      children: [content, notification.actions.length > 0 && actionsbox]
    })
  });
  return mainbox;
};

// src/notifications/OSDNotifications.js
var Popups = () => Box5({
  className: "notification-popups",
  vertical: true,
  attribute: {
    map: new Map,
    dismiss: (box, id, force = false) => {
      if (!id || !box.attribute.map.has(id)) {
        return;
      }
      if (box.attribute.map.get(id).attribute.hovered.value && !force)
        return;
      if (box.attribute.map.size - 1 === 0)
        box.get_parent().revealChild = false;
      timeout3(400, () => {
        box.attribute.map.get(id)?.destroy();
        box.attribute.map.delete(id);
      });
    },
    notify: (box, id) => {
      if (!id || Notifications3.dnd) {
        box.get_parent().revealChild = false;
        return;
      }
      box.attribute.map.set(id, Notification_default(Notifications3.getNotification(id)));
      box.children = Array.from(box.attribute.map.values());
      box.get_parent().revealChild = true;
    }
  }
}).hook(Notifications3, (box, id) => box.attribute.notify(box, id), "notified").hook(Notifications3, (box, id) => box.attribute.dismiss(box, id), "dismissed").hook(Notifications3, (box, id) => box.attribute.dismiss(box, id, true), "closed");
var PopupList = ({ transition = "slide_up" } = {}) => Box5({
  className: "notifications-popup-list",
  css: `
        min-height: 1.2px;
        min-width: 1.2px;
    `,
  children: [
    Revealer4({
      transition,
      child: Popups()
    })
  ]
});
var OSDNotifications_default = (monitor) => Window3({
  monitor,
  layer: "overlay",
  name: `notifications${monitor}`,
  visible: true,
  margins: [30, 30],
  anchor: ["bottom", local === "RTL" ? "left" : "right"],
  child: PopupList()
});

// src/on-screen/volume.js
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import {
Box as Box6,
Icon as Icon4,
Slider,
Stack,
Window as Window4
} from "resource:///com/github/Aylur/ags/widget.js";

// src/utils/ShowWindow.ts
import App3 from "resource:///com/github/Aylur/ags/app.js";
var isProcessing = false;
var timeoutId;
var ShowWindow_default = (windowName, timeout4 = 5000) => {
  if (isProcessing) {
    clearTimeout(timeoutId);
  } else {
    App3.openWindow(windowName);
  }
  timeoutId = setTimeout(() => {
    App3.closeWindow(windowName);
    isProcessing = false;
  }, timeout4);
  isProcessing = true;
};

// src/on-screen/volume.js
var oldValue = 0;
var Volume = () => Box6({
  className: "vol-osd shadow",
  css: "min-width: 140px",
  children: [
    Stack({
      className: "vol-stack",
      children: {
        101: Icon4("audio-volume-overamplified-symbolic"),
        67: Icon4("audio-volume-high-symbolic"),
        34: Icon4("audio-volume-medium-symbolic"),
        1: Icon4("audio-volume-low-symbolic"),
        0: Icon4("audio-volume-muted-symbolic")
      }
    }).hook(Audio, (stack) => {
      if (!Audio.speaker)
        return;
      if (Audio.speaker.isMuted) {
        stack.shown = "0";
        return;
      }
      const show = [101, 67, 34, 1, 0].find((threshold) => threshold <= Audio.speaker.volume * 100);
      stack.shown = `${show}`;
    }, "speaker-changed"),
    Slider({
      hexpand: true,
      className: "unset",
      drawValue: false,
      onChange: ({ value }) => Audio.speaker.volume = value
    }).hook(Audio, (slider) => {
      if (!Audio.speaker || oldValue === Audio.speaker.volume) {
        return;
      }
      ShowWindow_default("vol_osd");
      oldValue = Audio.speaker.volume;
      slider.value = oldValue;
    }, "speaker-changed")
  ]
});
var VolumeOSD = () => Window4({
  name: `vol_osd`,
  focusable: false,
  margins: [0, 0, 140, 0],
  layer: "overlay",
  popup: true,
  anchor: ["bottom"],
  child: Volume()
});

// src/widgets/hardware/battery.js
import {
Button as Button5,
Label as Label5,
CircularProgress
} from "resource:///com/github/Aylur/ags/widget.js";
import Battery2 from "resource:///com/github/Aylur/ags/service/battery.js";
var BatteryWidget = () => {
  const label = Label5({
    className: "battery-inner",
    label: "\uF111"
  });
  const button = Button5({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  return CircularProgress({
    className: "battery",
    child: button,
    startAt: 0,
    rounded: false
  }).hook(Battery2, (batteryProgress2) => {
    if (Battery2.charging) {
      label.className = "battery-inner-charging";
    } else {
      label.className = "battery-inner";
    }
    batteryProgress2.value = Battery2.percent / 100;
    label.tooltipMarkup = `<span weight='bold' foreground='#FF8580'>Battery percentage (${Battery2.percent}%)</span>`;
  });
};

// src/widgets/hardware/cpu.js
import {execAsync as execAsync3} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box7,
Button as Button6,
CircularProgress as CircularProgress2,
Label as Label6
} from "resource:///com/github/Aylur/ags/widget.js";
var CpuWidget = () => {
  const label = Label6({
    className: "cpu-inner",
    label: "\uF111"
  });
  const button = Button6({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  const progress = CircularProgress2({
    className: "cpu",
    child: button,
    startAt: 0,
    rounded: false
  });
  return Box7({
    className: "bar-hw-cpu-box"
  }).poll(1000, (box) => {
    execAsync3(`/home/${Utils.USER}/.config/ags/scripts/cpu.sh`).then((val) => {
      progress.value = val / 100;
      label.tooltipMarkup = `<span weight='bold' foreground='#FDC227'>(${val}%) of CPU is used</span>`;
    }).catch(print);
    box.children = [progress];
    box.show_all();
  });
};

// src/widgets/hardware/temp.js
import {execAsync as execAsync4} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box8,
Button as Button7,
CircularProgress as CircularProgress3,
Label as Label7
} from "resource:///com/github/Aylur/ags/widget.js";
var TempWidget = () => {
  const label = Label7({
    className: "temp-inner",
    label: "\uF111"
  });
  const button = Button7({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  const progress = CircularProgress3({
    className: "temp",
    child: button,
    startAt: 0,
    rounded: false
  });
  return Box8({
    className: "bar-hw-temp-box"
  }).poll(30000, (box) => {
    execAsync4(`/home/${Utils.USER}/.config/ags/scripts/temp.sh`).then((val) => {
      const temps = val.split("\n");
      let total = 0;
      for (let index = 0;index < temps.length; index++) {
        const element = temps[index].replace("+", "").replace("\xB0C", "");
        total += parseInt(element);
      }
      total = parseInt(total / temps.length);
      progress.value = total / 100;
      label.tooltipMarkup = `<span weight='bold' foreground='#C78DF2'>Total temperature of the devices (${total}%)</span>`;
    }).catch(print);
    box.children = [progress];
    box.show_all();
  });
};

// src/widgets/hardware/ram.js
import {execAsync as execAsync5} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box9,
Button as Button8,
CircularProgress as CircularProgress4,
Label as Label8
} from "resource:///com/github/Aylur/ags/widget.js";
var RamWidget = () => {
  const label = Label8({
    className: "ram-inner",
    label: "\uF111"
  });
  const button = Button8({
    className: "unset no-hover",
    child: label,
    onClicked: () => showHardwareMenu()
  });
  const progress = CircularProgress4({
    className: "ram",
    startAt: 0,
    rounded: false,
    child: button
  });
  return Box9({
    className: "bar-hw-ram-box"
  }).poll(30000, (box) => {
    execAsync5(`/home/${Utils.USER}/.config/ags/scripts/ram.sh`).then((val) => {
      progress.value = val / 100;
      label.tooltipMarkup = `<span weight='bold' foreground='#79A7EC'>(${val}%) RAM used</span>`;
    }).catch(print);
    box.children = [progress];
    box.show_all();
  });
};

// src/widgets/hardware/all.js
import {Box as Box10} from "resource:///com/github/Aylur/ags/widget.js";
var HardwareBox = () => Box10({
  className: "hardware-box unset",
  children: [CpuWidget(), RamWidget(), BatteryWidget(), TempWidget()]
});

// src/widgets/internet.js
import {Box as Box11, Label as Label9} from "resource:///com/github/Aylur/ags/widget.js";
import {exec as exec2} from "resource:///com/github/Aylur/ags/utils.js";
import Network from "resource:///com/github/Aylur/ags/service/network.js";
var convertToH = function(bytes) {
  let speed;
  let dim;
  let bits = bytes * 8;
  bits = bits / 10;
  if (bits < 1000) {
    bits = 0;
    speed = bits;
    dim = "b/s";
  } else if (bits < 1e6) {
    speed = bits / 1000;
    dim = "kb/s";
  } else if (bits < 1e9) {
    speed = bits / 1e6;
    dim = "mb/s";
  } else if (bits < 1000000000000) {
    speed = bits / 1e9;
    dim = "gb/s";
  } else {
    speed = parseFloat(bits);
    dim = "b/s";
  }
  return Math.floor(speed + 0.5) + dim;
};
var TIMEOUT = 300;
var NetSpeedMeters = () => {
  let prevReceivedBytes = 0;
  let prevTransmittedBytes = 0;
  return Box11().poll(TIMEOUT, (box) => {
    const receivedBytes = exec2("cat /sys/class/net/wlp0s20f3/statistics/rx_bytes");
    const transmittedBytes = exec2("cat /sys/class/net/wlp0s20f3/statistics/tx_bytes");
    const download = Label9({
      justification: "right",
      css: "min-width: 60px"
    });
    const upload = Label9({
      justification: "right",
      css: "min-width: 80px"
    });
    const downloadSpeed = (receivedBytes - prevReceivedBytes) / (TIMEOUT / 1000);
    const uploadSpeed = (transmittedBytes - prevTransmittedBytes) / (TIMEOUT / 1000);
    download.label = `${convertToH(downloadSpeed)} \uF103`;
    upload.label = `${convertToH(uploadSpeed)} \uF102`;
    prevReceivedBytes = receivedBytes;
    prevTransmittedBytes = transmittedBytes;
    box.children = [
      download,
      upload
    ];
    box.show_all();
  });
};
var NetworkInformation = () => Box11({
  className: "internet-box small-shadow unset"
}).hook(Network, (box) => {
  let internetLabel;
  const ssidLabel = Label9({
    className: "wifi-name-label unset",
    label: `${Network.wifi.ssid}`
  });
  if (Network.wifi?.internet === "disconnected") {
    internetLabel = "\uDB82\uDD2E";
  } else if (Network.connectivity === "limited") {
    internetLabel = "\uDB82\uDD29";
  } else if (Network.wifi?.strength > 85) {
    internetLabel = "\uDB82\uDD28";
  } else if (Network.wifi?.strength > 70) {
    internetLabel = "\uDB82\uDD25";
  } else if (Network.wifi?.strength > 50) {
    internetLabel = "\uDB82\uDD22";
  } else if (Network.wifi?.strength > 20) {
    internetLabel = "\uDB82\uDD1F";
  } else {
    internetLabel = "\uDB82\uDD2F";
  }
  const internetStatusLabel = Label9({
    className: "wifi-icon-strength unset",
    label: internetLabel
  });
  box.children = [NetSpeedMeters(), ssidLabel, internetStatusLabel];
  box.show_all();
});

// src/widgets/systray.js
import {SystemTray} from "resource:///com/github/Aylur/ags/service/systemtray.js";
var { Gravity } = imports.gi.Gdk;
var PanelButton = ({ className, content, ...rest }) => Widget.Button({
  className: `panel-button ${className} unset`,
  child: Widget.Box({ children: [content] }),
  ...rest
});
var SysTrayItem = (item) => PanelButton({
  className: "tray-btn unset",
  content: Widget.Icon().bind("icon", item, "icon"),
  setup: (btn) => {
    const id = item.menu.connect("popped-up", (menu) => {
      btn.toggleClassName("active");
      menu.connect("notify::visible", (menu2) => {
        btn.toggleClassName("active", menu2.visible);
      });
      menu.disconnect(id);
    });
  },
  onPrimaryClick: (_, event) => {
    item.activate(event).catch(print);
  },
  onSecondaryClick: (btn) => item.menu.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null)
});
var SysTrayBox = () => Widget.Box({
  className: "systray unset",
  attribute: {
    items: new Map,
    onAdded: (box, id) => {
      const item = SystemTray.getItem(id);
      if (box.attribute.items.has(id) || !item)
        return;
      const widget13 = SysTrayItem(item);
      box.attribute.items.set(id, widget13);
      box.add(widget13);
      box.show_all();
    },
    onRemoved: (box, id) => {
      if (!box.attribute.items.has(id))
        return;
      box.attribute.items.get(id).destroy();
      box.attribute.items.delete(id);
    }
  }
}).hook(SystemTray, (box, id) => box.attribute.onAdded(box, id), "added").hook(SystemTray, (box, id) => box.attribute.onRemoved(box, id), "removed");

// src/widgets/workspace.js
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import {Box as Box12, Label as Label10, Button as Button9} from "resource:///com/github/Aylur/ags/widget.js";
import {execAsync as execAsync6} from "resource:///com/github/Aylur/ags/utils.js";
var Workspaces = () => Box12({
  className: "unset workspaces"
}).hook(Hyprland, (box) => {
  const arr = Array.from({ length: 10 }, (_, i) => i + 1);
  const inActiveIcons = ["\uEEF4", "\uDB83\uDFE4", "\uDB80\uDC95", "\uDB80\uDE56", "\uDB85\uDE4C", "\uDB80\uDD89", "\uEEA5", "\uDB83\uDEB6", "\uDB84\uDEE2", "\uEEAD"];
  const activeIcons = ["\uEEF3", "\uDB83\uDFE3", "\uDB80\uDC94", "\uDB80\uDE4B", "\uDB85\uDE4B", "\uDB80\uDD88", "\uEEA4", "\uDB83\uDEB5", "\uDB84\uDEE1", "\uEEAC"];
  box.children = arr.map((i) => Button9({
    onClicked: () => execAsync6(`hyprctl dispatch workspace ${i}`),
    child: Label10({
      label: Hyprland.active.workspace.id == i ? activeIcons[i - 1] : inActiveIcons[i - 1]
    }),
    className: Hyprland.active.workspace.id == i ? "unset focused" : Hyprland.workspaces.find((item) => item.id === i)?.windows > 0 ? "unset unfocused has-windows" : "unset unfocused"
  }));
});

// src/topbar.ts
import {execAsync as execAsync7} from "resource:///com/github/Aylur/ags/utils.js";
import {
Box as Box13,
CenterBox,
Label as Label11,
Window as Window5
} from "resource:///com/github/Aylur/ags/widget.js";
var Clock = () => Label11({
  className: "clock small-shadow unset"
}).poll(1000, (self) => execAsync7(["date", "+(%I:%M) %A, %d %B"]).then((date) => self.label = date).catch(print));
var Weather = () => {
  let icon = Label11({
    className: "bar-weather-icon unset"
  });
  let text = Label11({
    truncate: "end",
    xalign: 0,
    maxWidthChars: 24
  });
  let button = Widget.Button({
    className: "unset un-hover",
    onClicked: () => showWeatherMenu(),
    child: Box13({
      className: "bar-weather-box small-shadow unset",
      children: [icon, text]
    }).hook(WeatherService_default, (self) => {
      if (WeatherService_default.arValue != "") {
        const max = WeatherService_default.maxTempC;
        const min = WeatherService_default.minTempC;
        text.label = `(${min} - ${max}) ${WeatherService_default.feelsLike} ${WeatherService_default.arValue}`;
        icon.label = `${WeatherService_default.weatherCode}`;
      } else {
        text.label = `Weather service is not available`;
      }
    })
  });
  return button;
};
var DynamicWallpaper = () => Widget.Button({
  className: "unset dynamic-wallpaper",
  onClicked: () => {
    ThemeService_default.toggleDynamicWallpaper();
  }
}).hook(ThemeService_default, (btn) => {
  if (!ThemeService_default.isDynamicTheme) {
    btn.visible = false;
    return;
  }
  btn.visible = true;
  if (ThemeService_default.dynamicWallpaperIsOn)
    btn.label = "\uE413";
  else
    btn.label = "\uE3F4";
});
var Right = () => Box13({
  children: [
    Workspaces(),
    HardwareBox(),
    DynamicWallpaper()
  ]
});
var Center = () => Box13({
  children: [Clock()]
});
var Left = () => Box13({
  hpack: "end",
  children: [
    NotificationCenterButton(),
    Weather(),
    NetworkInformation(),
    SysTrayBox(),
    MenuButton()
  ]
});
var Bar = ({ monitor } = {}) => Window5({
  name: `bar${monitor || ""}`,
  className: "bar-bg unset",
  monitor,
  anchor: ["bottom", "left", "right"],
  exclusivity: "exclusive",
  child: CenterBox({
    className: "bar shadow",
    startWidget: Right(),
    centerWidget: Center(),
    endWidget: Left()
  })
});

// src/widgets/FuzzyClock.js
var SATURDAY = 6;
var SUNDAY = 7;
var MONDAY = 1;
var TUESDAY = 2;
var WEDNESDAY = 3;
var THURSDAY = 4;
var FRIDAY = 5;
var FuzzyDay = () => TitleText({
  title: "",
  text: "",
  titleClass: "wd-fuzzy-day-text",
  textClass: "wd-fuzzy-day-icon",
  boxClass: "wd-fuzzy-day-box",
  titleXalign: 0,
  textXalign: 0,
  vertical: false
});
var TimeNow = () => Widget.Label({
  className: "wd-time-now",
  xalign: 0
});
var FuzzyTime = () => TitleText({
  title: "",
  text: "",
  titleClass: "wd-fuzzy-time-text",
  textClass: "wd-fuzzy-time-icon",
  boxClass: "wd-fuzzy-time-box",
  titleXalign: 0,
  textXalign: 0,
  vertical: false
});
var FuzzyClock_default = (className) => Widget.Box({
  className: className || "wd-fuzzy-clock-box",
  vertical: true,
  children: [FuzzyDay(), TimeNow(), FuzzyTime()]
}).poll(15 * 1000 * 60, (box) => {
  Utils.execAsync(["date", "+%u|%-k"]).then((val) => {
    const date = val.split("|");
    const day = date[0];
    let hour = date[1];
    let usedFuzzyDay = box.children[0];
    let usedTimeNow = box.children[1];
    let usedFuzzyTime = box.children[2];
    if (day == SATURDAY) {
      usedFuzzyDay.children[0].label = "Welcome to a new day,";
      usedFuzzyDay.children[1].label = "\uF164";
      usedTimeNow.label = "Saturday is the beginning of new adventures.";
    } else if (day == SUNDAY) {
      usedFuzzyDay.children[0].label = "Sunday is a new opportunity";
      usedFuzzyDay.children[1].label = "\uF25B";
      usedTimeNow.label = "Keep striving towards your goals.";
    } else if (day == MONDAY) {
      usedFuzzyDay.children[0].label = "Light session today";
      usedFuzzyDay.children[1].label = "\uF3B5";
      usedTimeNow.label = "Enjoy the moment of rest and prepare for the days ahead.";
    } else if (day == TUESDAY) {
      usedFuzzyDay.children[0].label = "Half the week has come";
      usedFuzzyDay.children[1].label = "\uF518";
      usedTimeNow.label = "Maintain the momentum and positivity.";
    } else if (day == WEDNESDAY) {
      usedFuzzyDay.children[0].label = "Only two days left";
      usedFuzzyDay.children[1].label = "\uF4DA";
      usedTimeNow.label = "Enjoy challenges and do your best.";
    } else if (day == THURSDAY) {
      usedFuzzyDay.children[0].label = "Welcome, Thursday";
      usedFuzzyDay.children[1].label = "\uF11B";
      usedTimeNow.label = "Time to enjoy the efforts.";
    } else if (day == FRIDAY) {
      usedFuzzyDay.children[0].label = "Friday";
      usedFuzzyDay.children[1].label = "\uF584";
      usedTimeNow.label = "Fun and relaxation, enjoy the quiet moments.";
    }
    if (hour >= 0 && hour < 4) {
      usedFuzzyTime.children[0].label = "Time to code, time to create";
      usedFuzzyTime.children[1].label = "\uF5FC";
    } else if (hour >= 4 && hour < 9) {
      usedFuzzyTime.children[0].label = "Good morning! A fresh start to a day full of opportunities";
      usedFuzzyTime.children[1].label = "\uF0F4";
    } else if (hour >= 9 && hour < 12) {
      usedFuzzyTime.children[0].label = "The morning has come, let the achievements begin";
      usedFuzzyTime.children[1].label = "\uF5D1";
    } else if (hour >= 12 && hour < 15) {
      usedFuzzyTime.children[0].label = "Its lunch time, rest up and get ready for round two";
      usedFuzzyTime.children[1].label = "\uF562";
    } else if (hour >= 15 && hour < 16) {
      usedFuzzyTime.children[0].label = "Enjoy a cup of tea and relax with a light book";
      usedFuzzyTime.children[1].label = "\uF518";
    } else if (hour >= 16 && hour < 18) {
      usedFuzzyTime.children[0].label = "Its time for creativity, passion and light work awaits you";
      usedFuzzyTime.children[1].label = "\uF0F4";
    } else if (hour >= 18 && hour < 21) {
      usedFuzzyTime.children[0].label = "Dinner is ready, enjoy your time with your loved ones";
      usedFuzzyTime.children[1].label = "\uF818";
    } else if (hour >= 21) {
      usedFuzzyTime.children[0].label = "Good night! Relax and prepare for a new tomorrow";
      usedFuzzyTime.children[1].label = "\uF186";
    }
  }).catch(print);
});

// src/widgets/desktop/BlackHole.js
var iconImage = Widget.Icon({
  icon: `${settings_default.assets.wallpapers}/image.png`,
  size: 70,
  className: "my-wd-user-icon"
});
var weatherIcon = Widget.Label({
  label: "",
  className: "my-weather-wd-icon"
});
var RowOne2 = () => Widget.Box({
  className: "weather-wd-row-one small-shadow",
  children: []
}).hook(WeatherService_default, (self) => {
  const tt = TitleText({
    title: "today",
    text: WeatherService_default.arValue,
    textClass: "my-weather-wd-text",
    boxClass: "my-weather-wd-title-text-box",
    titleXalign: local === "RTL" ? 1 : 0,
    textXalign: local === "RTL" ? 1 : 0
  });
  weatherIcon.label = WeatherService_default.weatherCode;
  self.children = [weatherIcon, tt, iconImage];
});
var Insider = ({ icon, title, text }) => {
  const label = Widget.Label({
    label: icon,
    className: "my-weather-wd-day-icon"
  });
  return Widget.Box({
    className: "my-weather-wd-day-box",
    vertical: true,
    homogeneous: true,
    children: [
      label,
      TitleText({
        title,
        titleClass: "my-wd-weather-day-name",
        text,
        textClass: "my-wd-weather-day-text",
        boxClass: ""
      })
    ]
  });
};
var RowTwo2 = () => {
  return Widget.Box({
    className: "my-weather-wd-row-two small-shadow",
    spacing: 55,
    homogeneous: false,
    children: []
  }).hook(WeatherService_default, (self) => {
    self.children = [
      Insider({
        icon: WeatherService_default.weatherCode1,
        title: "today",
        text: WeatherService_default.avgTempC1
      }),
      Insider({
        icon: WeatherService_default.weatherCode2,
        title: "tomorrow",
        text: WeatherService_default.avgTempC2
      }),
      Insider({
        icon: WeatherService_default.weatherCode3,
        title: "After tomorrow",
        text: WeatherService_default.avgTempC3
      })
    ];
  });
};
var DesktopWidget = () => Widget.Box({
  vertical: true,
  children: [
    RowOne2(),
    RowTwo2(),
    MusicPLayer_default("my-desktop-music-box small-shadow")
  ]
});
var DesktopWidget2 = () => Widget.Box({
  vertical: true,
  children: [
    FuzzyClock_default("my-fuzzy-clock-box small-shadow")
  ]
});
var FWidget = () => Widget.Window({
  name: `desktop_black_hole_widget_widget`,
  margins: [80, 80],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "right"],
  child: DesktopWidget()
});
var FWidget2 = () => Widget.Window({
  name: `desktop_black_hole_widget_widget_2`,
  margins: [80, 80],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["bottom", "left"],
  child: DesktopWidget2()
});
var blackHoleWidget = FWidget();
var blackHoleWidget2 = FWidget2();
globalThis.ShowBHWidget = () => {
  blackHoleWidget.visible = true;
  blackHoleWidget2.visible = true;
};
globalThis.HideBHWidget = () => {
  blackHoleWidget.visible = false;
  blackHoleWidget2.visible = false;
};
var BlackHole_default = blackHoleWidget;

// src/widgets/desktop/Circles.js
import {Mpris as Mpris2} from "resource:///com/github/Aylur/ags/service/mpris.js";

// src/components/NestedCircles.ts
var createNestedCircles = ({
  child = undefined,
  innerCircle1Css = "",
  innerCircle2Css = "",
  innerCircle3Css = "",
  innerCircle4Css = "",
  innerCircle5Css = "",
  innerCircle6Css = "",
  outerCircle1Css = "",
  outerCircle2Css = "",
  outerCircle3Css = "",
  outerCircle4Css = ""
}) => {
  const innerCircle1 = Widget.CircularProgress({
    css: `
            font-size: 1rem;
            min-width: 6rem;
            min-height: 6rem;
        `,
    className: innerCircle1Css,
    child,
    startAt: 0.25,
    endAt: 0.5
  });
  const innerCircle2 = Widget.CircularProgress({
    css: `
            font-size: 1rem;
            min-width: 8.2rem;
            min-height: 8.2rem;
        `,
    className: innerCircle2Css,
    startAt: 0.25,
    endAt: 0.5
  });
  const innerCircle3 = Widget.CircularProgress({
    css: `
            font-size: 1.08rem;
            min-height: 10.5rem;
            min-width: 10.5rem;
        `,
    className: innerCircle3Css,
    startAt: 0.25,
    endAt: 0.5
  });
  const innerCircle4 = Widget.CircularProgress({
    css: `
            font-size: 1rem;
            min-width: 6rem;
            min-height: 6rem;
        `,
    className: innerCircle4Css,
    startAt: 0.75,
    endAt: 1
  });
  const innerCircle5 = Widget.CircularProgress({
    css: `
            font-size: 1rem;
            min-width: 8.2rem;
            min-height: 8.2rem;
        `,
    className: innerCircle5Css,
    startAt: 0.75,
    endAt: 1
  });
  const innerCircle6 = Widget.CircularProgress({
    css: `
            font-size: 1.08rem;
            min-height: 10.5rem;
            min-width: 10.5rem;
        `,
    className: innerCircle6Css,
    startAt: 0.75,
    endAt: 1
  });
  const outerCircle1 = Widget.CircularProgress({
    css: `
            font-size: 0.3rem;
            min-height: 11.7rem;
            min-width: 11.7rem;
        `,
    className: outerCircle1Css,
    startAt: 0.25,
    endAt: 1
  });
  const outerCircle2 = Widget.CircularProgress({
    css: `
            font-size: 0.3rem;
            min-height: 12.65rem;
            min-width: 12.65rem;
        `,
    className: outerCircle2Css,
    startAt: 0.25,
    endAt: 1
  });
  const outerCircle3 = Widget.CircularProgress({
    css: `
            font-size: 0.3rem;
            min-height: 14rem;
            min-width: 14rem;
        `,
    className: outerCircle3Css,
    startAt: 0.75,
    endAt: 0.5
  });
  const outerCircle4 = Widget.CircularProgress({
    css: `
            font-size: 0.3rem;
            min-height: 14.9rem;
            min-width: 14.9rem;
        `,
    className: outerCircle4Css,
    startAt: 0.75,
    endAt: 0.5
  });
  return {
    innerCircle1,
    innerCircle2,
    innerCircle3,
    innerCircle4,
    innerCircle5,
    innerCircle6,
    outerCircle1,
    outerCircle2,
    outerCircle3,
    outerCircle4
  };
};
var NestedCircles_default = createNestedCircles;

// src/widgets/desktop/Circles.js
var createCoreWindow = function(name, margins, child) {
  return Widget.Window({
    name,
    margins,
    layer: "background",
    visible: false,
    focusable: false,
    anchor: ["top", "right"],
    child
  });
};
var cpuNestedCircles1 = NestedCircles_default({
  child: Widget.Label({
    className: "desktop-cpu-circle-icon",
    label: "\uF2DB"
  }),
  innerCircle1Css: "desktop-core-circle",
  innerCircle2Css: "desktop-core-circle",
  innerCircle3Css: "desktop-core-circle",
  innerCircle4Css: "desktop-core-circle",
  innerCircle5Css: "desktop-core-circle",
  innerCircle6Css: "desktop-core-circle",
  outerCircle1Css: "desktop-core-circle",
  outerCircle2Css: "desktop-core-circle",
  outerCircle3Css: "desktop-core-circle",
  outerCircle4Css: "desktop-core-circle"
});
var cpuNestedCircles2 = NestedCircles_default({
  child: Widget.Label({
    className: "desktop-cpu-circle-icon",
    label: "\uF2DB"
  }),
  innerCircle1Css: "desktop-core-circle",
  innerCircle2Css: "desktop-core-circle",
  innerCircle3Css: "desktop-core-circle",
  innerCircle4Css: "desktop-core-circle",
  innerCircle5Css: "desktop-core-circle",
  innerCircle6Css: "desktop-core-circle",
  outerCircle1Css: "desktop-core-circle",
  outerCircle2Css: "desktop-core-circle",
  outerCircle3Css: "desktop-core-circle",
  outerCircle4Css: "desktop-core-circle"
});
var MusicWidget = Widget.Box({
  spacing: 18,
  homogeneous: false,
  vertical: true,
  children: [
    Widget.Box({
      vertical: true,
      className: "desktop-wd-music-player-box",
      homogeneous: true,
      children: [
        Widget.Label({
          className: "desktop-wd-music-player-title",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        }),
        Widget.Label({
          className: "desktop-wd-music-player-artist",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        })
      ]
    }).hook(Mpris2, (box) => {
      if (Mpris2?.players.length > 0 && Mpris2?.getPlayer(selectedMusicPlayer)) {
        box.children[0].label = Mpris2?.getPlayer(selectedMusicPlayer)?.trackTitle;
        box.children[1].label = Mpris2?.getPlayer(selectedMusicPlayer)?.trackArtists[0];
      } else {
        box.children[0].label = "No music playing";
        box.children[1].label = "No music playing";
      }
    })
  ]
}).poll(3 * 1000, (self) => {
  Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/cpu_cores.sh`).then((val) => {
    const data = JSON.parse(val);
    cpuNestedCircles1.innerCircle1.value = data[1] / 100;
    cpuNestedCircles1.innerCircle2.value = data[2] / 100;
    cpuNestedCircles1.innerCircle3.value = data[3] / 100;
    cpuNestedCircles1.innerCircle4.value = data[4] / 100;
    cpuNestedCircles1.innerCircle5.value = data[5] / 100;
    cpuNestedCircles1.innerCircle6.value = data[6] / 100;
    cpuNestedCircles2.innerCircle1.value = data[7] / 100;
    cpuNestedCircles2.innerCircle2.value = data[8] / 100;
    cpuNestedCircles2.innerCircle3.value = data[9] / 100;
    cpuNestedCircles2.innerCircle4.value = data[10] / 100;
    cpuNestedCircles2.innerCircle5.value = data[11] / 100;
    cpuNestedCircles2.innerCircle6.value = data[12] / 100;
  }).catch(print);
  Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/devices_temps.sh`).then((val) => {
    const data = JSON.parse(val);
    cpuNestedCircles1.outerCircle1.value = data.Sensor1 / 100;
    cpuNestedCircles1.outerCircle2.value = data.Sensor2 / 100;
    cpuNestedCircles1.outerCircle3.value = data.Package_id_0 / 100;
    cpuNestedCircles1.outerCircle4.value = data.Core0 / 100;
    cpuNestedCircles2.outerCircle1.value = data.Core1 / 100;
    cpuNestedCircles2.outerCircle2.value = data.Core2 / 100;
    cpuNestedCircles2.outerCircle3.value = data.Core3 / 100;
    cpuNestedCircles2.outerCircle4.value = data.Core4 / 100;
  }).catch(print);
});
var CircleMusicWidget = () => Widget.Window({
  name: `desktop_circles_widget`,
  margins: [135, 60],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["bottom", "right"],
  child: MusicWidget
});
var FuzzyClockWidget = () => Widget.Window({
  name: `desktop_circles_saying_widget`,
  margins: [230, 60],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["bottom", "right"],
  child: FuzzyClock_default()
});
var circlesMusicWidget = CircleMusicWidget();
var fuzzyClockWidget = FuzzyClockWidget();
var core1Widget = createCoreWindow("desktop_core_1_widget", [93, 407], cpuNestedCircles1.innerCircle1);
var core2Widget = createCoreWindow("desktop_core_2_widget", [77, 391], cpuNestedCircles1.innerCircle2);
var core3Widget = createCoreWindow("desktop_core_3_widget", [60, 374], cpuNestedCircles1.innerCircle3);
var core4Widget = createCoreWindow("desktop_core_4_widget", [93, 407], cpuNestedCircles1.innerCircle4);
var core5Widget = createCoreWindow("desktop_core_5_widget", [77, 391], cpuNestedCircles1.innerCircle5);
var core6Widget = createCoreWindow("desktop_core_6_widget", [60, 374], cpuNestedCircles1.innerCircle6);
var temp1Widget = createCoreWindow("desktop_temp1_widget", [52, 365], cpuNestedCircles1.outerCircle1);
var temp2Widget = createCoreWindow("desktop_temp2_widget", [45, 358], cpuNestedCircles1.outerCircle2);
var temp3Widget = createCoreWindow("desktop_temp3_widget", [36, 348], cpuNestedCircles1.outerCircle3);
var temp4Widget = createCoreWindow("desktop_temp4_widget", [29, 341], cpuNestedCircles1.outerCircle4);
var core7Widget = createCoreWindow("desktop_core_7_widget", [324, 407], cpuNestedCircles2.innerCircle1);
var core8Widget = createCoreWindow("desktop_core_8_widget", [308, 391], cpuNestedCircles2.innerCircle2);
var core9Widget = createCoreWindow("desktop_core_9_widget", [291, 374], cpuNestedCircles2.innerCircle3);
var core10Widget = createCoreWindow("desktop_core_10_widget", [324, 407], cpuNestedCircles2.innerCircle4);
var core11Widget = createCoreWindow("desktop_core_11_widget", [308, 391], cpuNestedCircles2.innerCircle5);
var core12Widget = createCoreWindow("desktop_core_12_widget", [291, 374], cpuNestedCircles2.innerCircle6);
var temp5Widget = createCoreWindow("desktop_temp5_widget", [283, 365], cpuNestedCircles2.outerCircle1);
var temp6Widget = createCoreWindow("desktop_temp6_widget", [276, 358], cpuNestedCircles2.outerCircle2);
var temp7Widget = createCoreWindow("desktop_temp7_widget", [267, 348], cpuNestedCircles2.outerCircle3);
var temp8Widget = createCoreWindow("desktop_temp8_widget", [260, 341], cpuNestedCircles2.outerCircle4);
globalThis.ShowCirclesWidget = () => {
  circlesMusicWidget.visible = true;
  fuzzyClockWidget.visible = true;
  core1Widget.visible = true;
  core2Widget.visible = true;
  core3Widget.visible = true;
  core4Widget.visible = true;
  core5Widget.visible = true;
  core6Widget.visible = true;
  core7Widget.visible = true;
  core8Widget.visible = true;
  core9Widget.visible = true;
  core10Widget.visible = true;
  core11Widget.visible = true;
  core12Widget.visible = true;
  temp1Widget.visible = true;
  temp2Widget.visible = true;
  temp3Widget.visible = true;
  temp4Widget.visible = true;
  temp5Widget.visible = true;
  temp6Widget.visible = true;
  temp7Widget.visible = true;
  temp8Widget.visible = true;
};
globalThis.HideCirclesWidget = () => {
  circlesMusicWidget.visible = false;
  fuzzyClockWidget.visible = false;
  core1Widget.visible = false;
  core2Widget.visible = false;
  core3Widget.visible = false;
  core4Widget.visible = false;
  core5Widget.visible = false;
  core6Widget.visible = false;
  core7Widget.visible = false;
  core8Widget.visible = false;
  core9Widget.visible = false;
  core10Widget.visible = false;
  core11Widget.visible = false;
  core12Widget.visible = false;
  temp1Widget.visible = false;
  temp2Widget.visible = false;
  temp3Widget.visible = false;
  temp4Widget.visible = false;
  temp5Widget.visible = false;
  temp6Widget.visible = false;
  temp7Widget.visible = false;
  temp8Widget.visible = false;
};
var Circles_default = circlesMusicWidget;

// src/widgets/desktop/ColorsWidget.js
var Mpris3 = await Service.import("mpris");
var DesktopWidget3 = Widget.Box({
  spacing: 38,
  homogeneous: false,
  children: [
    Widget.Box({
      vertical: true,
      className: "desktop-wd-music-player-box",
      homogeneous: true,
      children: [
        Widget.Label({
          className: "desktop-wd-music-player-title",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        }),
        Widget.Label({
          className: "desktop-wd-music-player-artist",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        })
      ]
    }).hook(Mpris3, (box) => {
      if (Mpris3?.players.length > 0 && Mpris3?.getPlayer(selectedMusicPlayer)) {
        box.children[0].label = Mpris3?.getPlayer(selectedMusicPlayer)?.trackTitle;
        box.children[1].label = Mpris3?.getPlayer(selectedMusicPlayer)?.trackArtists[0];
      } else {
        box.children[0].label = "No music playing";
        box.children[1].label = "No music playing";
      }
    }),
    Widget.Box({
      className: "desktop-wd-separator"
    }),
    FuzzyClock_default(),
    Widget.Box({
      className: "desktop-wd-separator"
    })
  ]
});
var FinalWidget = () => Widget.Window({
  name: `desktop_color_widget`,
  margins: [80, 0, 0, 80],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top"],
  child: DesktopWidget3
});
var ColorWidget = FinalWidget();
globalThis.ShowColorWidget = () => ColorWidget.visible = true;
globalThis.HideColorWidget = () => ColorWidget.visible = false;
var ColorsWidget_default = ColorWidget;

// src/widgets/desktop/DeerWidget.js
var iconImage2 = Widget.Icon({
  icon: `${settings_default.assets.wallpapers}/image.png`,
  size: 70,
  className: "my-wd-user-icon"
});
var weatherIcon2 = Widget.Label({
  label: "",
  className: "my-weather-wd-icon"
});
var RowOne3 = () => Widget.Box({
  className: "weather-wd-row-one small-shadow",
  children: []
}).hook(WeatherService_default, (self) => {
  const tt = TitleText({
    title: "today",
    text: WeatherService_default.arValue,
    textClass: "my-weather-wd-text",
    boxClass: "my-weather-wd-title-text-box",
    titleXalign: local === "RTL" ? 1 : 0,
    textXalign: local === "RTL" ? 1 : 0
  });
  weatherIcon2.label = WeatherService_default.weatherCode;
  self.children = [weatherIcon2, tt, iconImage2];
});
var Insider2 = ({ icon, title, text }) => {
  const label = Widget.Label({
    label: icon,
    className: "my-weather-wd-day-icon"
  });
  return Widget.Box({
    className: "my-weather-wd-day-box",
    vertical: true,
    homogeneous: true,
    children: [
      label,
      TitleText({
        title,
        titleClass: "my-wd-weather-day-name",
        text,
        textClass: "my-wd-weather-day-text",
        boxClass: ""
      })
    ]
  });
};
var RowTwo3 = () => {
  return Widget.Box({
    className: "my-weather-wd-row-two small-shadow",
    spacing: 55,
    homogeneous: false
  }).hook(WeatherService_default, (self) => {
    self.children = [
      Insider2({
        icon: WeatherService_default.weatherCode1,
        title: "today",
        text: WeatherService_default.avgTempC1
      }),
      Insider2({
        icon: WeatherService_default.weatherCode2,
        title: "tomorrow",
        text: WeatherService_default.avgTempC2
      }),
      Insider2({
        icon: WeatherService_default.weatherCode3,
        title: "After tomorrow",
        text: WeatherService_default.avgTempC3
      })
    ];
  });
};
var DesktopWidget5 = () => Widget.Box({
  vertical: true,
  children: [
    RowOne3(),
    RowTwo3(),
    MusicPLayer_default("my-desktop-music-box small-shadow")
  ]
});
var DesktopWidget22 = () => Widget.Box({
  vertical: true,
  children: [
    FuzzyClock_default("my-fuzzy-clock-box small-shadow")
  ]
});
var FWidget3 = () => Widget.Window({
  name: `desktop_deer_widget_widget`,
  margins: [40, 40],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "right"],
  child: DesktopWidget5()
});
var FWidget22 = () => Widget.Window({
  name: `desktop_deer_widget_widget_2`,
  margins: [40, 40],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "left"],
  child: DesktopWidget22()
});
var deerWidget = FWidget3();
var deerWidget2 = FWidget22();
globalThis.ShowDeerWidget = () => {
  deerWidget.visible = true;
  deerWidget2.visible = true;
};
globalThis.HideDeerWidget = () => {
  deerWidget.visible = false;
  deerWidget2.visible = false;
};
var DeerWidget_default = deerWidget;

// src/widgets/desktop/Golden.js
var iconImage3 = Widget.Icon({
  icon: `${settings_default.assets.wallpapers}/image.png`,
  size: 70,
  className: "my-wd-user-icon"
});
var weatherIcon3 = Widget.Label({
  label: "",
  className: "my-weather-wd-icon"
});
var RowOne4 = () => Widget.Box({
  className: "weather-wd-row-one small-shadow"
}).hook(WeatherService_default, (self) => {
  const tt = TitleText({
    title: "today",
    text: WeatherService_default.arValue,
    textClass: "my-weather-wd-text",
    boxClass: "my-weather-wd-title-text-box",
    titleXalign: 1,
    textXalign: 1
  });
  weatherIcon3.label = WeatherService_default.weatherCode;
  self.children = [weatherIcon3, tt, iconImage3];
});
var Insider3 = ({ icon, title, text }) => {
  const label = Widget.Label({
    label: icon,
    className: "my-weather-wd-day-icon"
  });
  return Widget.Box({
    className: "my-weather-wd-day-box",
    vertical: true,
    homogeneous: true,
    children: [
      label,
      TitleText({
        title,
        titleClass: "my-wd-weather-day-name",
        text,
        textClass: "my-wd-weather-day-text",
        boxClass: ""
      })
    ]
  });
};
var RowTwo4 = () => {
  return Widget.Box({
    className: "my-weather-wd-row-two small-shadow",
    spacing: 50,
    homogeneous: false
  }).hook(WeatherService_default, (self) => {
    self.children = [
      Insider3({
        icon: WeatherService_default.weatherCode1,
        title: "today",
        text: WeatherService_default.avgTempC1
      }),
      Insider3({
        icon: WeatherService_default.weatherCode2,
        title: "tomorrow",
        text: WeatherService_default.avgTempC2
      }),
      Insider3({
        icon: WeatherService_default.weatherCode3,
        title: "After tomorrow",
        text: WeatherService_default.avgTempC3
      })
    ];
  });
};
var DesktopWidget6 = () => Widget.Box({
  vertical: true,
  children: [
    RowOne4(),
    RowTwo4(),
    MusicPLayer_default("my-desktop-music-box small-shadow")
  ]
});
var DesktopWidget23 = () => Widget.Box({
  vertical: true,
  children: [FuzzyClock_default("my-fuzzy-clock-box small-shadow")]
});
var FWidget5 = () => Widget.Window({
  name: `desktop_golden_widget`,
  margins: [60, 60],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "left"],
  child: DesktopWidget6()
});
var FWidget23 = () => Widget.Window({
  name: `desktop_golden_widget_2`,
  margins: [60, 60],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "right"],
  child: DesktopWidget23()
});
var goldenWidget = FWidget5();
var goldenWidget2 = FWidget23();
globalThis.ShowGoldenWidget = () => {
  goldenWidget.visible = true;
  goldenWidget2.visible = true;
};
globalThis.HideGoldenWidget = () => {
  goldenWidget.visible = false;
  goldenWidget2.visible = false;
};
var Golden_default = goldenWidget;

// src/widgets/desktop/Harmony.js
var Mpris4 = await Service.import("mpris");
var DesktopWidget7 = Widget.Box({
  spacing: 18,
  homogeneous: false,
  vertical: true,
  children: [
    FuzzyClock_default(),
    Widget.Box({
      className: "desktop-wd-separator"
    }),
    Widget.Box({
      vertical: true,
      className: "desktop-wd-music-player-box",
      homogeneous: true,
      children: [
        Widget.Label({
          className: "desktop-wd-music-player-title",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        }),
        Widget.Label({
          className: "desktop-wd-music-player-artist",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        })
      ]
    }).hook(Mpris4, (box) => {
      if (Mpris4?.players.length > 0 && Mpris4?.getPlayer(selectedMusicPlayer)) {
        box.children[0].label = Mpris4?.getPlayer(selectedMusicPlayer)?.trackTitle;
        box.children[1].label = Mpris4?.getPlayer(selectedMusicPlayer)?.trackArtists[0];
      } else {
        box.children[0].label = "No music playing";
        box.children[1].label = "No music playing";
      }
    }),
    Widget.Box({
      className: "desktop-wd-separator",
      css: `
                margin-top: 0.5rem;
            `
    })
  ]
});
var FinalWidget2 = () => Widget.Window({
  name: `desktop_harmony_widget`,
  margins: [100, 100],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["bottom", "left"],
  child: DesktopWidget7
});
var harmonyWidget = FinalWidget2();
globalThis.ShowHarmonyWidget = () => harmonyWidget.visible = true;
globalThis.HideHarmonyWidget = () => harmonyWidget.visible = false;
var Harmony_default = harmonyWidget;

// src/widgets/desktop/MaterialYouOne.js
var iconImage4 = Widget.Icon({
  icon: `${settings_default.assets.wallpapers}/image.png`,
  size: 70,
  className: "my-wd-user-icon"
});
var weatherIcon4 = Widget.Label({
  label: "",
  className: "my-weather-wd-icon"
});
var RowOne5 = () => Widget.Box({
  className: "weather-wd-row-one small-shadow"
}).hook(WeatherService_default, (self) => {
  const tt = TitleText({
    title: "today",
    text: WeatherService_default.arValue,
    textClass: "my-weather-wd-text",
    boxClass: "my-weather-wd-title-text-box",
    titleXalign: 1,
    textXalign: 1
  });
  weatherIcon4.label = WeatherService_default.weatherCode;
  self.children = [weatherIcon4, tt, iconImage4];
});
var Insider4 = ({ icon, title, text }) => {
  const label = Widget.Label({
    label: icon,
    className: "my-weather-wd-day-icon"
  });
  return Widget.Box({
    className: "my-weather-wd-day-box",
    vertical: true,
    homogeneous: true,
    children: [
      label,
      TitleText({
        title,
        titleClass: "my-wd-weather-day-name",
        text,
        textClass: "my-wd-weather-day-text",
        boxClass: ""
      })
    ]
  });
};
var RowTwo5 = () => {
  return Widget.Box({
    className: "my-weather-wd-row-two small-shadow",
    spacing: 50,
    homogeneous: false
  }).hook(WeatherService_default, (self) => {
    self.children = [
      Insider4({
        icon: WeatherService_default.weatherCode1,
        title: "today",
        text: WeatherService_default.avgTempC1
      }),
      Insider4({
        icon: WeatherService_default.weatherCode2,
        title: "tomorrow",
        text: WeatherService_default.avgTempC2
      }),
      Insider4({
        icon: WeatherService_default.weatherCode3,
        title: "After tomorrow",
        text: WeatherService_default.avgTempC3
      })
    ];
  });
};
var DesktopWidget8 = () => Widget.Box({
  vertical: true,
  children: [
    RowOne5(),
    RowTwo5(),
    MusicPLayer_default("my-desktop-music-box small-shadow")
  ]
});
var DesktopWidget24 = () => Widget.Box({
  vertical: true,
  children: [FuzzyClock_default("my-fuzzy-clock-box small-shadow")]
});
var FWidget6 = () => Widget.Window({
  name: `desktop_material_you_widget`,
  margins: [60, 60],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "left"],
  child: DesktopWidget8()
});
var FWidget24 = () => Widget.Window({
  name: `desktop_material_you_widget_2`,
  margins: [60, 60],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "right"],
  child: DesktopWidget24()
});
var materialWidget = FWidget6();
var materialWidget2 = FWidget24();
globalThis.ShowMYWidget = () => {
  materialWidget.visible = true;
  materialWidget2.visible = true;
};
globalThis.HideMYWidget = () => {
  materialWidget.visible = false;
  materialWidget2.visible = false;
};
var MaterialYouOne_default = materialWidget;

// src/widgets/desktop/NewCat.js
var iconImage5 = Widget.Icon({
  icon: `${settings_default.assets.wallpapers}/image.png`,
  size: 70,
  className: "my-wd-user-icon"
});
var weatherIcon5 = Widget.Label({
  label: "",
  className: "my-weather-wd-icon"
});
var RowOne6 = () => Widget.Box({
  className: "weather-wd-row-one small-shadow"
}).hook(WeatherService_default, (self) => {
  const tt = TitleText({
    title: "today",
    text: WeatherService_default.arValue,
    textClass: "my-weather-wd-text",
    boxClass: "my-weather-wd-title-text-box",
    titleXalign: local === "RTL" ? 1 : 0,
    textXalign: local === "RTL" ? 1 : 0
  });
  weatherIcon5.label = WeatherService_default.weatherCode;
  self.children = [weatherIcon5, tt, iconImage5];
});
var Insider5 = ({ icon, title, text }) => {
  const label = Widget.Label({
    label: icon,
    className: "my-weather-wd-day-icon"
  });
  return Widget.Box({
    className: "my-weather-wd-day-box",
    vertical: true,
    homogeneous: true,
    children: [
      label,
      TitleText({
        title,
        titleClass: "my-wd-weather-day-name",
        text,
        textClass: "my-wd-weather-day-text",
        boxClass: ""
      })
    ]
  });
};
var RowTwo6 = () => {
  return Widget.Box({
    className: "my-weather-wd-row-two small-shadow",
    spacing: 55,
    homogeneous: false
  }).hook(WeatherService_default, (self) => {
    self.children = [
      Insider5({
        icon: WeatherService_default.weatherCode1,
        title: "today",
        text: WeatherService_default.avgTempC1
      }),
      Insider5({
        icon: WeatherService_default.weatherCode2,
        title: "tomorrow",
        text: WeatherService_default.avgTempC2
      }),
      Insider5({
        icon: WeatherService_default.weatherCode3,
        title: "After tomorrow",
        text: WeatherService_default.avgTempC3
      })
    ];
  });
};
var DesktopWidget9 = () => Widget.Box({
  vertical: true,
  children: [
    RowOne6(),
    RowTwo6(),
    MusicPLayer_default("my-desktop-music-box small-shadow")
  ]
});
var DesktopWidget25 = () => Widget.Box({
  vertical: true,
  children: [
    FuzzyClock_default("my-fuzzy-clock-box small-shadow")
  ]
});
var FWidget7 = () => Widget.Window({
  name: `desktop_new_cat_widget_widget`,
  margins: [50, 50],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["bottom", "right"],
  child: DesktopWidget9()
});
var FWidget25 = () => Widget.Window({
  name: `desktop_new_cat_widget_widget_2`,
  margins: [50, 50],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "left"],
  child: DesktopWidget25()
});
var newCatWidget = FWidget7();
var newCatWidget2 = FWidget25();
globalThis.ShowNewCatWidget = () => {
  newCatWidget.visible = true;
  newCatWidget2.visible = true;
};
globalThis.HideNewCatWidget = () => {
  newCatWidget.visible = false;
  newCatWidget2.visible = false;
};
var NewCat_default = newCatWidget;

// src/widgets/desktop/UnicatWidget.js
var Mpris5 = await Service.import("mpris");
var DesktopWidget10 = Widget.Box({
  spacing: 18,
  homogeneous: false,
  vertical: true,
  children: [
    FuzzyClock_default(),
    Widget.Box({
      className: "desktop-wd-separator"
    }),
    Widget.Box({
      vertical: true,
      className: "desktop-wd-music-player-box",
      homogeneous: true,
      children: [
        Widget.Label({
          className: "desktop-wd-music-player-title",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        }),
        Widget.Label({
          className: "desktop-wd-music-player-artist",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        })
      ]
    }).hook(Mpris5, (box) => {
      if (Mpris5?.players.length > 0 && Mpris5?.getPlayer(selectedMusicPlayer)) {
        box.children[0].label = Mpris5?.getPlayer(selectedMusicPlayer)?.trackTitle;
        box.children[1].label = Mpris5?.getPlayer(selectedMusicPlayer)?.trackArtists[0];
      } else {
        box.children[0].label = "No music playing";
        box.children[1].label = "No music playing";
      }
    }),
    Widget.Box({
      className: "desktop-wd-separator",
      css: `
                margin-top: 0.5rem;
            `
    })
  ]
});
var FinalWidget3 = () => Widget.Window({
  name: `desktop_unicat_widget`,
  margins: [100, 140],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "left"],
  child: DesktopWidget10
});
var unicatWidget = FinalWidget3();
globalThis.ShowUnicatWidget = () => unicatWidget.visible = true;
globalThis.HideUnicatWidget = () => unicatWidget.visible = false;
var UnicatWidget_default = unicatWidget;

// src/widgets/desktop/WhiteFlower.js
var Mpris6 = await Service.import("mpris");
var DesktopWidget11 = Widget.Box({
  spacing: 18,
  homogeneous: false,
  vertical: true,
  children: [
    FuzzyClock_default(),
    Widget.Box({
      className: "desktop-wd-separator"
    }),
    Widget.Box({
      vertical: true,
      className: "desktop-wd-music-player-box",
      homogeneous: true,
      children: [
        Widget.Label({
          className: "desktop-wd-music-player-title",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        }),
        Widget.Label({
          className: "desktop-wd-music-player-artist",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        })
      ]
    }).hook(Mpris6, (box) => {
      if (Mpris6?.players.length > 0 && Mpris6?.getPlayer(selectedMusicPlayer)) {
        box.children[0].label = Mpris6?.getPlayer(selectedMusicPlayer)?.trackTitle;
        box.children[1].label = Mpris6?.getPlayer(selectedMusicPlayer)?.trackArtists[0];
      } else {
        box.children[0].label = "No music playing";
        box.children[1].label = "No music playing";
      }
    }),
    Widget.Box({
      className: "desktop-wd-separator",
      css: `
                margin-top: 0.5rem;
            `
    })
  ]
});
var FinalWidget4 = () => Widget.Window({
  name: `desktop_white_flower_widget`,
  margins: [100, 100],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["bottom", "left"],
  child: DesktopWidget11
});
var desktopWidget = FinalWidget4();
globalThis.ShowWhiteFlower = () => desktopWidget.visible = true;
globalThis.HideWhiteFlower = () => desktopWidget.visible = false;
var WhiteFlower_default = desktopWidget;

// src/widgets/desktop/Win20Widget.js
var Mpris7 = await Service.import("mpris");
var DesktopWidget12 = Widget.Box({
  spacing: 18,
  homogeneous: false,
  vertical: true,
  children: [
    FuzzyClock_default(),
    Widget.Box({
      className: "desktop-wd-separator"
    }),
    Widget.Box({
      vertical: true,
      className: "desktop-wd-music-player-box",
      homogeneous: true,
      children: [
        Widget.Label({
          className: "desktop-wd-music-player-title",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        }),
        Widget.Label({
          className: "desktop-wd-music-player-artist",
          justification: "left",
          xalign: 1,
          maxWidthChars: 10,
          truncate: "end"
        })
      ]
    }).hook(Mpris7, (box) => {
      if (Mpris7?.players.length > 0 && Mpris7?.getPlayer(selectedMusicPlayer)) {
        box.children[0].label = Mpris7?.getPlayer(selectedMusicPlayer)?.trackTitle;
        box.children[1].label = Mpris7?.getPlayer(selectedMusicPlayer)?.trackArtists[0];
      } else {
        box.children[0].label = "No music playing";
        box.children[1].label = "No music playing";
      }
    }),
    Widget.Box({
      className: "desktop-wd-separator",
      css: `
                margin-top: 0.5rem;
            `
    })
  ]
});
var FinalWidget5 = () => Widget.Window({
  name: `desktop_win20_widget`,
  margins: [20, 0, 0, 80],
  layer: "background",
  visible: false,
  focusable: false,
  anchor: ["top", "left"],
  child: DesktopWidget12
});
var win20Widget = FinalWidget5();
globalThis.ShowWin20Widget = () => win20Widget.visible = true;
globalThis.HideWin20Widget = () => win20Widget.visible = false;
var Win20Widget_default = win20Widget;

// src/config.js
var scss = App4.configDir + "/scss/main.scss";
var css = App4.configDir + "/style.css";
Utils.exec(`sassc ${scss} ${css}`);
var windows = [
  VolumeOSD(),
  OSDNotifications_default(),
  NotificationCenter(),
  HardwareMenu(),
  WeatherMenu(),
  ColorsWidget_default,
  Win20Widget_default,
  MaterialYouOne_default,
  UnicatWidget_default,
  BlackHole_default,
  Golden_default,
  Harmony_default,
  NewCat_default,
  DeerWidget_default,
  Circles_default,
  WhiteFlower_default
];
var screens = JSON.parse(Utils.exec("hyprctl monitors all -j"));
for (let i = 0;i < screens.length; i++) {
  const screen = screens[i];
  windows.push(Bar({ monitor: screen.id }));
  const leftMene = LeftMenu({ monitor: screen.id });
  windows.push(leftMene);
}
var config_default = {
  css,
  cacheNotificationActions: true,
  windows
};
globalThis.getNot = () => Notifications4;
export {
  config_default as default
};
