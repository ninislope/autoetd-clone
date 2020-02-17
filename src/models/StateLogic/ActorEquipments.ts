import { PartId } from "../PartId";
import { array, allKeys } from "../../util";
import { sensitivityKeys, sensitivityKeyT } from "../ActorSexualStatus/Sensitivity";
import { tHelper } from "../../tHelper";
import { OwnedId } from "./Owned";

export interface ActorEquipments extends ActorPartEquipments, ActorBasicEquipments {}

export type EquipmentPart = keyof ActorEquipments;

export interface ActorBasicEquipments {
    /** 頭 */
    readonly head: readonly OwnedId[];
    /** 首 */
    readonly neck: readonly OwnedId[];
    /** 手首 */
    readonly wrist: readonly OwnedId[];
    /** アウター */
    readonly outer: readonly OwnedId[];
    /** トップス */
    readonly tops: readonly OwnedId[];
    /** ブラジャー */
    readonly bra: readonly OwnedId[];
    /** 下着（上） */
    readonly undershirt: readonly OwnedId[];
    /** 下着（下） */
    readonly shorts: readonly OwnedId[];
    /** ボトムス */
    readonly bottoms: readonly OwnedId[];
    /** 靴 */
    readonly shoes: readonly OwnedId[];
    /** アクセサリー */
    readonly accessories: readonly OwnedId[];
}

export type ActorBasicEquipmentsKey = keyof ActorBasicEquipments;

export const actorBasicEquipmentsKeys = array(
    allKeys<ActorBasicEquipmentsKey>()([
        "head",
        "neck",
        "wrist",
        "outer",
        "tops",
        "bra",
        "undershirt",
        "shorts",
        "bottoms",
        "shoes",
        "accessories",
    ]),
);

export const actorBasicEquipmentsKeyT = tHelper<ActorBasicEquipmentsKey>({
    ja: {
        head: "頭",
        neck: "首",
        wrist: "手首",
        outer: "アウター",
        tops: "トップス",
        bra: "ブラジャー",
        undershirt: "下着（上）",
        shorts: "下着（下）",
        bottoms: "ボトムス",
        shoes: "靴",
        accessories: "アクセサリー",
    },
});

export type ActorPartEquipments = {
    readonly [PID in PartId]: readonly OwnedId[];
};

type ActorPartEquipmentKey = keyof ActorPartEquipments;

const actorPartEquipmentsKeys = sensitivityKeys;

export const equipmentParts: EquipmentPart[] = array(
    allKeys<EquipmentPart>()([...actorBasicEquipmentsKeys, ...actorPartEquipmentsKeys]),
);

export const equipmentPartT = (equipmentPart: EquipmentPart) =>
    actorBasicEquipmentsKeyT(equipmentPart as ActorBasicEquipmentsKey) ||
    sensitivityKeyT(equipmentPart as ActorPartEquipmentKey);

export const zeroActorEquipments = equipmentParts.reduce(
    (aes, part) => ({ ...aes, [part]: [] }),
    {} as ActorEquipments,
);
