import { actorVariableKeys, actorVariableKeyT } from "../../../models/ActorVariable";
import { boolOperators, boolOperatorT } from "../../../util";
import { strategyOptionDefinitionSource } from "./helper";

export const battleStatus = strategyOptionDefinitionSource(() => {
    return {
        name: "戦闘中ステータス",
        definition: [
            {
                possibleValues: actorVariableKeys.map(value => ({ value, label: actorVariableKeyT(value) })),
                name: "variableKey",
                label: "戦闘中ステータス",
            },
            {
                possibleValues: ([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const).map(value => ({
                    value,
                    label: value.toString(),
                })),
                name: "rate",
                label: "値",
            },
            {
                possibleValues: boolOperators.map(value => ({ value, label: boolOperatorT(value) })),
                name: "op",
                label: "演算子",
            },
        ] as const,
        terms: ["", "が", "%", "ならば"],
    };
});
