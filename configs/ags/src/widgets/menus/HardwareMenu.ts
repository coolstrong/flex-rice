// noinspection HtmlUnknownAttribute

import { local } from "@/utils/helpers";
import Gtk from "gi://Gtk";
import { Popup } from "./Popup";

const Battery = await Service.import("battery");

var menuIsOpen: boolean | null = null;
var cpuIsInitialized = false;
var ramIsInitialized = false;

var ramUsage = 0;
var cpuUsage = 0;

const cpuProgress = Widget.CircularProgress({
    className: "menu-cpu",
    child: Widget.Label({
        className: "menu-cpu-icon",
        label: "",
    }),
    startAt: 0,
    rounded: false,
}).poll(1000, (self) => {
    if (menuIsOpen) {
        Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/cpu.sh`)
            .then(parseFloat)
            .then((val) => {
                cpuProgress.value = val / 100;
                self.child.tooltipMarkup = `<span weight='bold'>CPU usage (${val}%)</span>`;
                cpuUsage = val;
            })
            .catch(print);
    }
});

const ramProgress = Widget.CircularProgress({
    className: "menu-ram",
    child: Widget.Label({
        className: "menu-ram-icon",
        label: "",
    }),
    startAt: 0,
    rounded: false,
}).poll(1000, (self) => {
    if (menuIsOpen) {
        Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/ram.sh`)
            .then(parseFloat)
            .then((val) => {
                self.value = val / 100;
                self.child.tooltipMarkup = `<span weight='bold'>RAM usage (${val}%)</span>`;
                ramUsage = val;
            })
            .catch(print);
    }
});

const batteryProgress = Widget.CircularProgress({
    className: "menu-battery",
    child: Widget.Label({
        className: "menu-battery-icon",
        label: "",
    }),
    startAt: 0,
    rounded: false,
}).hook(Battery, (self) => {
    const percentage = Battery.percent;
    self.value = percentage / 100;
    
    var label = "";

    if (Battery.charging) {
        if (percentage <= 55) {
            label = "󱊤";
        } else if (percentage <= 70) {
            label = "󱊥";
        } else if (percentage > 70) {
            label = "󱊦";
        }
        // self.child.label = "";
        self.child.class_name = "menu-battery-icon-charging";
    } else {
        if (percentage <= 55) {
            label = "󱊡";
        } else if (percentage <= 70) {
            label = "󱊢";
        } else if (percentage > 70) {
            label = "󱊣";
        }
        self.child.label = "";
        self.child.class_name = "menu-battery-icon";
    }
    
    self.child.label = label;

    self.child.tooltipMarkup = `<span weight='bold'>Battery percentage (${percentage}%)</span>`;
});

