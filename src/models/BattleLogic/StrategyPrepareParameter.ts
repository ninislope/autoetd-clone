import { BattleClass } from "./BattleClass";
import { ActorParameter } from "./ActorParameter";
import { BattleFieldClass } from "./BattleFieldClass";

export interface StrategyPrepareParameter {
    battle: BattleClass;
    lastField: BattleFieldClass;
    actorParameter: ActorParameter;
    turn: number;
}
