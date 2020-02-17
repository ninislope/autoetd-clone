import { StateEffects } from "./StateEffects";
import { Equipment } from "./Equipment";
import { EquipmentId } from "./EquipmentId";
import { CharacterType } from "../CharacterType";
import { EquipmentPart } from "./ActorEquipments";

export class EquipmentClass implements Equipment {
    readonly id: EquipmentId;

    readonly name: string;

    readonly description: string;

    readonly parts: readonly EquipmentPart[][];

    readonly characterTypes?: readonly CharacterType[];

    readonly personIds?: readonly number[];

    readonly effects?: StateEffects;

    readonly before?: EquipmentId[];

    readonly after?: EquipmentId[];

    constructor(equipment: Equipment, id: EquipmentId) {
        this.id = id;
        this.name = equipment.name;
        this.description = equipment.description;
        this.parts = equipment.parts;
        this.characterTypes = equipment.characterTypes;
        this.personIds = equipment.personIds;
        this.effects = equipment.effects;
        this.before = equipment.before;
        this.after = equipment.after;
    }

    effect<Name extends keyof StateEffects>(name: Name): StateEffects[Name] {
        return (this.effects || {})[name];
    }
}
