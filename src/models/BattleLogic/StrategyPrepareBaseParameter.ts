import { BattleClass } from "./BattleClass";
import { ActorParameter } from "./ActorParameter";

export interface StrategyPrepareBaseParameter {
    battle: BattleClass;
    battler: ActorParameter;
    turn: number;
}
