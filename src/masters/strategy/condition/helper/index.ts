import {
    StrategyOptionDefinitionSource,
    StrategyOptionDefinition,
    StrategyOptionValueDefinition,
    StrategyOptionValueWithLabel,
    StrategyOptionValueBase,
} from "../../../../models/BattleLogic/StrategyOptionDefinition";
import { StrategyConditionSource } from "../../../../models/BattleLogic/Strategy";

export function strategyConditionSource<
    Source extends StrategyConditionSource<
        OptionsDefinitionSource,
        OptionsDefinition,
        Definitions,
        Values,
        Value,
        Name
    >,
    OptionsDefinitionSource extends StrategyOptionDefinitionSource<OptionsDefinition, Definitions, Values, Value, Name>,
    OptionsDefinition extends StrategyOptionDefinition<Definitions, Values, Value, Name>,
    Definitions extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
>(optionsDefinition: Source["optionsDefinition"]) {
    return (value: Source["value"]) => ({ optionsDefinition, value });
}
