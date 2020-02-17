import { Character } from "./Character";
import { CharacterType } from "./CharacterType";
import { ActorVariable } from "./ActorVariable";
import { ActorSexualStatus } from "./ActorSexualStatus";
import { ActorStateLevels } from "./StateLogic";
import { ActorEquipments } from "./StateLogic/ActorEquipments";
import { ActorEquipmentLimits } from "./StateLogic/ActorEquipmentLimits";

export interface Person {
    readonly id: number;
    readonly characters: { [type in CharacterType]?: Character<type> } & {
        normal: Character<"normal">;
    };
    readonly currentCharactorType: CharacterType;
    readonly variable: ActorVariable;
    readonly sexualStatus: ActorSexualStatus;
    readonly stateLevels: ActorStateLevels;
    readonly equipments: ActorEquipments;
    readonly equipmentLimits: ActorEquipmentLimits;
}
