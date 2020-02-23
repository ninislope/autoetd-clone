import produce from "immer";
import { ActorBattleStatus } from "../../../models/ActorBattleStatus";
import { Sensitivity, zeroSensitivity } from "../../../models/ActorSexualStatus/Sensitivity";

export const commonBattleStatus: ActorBattleStatus = {
    maxHp: 50,
    maxMp: 10,
    atk: 30,
    def: 10,
    mAtk: 10,
    mDef: 10,
    agi: 150,
    hit: 10,
    con: 100,
};

export const commonSensitivity: Sensitivity = produce(zeroSensitivity, s => {
    s.bust = 100;
    s.nipple = 200;
    s.clitoris = 300;
    s.vagina = 50;
});
