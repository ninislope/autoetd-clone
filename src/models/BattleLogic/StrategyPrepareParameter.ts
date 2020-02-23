import { BattleClass } from "./BattleClass";
import { StateEffectParameter } from "./StateEffectParameter";

export interface StrategyPrepareParameter extends StateEffectParameter {
    battle: BattleClass;
    turn: number;
}
