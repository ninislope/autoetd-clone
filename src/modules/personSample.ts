import { Person, zeroActorEquipments, initialActorEquipmentLimits } from "../models";
import { zeroSize } from "../models/ActorSexualStatus/Size";
import { zeroSensitivity } from "../models/ActorSexualStatus/Sensitivity";
import { zeroResistance } from "../models/ActorSexualStatus/Resistance";
import { zeroBehavior } from "../models/ActorSexualStatus/Behavior";
import { zeroCommon } from "../models/ActorSexualStatus/Common";
import { zeroRub } from "../models/ActorSexualStatus/Rub";

export const personSample = (id: number, name: string): Person => ({
    id,
    characters: {
        normal: {
            type: "normal",
            name,
            exp: 1,
            battleStatus: {
                maxHp: 50,
                maxMp: 10,
                atk: 30,
                def: 10,
                mAtk: 10,
                mDef: 10,
                agi: 10,
                hit: 10,
                con: 100,
            },
            strategies: [
                {
                    condition: {
                        id: "always",
                    },
                    targetting: {
                        id: "randomSomeEnemies",
                    },
                    action: {
                        id: "attack",
                        targettingTypeIndex: 0,
                    },
                },
            ],
        },
    },
    currentCharactorType: "normal",
    variable: {
        hp: 50,
        mp: 10,
        ap: 0,
        ep: 0,
        rp: 0,
    },
    sexualStatus: {
        common: zeroCommon,
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
