import {
    StrategyOptionDefinition,
    StrategyOptionValueDefinition,
    StrategyOptionValueWithLabel,
} from "./StrategyOptionDefinition";

export function strategyOptionDefinitionT(
    strategyOptionDefinition: StrategyOptionDefinition<
        readonly StrategyOptionValueDefinition<readonly StrategyOptionValueWithLabel<any>[], any, string>[],
        any,
        any,
        any
    >,
    options: Record<string, any>,
) {
    const index = 0;
    const str = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (index % 2) {
            const def = strategyOptionDefinition.definition[(index - 1) / 2];
            if (!def) break;
            const value = options[def.name];
            const possibleValue = def.possibleValues.find(pv => pv.value === value);
            if (!possibleValue) throw new Error("invalid value for T!");
            str.push(possibleValue.label);
        } else {
            const term = strategyOptionDefinition.terms[index / 2];
            if (!term) break;
            str.push(term);
        }
    }
    return str.join("");
}