const tempProgress = Widget.CircularProgress({
    className: "menu-temp",
    child: Widget.Label({
        className: "menu-temp-icon",
        label: "",
    }),
    startAt: 0,
    rounded: false,
}).poll(30000, (self) => {
    Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/temp.sh`)
        .then((val) => {
            const temps = val.split("\n");
            let total = 0;
            for (let index = 0; index < temps.length; index++) {
                const element = temps[index].replace("+", "").replace("°C", "");
                total += parseInt(element);
            }
            total = total / temps.length;
            self.value = total / 100;

            self.child.tooltipMarkup = `<span weight='bold'>Total temperature of the devices (${total}%)</span>`;
        })
        .catch(print);
});

const headerBox = Widget.Box({
    className: "hardware-menu-header-box",
    spacing: 32,
    children: [cpuProgress, ramProgress, batteryProgress, tempProgress],
});

let tableRow = ({
    appName = "",
    percentage = "",
    header = false,
    deviceName,
    rightTextMaxWidthChars = 9,
    rightTextXalign = 0,
    leftTextMaxWidthChars = 5,
    leftTextXalign = 1,
}) =>
    Widget.Box({
        className: header
            ? `hardware-${deviceName}-table-row-header`
            : `hardware-${deviceName}-table-row`,
        // spacing: 0,
        children: [
            Widget.Label({
                className: header
                    ? "table-row-app-name-header"
                    : "table-row-app-name",
                label: appName,
                justification: "center",
                truncate: "end",
                xalign: rightTextXalign,
                maxWidthChars: rightTextMaxWidthChars,
                wrap: true,
                useMarkup: true,
            }),
            Widget.Label({
                className: header
                    ? "table-row-app-percentage-header"
                    : "table-row-app-percentage",
                label: percentage,
                justification: "center",
                truncate: "end",
                xalign: leftTextXalign,
                maxWidthChars: leftTextMaxWidthChars,
                wrap: true,
                useMarkup: true,
            }),
        ],
    });

const hardwareUsageTable = ({
    scriptPath,
    deviceName,
    interval = 2000,
    headerRightText = "Operation",
    headerLeftText = "%",
}) => {
    const table = Widget.Box({
        className: `hardware-${deviceName}-box`,
        vertical: true,
        children: [] as Gtk.Widget[],
    });

    if (scriptPath) {
        table.poll(interval, (self) => {
            if (deviceName === "cpu") {
                headerLeftText = `${cpuUsage}%`;
            }
            if (deviceName === "ram") {
                headerLeftText = `${ramUsage}%`;
            }

            // Calling only if menu is open
            if (!cpuIsInitialized || !ramIsInitialized || menuIsOpen) {
                Utils.execAsync(scriptPath)
                    .then((val) => {
                        let data = JSON.parse(val);
                        let children = [
                            tableRow({
                                appName: headerRightText,
                                percentage: headerLeftText,
                                header: true,
                                deviceName: deviceName,
                            }),
                        ];
                        for (let index = 0; index < data.length; index++) {
                            const element = data[index];
                            children.push(
                                tableRow({
                                    appName: element["process"],
                                    percentage: element["%"],
                                    deviceName: deviceName,
                                })
                            );
                        }
                        self.children = children;
                    })
                    .catch(print);
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

const tablesBox = () => {
    let batDeviceName = "bat";

    let batteryTable = hardwareUsageTable({
        scriptPath: "",
        deviceName: batDeviceName,
    }).hook(Battery, (self) => {
        Utils.execAsync(
            `/home/${Utils.USER}/.config/ags/scripts/hardware_info.sh`
        )
            .then((val) => {
                let data = JSON.parse(val);
                self.children = [
                    // Header
                    tableRow({
                        appName: "the battery",
                        percentage: "",
                        header: true,
                        deviceName: batDeviceName,
                        rightTextXalign: 1,
                    }),
                    // Body
                    tableRow({
                        appName: "The ratio  ",
                        percentage: `${Battery.percent}%`,
                        deviceName: batDeviceName,
                    }),
                    tableRow({
                        appName:
                            local === "RTL" ? "the health   " : "Health   ",
                        percentage: data["Capacity"] + "%",
                        deviceName: batDeviceName,
                    }),
                    tableRow({
                        appName: local === "RTL" ? "Voltages  " : "Voltage  ",
                        percentage: data["Voltage"],
                        deviceName: batDeviceName,
                    }),
                    tableRow({
                        appName: local === "RTL" ? "energy  " : "Energy  ",
                        percentage: `${Battery.energy}`,
                        deviceName: batDeviceName,
                    }),
                    tableRow({
                        appName: local === "RTL" ? "Courses  " : "Cycles  ",
                        percentage: data["Charge_Cycles"],
                        deviceName: batDeviceName,
                    }),
                ];
            })
            .catch(print);
    });

    let osClassName = "os";
    let tempTable = hardwareUsageTable({
        scriptPath: "",
        deviceName: osClassName,
    }).hook(Battery, (self) => {
        Utils.execAsync(`/home/${Utils.USER}/.config/ags/scripts/uptime.sh`)
            .then((val) => {
                // let data = JSON.parse(val);

                self.children = [
                    // Header
                    tableRow({
                        appName: "System",
                        percentage: "",
                        header: true,
                        rightTextXalign: 1,
                        deviceName: osClassName,
                    }),
                    // Body
                    tableRow({
                        appName: "Arch",
                        percentage: "",
                        deviceName: osClassName,
                    }),
                    tableRow({
                        appName: val,
                        percentage: "",
                        deviceName: osClassName,
                    }),
                    tableRow({
                        appName: "Ahmed",
                        percentage: "",
                        deviceName: osClassName,
                    }),
                ];
            })
            .catch(print);
    });

    return Widget.Box({
        className: "hardware-menu-tables-box",
        // vertical: true,
        spacing: 13,
        children: [
            hardwareUsageTable({
                scriptPath: `/home/${Utils.USER}/.config/ags/scripts/cpu_usage.sh`,
                deviceName: "cpu",
                headerRightText: "CPU",
                // headerLeftText: `${cpuUsage}`,
            }),
            hardwareUsageTable({
                scriptPath: `/home/${Utils.USER}/.config/ags/scripts/ram_usage.sh`,
                deviceName: "ram",
                headerRightText: "RAM",
                // headerLeftText: `${ramUsage}`,
                // interval: 5 * 60 * 1000,
            }),
            Widget.Box({
                vertical: true,
                children: [batteryTable, tempTable],
            }),
        ],
    });
};

export const HardwareMenu = () => Popup({
    className: "hardware-menu-box",
    name: "hardware_menu",
    anchor: ["bottom", "left"],
    transition: "slide_up",
    margins: [6, 250],
    child: Widget.Box({
        className: "left-menu-window",
        vertical: true,
        children: [headerBox, tablesBox()]
    })
})