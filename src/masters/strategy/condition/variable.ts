import { actorVariableMax } from "../../../models/actorVariableMax";
import { opBool } from "../../../util";
import { battleStatus } from "../optionsDefinition";
import { strategyConditionSource } from "./helper";

export const variable = strategyConditionSource(battleStatus)(({ variableKey, rate, op }) => ({
    calc: ({ battler }) =>
        opBool(
            battler.effectivePerson.variable[variableKey],
            op,
            (actorVariableMax(variableKey, battler.effectivePerson) * rate) / 100,
        ),
}));
