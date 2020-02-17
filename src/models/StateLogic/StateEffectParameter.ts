import { BattleFieldClass, BattleClass } from "../BattleLogic";

export interface StateEffectParameter {
    readonly field: BattleFieldClass;
    // readonly dungeonId: number;
    // readonly dungeonFloor: number;
    // readonly dungeonTurn: number;
    readonly battle?: BattleClass;
}
