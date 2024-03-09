import { Box } from "resource:///com/github/Aylur/ags/widget.js";
import { BatteryWidget } from "./battery.ts";
import { CpuWidget } from "./cpu.ts";
import { RamWidget } from "./ram.ts";
import { TempWidget } from "./temp.ts";

export const HardwareBox = () =>
    Box({
        className: "hardware-box unset",
        children: [CpuWidget(), RamWidget(), BatteryWidget(), TempWidget()],
    });

export const showHardwareMenu = () => App.toggleWindow("hardware_menu");
