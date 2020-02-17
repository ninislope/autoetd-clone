import { equipmentParts, EquipmentPart } from "./ActorEquipments";

export type ActorEquipmentLimits = {
    [EID in EquipmentPart]: number;
};

export const zeroActorEquipmentLimits = equipmentParts.reduce(
    (aels, part) => ({ ...aels, [part]: 0 }),
    {} as ActorEquipmentLimits,
);

export const initialActorEquipmentLimits: ActorEquipmentLimits = {
    ...zeroActorEquipmentLimits,
    head: 1,
    neck: 1,
    wrist: 1,
    outer: 1,
    tops: 1,
    bra: 1,
    undershirt: 1,
    shorts: 1,
    bottoms: 1,
    shoes: 1,
    accessories: 3,
};
