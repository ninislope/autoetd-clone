import { DungeonActionResultContent } from "./DungeonActionResult";
import { StrategyConditionId } from "./StrategyConditionId";
import { StrategyTargettingId } from "./StrategyTargettingId";
import { StrategyActionId } from "./StrategyActionId";
import { condition, targetting } from "../../masters/strategy";
import { AllStrategyTargettingType, StrategyTargettingType } from "./StrategyTargettingType";
import { StrategyPrepareParameter } from "./StrategyPrepareParameter";
import { StrategyAimedParameter } from "./StrategyAimedParameter";
import { ActionElement } from "../ActionElement";
import { ActorVariable } from "../ActorVariable";
import {
    StrategyTargettingTypeWithCount,
    LimitedStrategyTargettingTypeWithCount,
} from "./StrategyTargettingTypeWithCount";
import {
    StrategyOptionDefinitionSource,
    StrategyOptionDefinition,
    StrategyOptionValueDefinition,
    StrategyOptionValueWithLabel,
    StrategyOptionValueBase,
    StrategyOptionTypeFromDefinition,
} from "./StrategyOptionDefinition";
import { Exercises } from "../exerciseResponse";
import { ActorParameter } from "./ActorParameter";

export type StrategyConditionOptions<Id extends StrategyConditionId> = StrategyOptionTypeFromDefinition<
    ReturnType<typeof condition[Id]["optionsDefinition"]>["definition"]
>;

export interface StrategyConditionParameter<Id extends StrategyConditionId> {
    id: Id;
    options?: StrategyConditionOptions<Id>;
}

export type StrategyTargettingOptions<Id extends StrategyTargettingId> = StrategyOptionTypeFromDefinition<
    ReturnType<typeof targetting[Id]["optionsDefinition"]>["definition"]
>;

export interface StrategyTargettingParameter<Id extends StrategyTargettingId> {
    id: Id;
    options?: StrategyTargettingOptions<Id>;
}

export interface StrategyActionParameter<Id extends StrategyActionId> {
    id: Id;
    targettingTypeIndex: number;
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

export interface FixedStrategy {
    source: Strategy;
    condition: StrategyCondition;
    targetting: StrategyTargetting;
    action: StrategyAction;
}

export interface StrategyConditionSource<
    OptionsDefinitionSource extends StrategyOptionDefinitionSource<OptionsDefinition, Definitions, Values, Value, Name>,
    OptionsDefinition extends StrategyOptionDefinition<Definitions, Values, Value, Name>,
    Definitions extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
> {
    optionsDefinition: OptionsDefinitionSource;
    value(
        options: StrategyOptionTypeFromDefinition<ReturnType<OptionsDefinitionSource>["definition"]>,
    ): StrategyCondition;
}

export interface StrategyCondition {
    calc: (param: StrategyPrepareParameter) => boolean;
    name?: string;
}

type StrategyTargettingWithCountMap<
    Targetting extends StrategyTargettingType
> = Targetting extends AllStrategyTargettingType ? AllStrategyTargettingType : LimitedStrategyTargettingTypeWithCount;

export interface StrategyTargettingSource<
    Targetting extends StrategyTargettingType,
    OptionsDefinitionSource extends StrategyOptionDefinitionSource<OptionsDefinition, Definitions, Values, Value, Name>,
    OptionsDefinition extends StrategyOptionDefinition<Definitions, Values, Value, Name>,
    Definitions extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
> {
    type: Targetting;
    optionsDefinition: OptionsDefinitionSource;
    value(
        targettingType: StrategyTargettingWithCountMap<Targetting>,
        options: StrategyOptionTypeFromDefinition<ReturnType<OptionsDefinitionSource>["definition"]>,
    ): StrategyTargetting;
}

export interface StrategyTargetting {
    calc: (param: StrategyPrepareParameter) => ActorParameter[];
    name: string;
    caution?: string;
}

export interface StrategyAction {
    calc: (param: StrategyAimedParameter) => DungeonActionResultContent[];
    name: string;
    description: string;
    targettingTypes: readonly StrategyTargettingTypeWithCount[];
    /** コスト */
    cost: Partial<ActorVariable>;
    /** 属性 */
    elements: readonly ActionElement[];
    /** 運動強度 */
    exercises: Exercises;
    /** 運動する部位 */
    // 部位指定面倒なので強度のみでやる。部位毎に強度への反応性を定義する。
    // exerciseParts: PartId[];
    /** 予備動作の運動強度 */
    preExercise: Exercises;
    /** 予備動作で運動する部位 */
    // preExerciseParts: PartId[];
}
