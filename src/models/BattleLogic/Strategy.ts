import { BattleClass } from "./BattleClass";
import { DungeonActionResultContent } from "./DungeonActionResult";
import { BattlerClass } from "./BattlerClass";
import { Battler } from "./Battler";
import { StrategyConditionId } from "./StrategyConditionId";
import { StrategyTargettingId } from "./StrategyTargettingId";
import { StrategyActionId } from "./StrategyActionId";
import { targetting, action, condition } from "../../masters/strategy";
import { BattlersClass } from "./BattlersClass";

export type StrategyConditionOptions<Id extends StrategyConditionId> = Parameters<(typeof condition)[Id]["calc"]>;

export interface StrategyConditionParameter<Id extends StrategyConditionId> {
    id: Id;
    options?: StrategyConditionOptions<Id>;
}

export type StrategyTargettingOptions<Id extends StrategyTargettingId> = Parameters<(typeof targetting)[Id]["calc"]>;

export interface StrategyTargettingParameter<Id extends StrategyTargettingId> {
    id: Id;
    options?: StrategyTargettingOptions<Id>;
}

export type StrategyActionOptions<Id extends StrategyActionId> = Parameters<(typeof action)[Id]["calc"]>;

export interface StrategyActionParameter<Id extends StrategyActionId> {
    id: Id;
    options?: StrategyActionOptions<Id>;
}

export interface Strategy<
    CId extends StrategyConditionId = StrategyConditionId,
    TId extends StrategyTargettingId = StrategyTargettingId,
    AId extends StrategyActionId = StrategyActionId
> {
    condition: StrategyConditionParameter<CId>;
    targetting: StrategyTargettingParameter<TId>;
    action: StrategyActionParameter<AId>;
}

export interface StrategyCondition<T extends any[] = []> {
    calc: (...options: T) => (battle: BattleClass, battler: BattlerClass, turn: number) => boolean;
    name: (...options: T) => string;
}

export interface StrategyTargetting<T extends any[] = []> {
    calc: (...options: T) => (battle: BattleClass, battler: BattlerClass, turn: number) => Battler[];
    name: (...options: T) => string;
}

export interface StrategyAction<T extends any[] = []> {
    calc: (
        ...options: T
    ) => (
        battle: BattleClass,
        battler: BattlerClass,
        targets: BattlersClass,
        turn: number,
    ) => DungeonActionResultContent[];
    name: (...options: T) => string;
}
