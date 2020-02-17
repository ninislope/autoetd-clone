import { tHelper } from "../tHelper";
import { ElementOf } from "../util";

/** 行動属性 */
export const actionElements = [
    /** 無 */
    "none",
    /** 光 */
    "light",
    /** 闇 */
    "dark",
    /** 炎 */
    "flame",
    /** 水 */
    "water",
    /** 風 */
    "wind",
    /** 地 */
    "earth",
    /** 羞恥 */
    "shame",
    /** 快楽 */
    "pleasure",
    /** 奉仕 */
    "service",
    /** 被虐 */
    "masochism",
] as const;

export type ActionElement = ElementOf<typeof actionElements>;

export const actionElementT = tHelper<ActionElement>({
    ja: {
        none: "無",
        light: "光",
        dark: "闇",
        flame: "炎",
        water: "水",
        wind: "風",
        earth: "地",
        shame: "羞恥",
        pleasure: "快楽",
        service: "奉仕",
        masochism: "被虐",
    },
});
