const Battery = await Service.import("battery");

export const batteryReaction = () => {
    let isCritical = false;

    return {
        object: Battery,
        signal: "notify::percent",
        callback: () => {
            if (Battery.percent <= 10 && !isCritical) {
                Utils.execAsync([
                    `notify-send -u critical -i "battery-010" -t 10000`,
                    `"Battery low"`,
                    `"Battery is at critical level (10%). Connect laptop to charger."`,
                ]).then(() => (isCritical = true));
            } else if (Battery.percent > 10 && isCritical) {
                isCritical = false;
            }
        },
    };
};

// notify-send -u critical -i "battery-010" -t 10000 "Battery low" "Battery is at critical level (10%). Connect laptop to charger."
