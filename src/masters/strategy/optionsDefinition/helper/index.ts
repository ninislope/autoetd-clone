import {
    StrategyOptionDefinitionSource,
    StrategyOptionDefinition,
    StrategyOptionValueDefinition,
    StrategyOptionValueWithLabel,
    StrategyOptionValueBase,
} from "../../../../models/BattleLogic/StrategyOptionDefinition";

/** 戦略オプション定義ソース */
export function strategyOptionDefinitionSource<
    OptionsDefinitionSource extends StrategyOptionDefinitionSource<OptionsDefinition, Definitions, Values, Value, Name>,
    OptionsDefinition extends StrategyOptionDefinition<Definitions, Values, Value, Name>,
    Definitions extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
>(def: OptionsDefinitionSource) {
    return def;
}

/** 戦略オプション定義 */
export function strategyOptionDefinition<
    OptionsDefinition extends StrategyOptionDefinition<Definitions, Values, Value, Name>,
    Definitions extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
>(optionsDefinition: OptionsDefinition) {
    return optionsDefinition;
}

/** 単一戦略オプション定義 */
export function strategyOptionValueDefinition<
    Def extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
>(def: Def) {
    return def;
}
