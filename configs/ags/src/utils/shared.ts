import { icons } from "@/lib/icons";
import { P, match } from "ts-pattern";

export const getVolumeIcon = (volume: number) =>
    match(volume * 100)
        .with(P.number.lte(0), () => icons.audio.volume.muted)
        .with(P.number.between(0, 34), () => icons.audio.volume.low)
        .with(P.number.between(34, 67), () => icons.audio.volume.medium)
        .with(P.number.between(67, 100), () => icons.audio.volume.high)
        .with(P.number.gte(100), () => icons.audio.volume.overamplified)
        .otherwise(() => "");
