import { StrategyTargettingType } from "../../../../models/BattleLogic/StrategyTargettingType";
import {
    StrategyOptionDefinitionSource,
    StrategyOptionDefinition,
    StrategyOptionValueDefinition,
    StrategyOptionValueWithLabel,
    StrategyOptionValueBase,
} from "../../../../models/BattleLogic/StrategyOptionDefinition";
import { StrategyTargettingSource } from "../../../../models/BattleLogic/Strategy";

export function strategyTargettingSource<
    Source extends StrategyTargettingSource<
        Targetting,
        OptionsDefinitionSource,
        OptionsDefinition,
        Definitions,
        Values,
        Value,
        Name
    >,
    Targetting extends StrategyTargettingType,
    OptionsDefinitionSource extends StrategyOptionDefinitionSource<OptionsDefinition, Definitions, Values, Value, Name>,
    OptionsDefinition extends StrategyOptionDefinition<Definitions, Values, Value, Name>,
    Definitions extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
>(type: Targetting, optionsDefinition: OptionsDefinitionSource) {
    return (value: Source["value"]) => ({
        optionsDefinition,
        type,
        value,
    });
}
