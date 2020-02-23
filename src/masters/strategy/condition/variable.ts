import { actorVariableMax } from "../../../models/actorVariableMax";
import { opBool } from "../../../util";
import { battleStatus } from "../optionsDefinition";
import { strategyConditionSource } from "./helper";

export const variable = strategyConditionSource(battleStatus)(({ variableKey, rate, op }) => ({
    calc: ({ actor }) =>
        opBool(
            actor.effectivePerson.variable[variableKey],
            op,
            (actorVariableMax(variableKey, actor.effectivePerson) * rate) / 100,
        ),
}));
