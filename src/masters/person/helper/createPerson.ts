import { Person } from "../../../models/Person";
import { zeroSize } from "../../../models/ActorSexualStatus/Size";
import { zeroSensitivity } from "../../../models/ActorSexualStatus/Sensitivity";
import { zeroResistance } from "../../../models/ActorSexualStatus/Resistance";
import { zeroBehavior } from "../../../models/ActorSexualStatus/Behavior";
import { zeroRub } from "../../../models/ActorSexualStatus/Rub";
import { zeroActorBattleStatus } from "../../../models/ActorBattleStatus";
import { zeroActorVariable } from "../../../models/ActorVariable";
import { initialActorEquipmentLimits } from "../../../models/StateLogic/ActorEquipmentLimits";
import { zeroActorEquipments } from "../../../models/StateLogic/ActorEquipments";

export const createPerson = (id: number, name: string): Person => ({
    id,
    characters: {
        normal: {
            type: "normal",
            name,
            exp: 1,
            battleStatus: zeroActorBattleStatus,
            strategies: [],
        },
    },
    currentCharactorType: "normal",
    variable: zeroActorVariable,
    sexualStatus: {
        common: { maxAp: 0, maxEp: 10000 },
        behavior: zeroBehavior,
        resistance: zeroResistance,
        sensitivity: zeroSensitivity,
        size: zeroSize,
        rub: zeroRub,
    },
    stateLevels: {},
    equipmentLimits: initialActorEquipmentLimits,
    equipments: zeroActorEquipments,
});
