import { actorVariableKeys, actorVariableKeyT } from "../../../../models/ActorVariable";
import { opSort, sortOperators, sortOperatorT } from "../../../../util";
import { targettingFilter } from "./TargettingFilter";

export const battleStatus = targettingFilter(() => {
    return {
        name: "戦闘中ステータス",
        definition: [
            {
                possibleValues: actorVariableKeys.map(value => ({ value, label: actorVariableKeyT(value) })),
                name: "variableKey",
                label: "戦闘中ステータス",
            },
            {
                possibleValues: sortOperators.map(value => ({ value, label: sortOperatorT(value) })),
                name: "op",
                label: "演算子",
            },
        ] as const,
        terms: ["", "が", ""],
    };
})(({ variableKey, op }) => actors => actors.slice().sort(opSort(op, actor => actor.person.variable[variableKey])));
