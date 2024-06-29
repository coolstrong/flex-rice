import { useUpdatableVar } from "@/lib/hooks";
import { getVolumeIcon } from "@/utils/shared";
// import { systemTray } from "resource:///com/github/Aylur/ags/service/systemtray.js";

const { Gravity } = imports.gi.Gdk;
const Audio = await Service.import("audio");
// const SysTray = await Service.import("systemtray");

// function convertToH(bytes: number) {
//     let speed;
//     let dim;
//     let bits = Number(bytes) * 8;
//     bits = bits / 10;

//     if (bits < 1000) {
//         bits = 0;
//         speed = bits;
//         dim = "b/s";
//     } else if (bits < 1000000) {
//         speed = bits / 1000;
//         dim = "kb/s";
//     } else if (bits < 1000000000) {
//         speed = bits / 1000000;
//         dim = "mb/s";
//     } else if (bits < 1000000000000) {
//         speed = bits / 1000000000;
//         dim = "gb/s";
//     } else {
//         speed = bits;
//         dim = "b/s";
//     }

//     return Math.floor(speed + 0.5) + dim;
// }

const TIMEOUT = 300;

// const NetSpeedMeters = () => {
//     let prevReceivedBytes = 0;
//     let prevTransmittedBytes = 0;

//     return Box().poll(TIMEOUT, box => {
//         const receivedBytes = Number(
//             exec("cat /sys/class/net/wlp0s20f3/statistics/rx_bytes")
//         );
//         const transmittedBytes = Number(
//             exec("cat /sys/class/net/wlp0s20f3/statistics/tx_bytes")
//         );

//         const download = Label({
//             justification: "right",
//             css: "min-width: 60px",
//         });
//         const upload = Label({
//             justification: "right",
//             css: "min-width: 80px",
//         });

//         const downloadSpeed =
//             (receivedBytes - prevReceivedBytes) / (TIMEOUT / 1000);
//         const uploadSpeed =
//             (transmittedBytes - prevTransmittedBytes) / (TIMEOUT / 1000);

//         download.label = `${convertToH(downloadSpeed)} `;
//         upload.label = `${convertToH(uploadSpeed)} `;

//         prevReceivedBytes = receivedBytes;
//         prevTransmittedBytes = transmittedBytes;

//         box.children = [
//             download,
//             upload,
//             // Circular({progress:50})
//         ];

//         box.show_all();
//     });
// };

export const VolumeButton = () => {
    const icon = useUpdatableVar(() => getVolumeIcon(Audio.speaker));

    return Widget.Button({
        className: "volume-button",
        child: Widget.Icon({
            icon: icon.variable.bind(),
        }),

        setup: self =>
            self.hook(
                Audio.speaker,
                () =>
                    //for some reason is_muted property does not update in time
                    setTimeout(icon.update, 50),
                "changed",
            ),

        onClicked: () => Utils.execAsync("pypr toggle volume"),
        onSecondaryClick: () =>
            (Audio.speaker.is_muted = !Audio.speaker.is_muted),

        tooltipText: Audio.speaker
            .bind("volume")
            .as(v => `Volume: ${Math.round(v * 100)}%`),
    });
};

// const NetworkButton = () => {
//     // const label = Variable("󰤯");
//     // const nmTrayItem = systemTray.getItem("Network");
//     const nmTrayItem = useUpdatableVar(() =>
//         systemTray.items.find(item => item.title === "Network")
//     );

//     return Widget.Button({
//         className: "wifi-icon-strength unset",
//         child: Widget.Icon({
//             icon: nmTrayItem.variable.value?.bind("icon"),
//         }),
//         // child: Widget.Icon(nmTrayItem?.icon),
//         onPrimaryClick: (_, e) => nmTrayItem.variable.value?.openMenu(e),

//         // label: label.bind(),
//         // onPrimaryClick: self =>
//         //     SysTray.getItem(":1.424")?.menu?.popup_at_widget(
//         //         self,
//         //         Gravity.NORTH,
//         //         Gravity.SOUTH,
//         //         null
//         //     ),
//     }).hook(systemTray, nmTrayItem.update) /* .hook(
//         Network,
//         () =>
//             (label.value = match(Network)
//                 .with({ wifi: { internet: "disconnected" } }, () => "󰤮")
//                 .with({ connectivity: "limited" }, () => "󰤩")
//                 .with({ wifi: { strength: P.number.gt(85) } }, () => "󰤨")
//                 .with({ wifi: { strength: P.number.gt(70) } }, () => "󰤥")
//                 .with({ wifi: { strength: P.number.gt(50) } }, () => "󰤢")
//                 .with({ wifi: { strength: P.number.gt(20) } }, () => "󰤟")
//                 .otherwise(() => "󰤯"))
//     ) */;
// };

export const NetVolumeBox = () =>
    Widget.Box({
        className: "internet-box small-shadow unset",
        children: [/* NetworkButton(),  */ VolumeButton()],
    });
