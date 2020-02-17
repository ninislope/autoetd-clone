import { ItemId } from "./ItemId";
import { EquipmentId } from "./EquipmentId";

export type Owned = OwnedItem | OwnedEquipment;

export type OwnedId = string; // uuid

export interface OwnedBase {
    id: OwnedId;
    /** 呪われている */
    cursed?: boolean;
    /** 捨てることができない */
    permanent?: boolean;
}

export interface OwnedItem extends OwnedBase {
    type: "items";
    contentId: ItemId;
}

export function isOwnedItem(owned: Owned): owned is OwnedItem {
    return owned.type === "items";
}

export interface OwnedEquipment extends OwnedBase {
    type: "equipments";
    contentId: EquipmentId;
}

export function isOwnedEquipment(owned: Owned): owned is OwnedEquipment {
    return owned.type === "equipments";
}
