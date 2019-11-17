import { Person } from "../models";
import { zeroSize } from "../models/ActorSexualStatus/Size";
import { zeroSenzitivity } from "../models/ActorSexualStatus/Sensitivity";
import { zeroResistance } from "../models/ActorSexualStatus/Resistance";
import { zeroBehavior } from "../models/ActorSexualStatus/Behavior";
import { zeroCommon } from "../models/ActorSexualStatus/Common";

export const personSample = (id: number, name: string): Person => ({
    id,
    characters: {
        normal: {
            type: "normal",
            name,
            exp: 1,
            battleStatus: {
                maxHp: 100,
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
                    },
                },
            ],
        },
    },
    currentCharactorType: "normal",
    variable: {
        hp: 100,
        mp: 10,
        ap: 0,
        ep: 0,
        rp: 0,
    },
    sexualStatus: {
        common: zeroCommon,
        behavior: zeroBehavior,
        resistance: zeroResistance,
        sensitivity: zeroSenzitivity,
        size: zeroSize,
    },
    states: {},
});
