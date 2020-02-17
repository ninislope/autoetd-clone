import { HasEffect } from "./HasEffect";
import { EquipmentId } from "./EquipmentId";
import { CharacterType } from "../CharacterType";
import { EquipmentPart } from "./ActorEquipments";

export interface Equipment extends HasEffect<EquipmentId> {
    readonly name: string;
    readonly description: string;
    readonly parts: readonly EquipmentPart[][];
    /** 特定の人物形態にしか装備しない */
    readonly characterTypes?: readonly CharacterType[];
    /** 特定の人物にしか装備しない */
    readonly personIds?: readonly number[];
}
