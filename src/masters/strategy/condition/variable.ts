import { StrategyCondition, ActorVariableKey, actorVariableMax } from "../../../models";
import { Operator, opBool, opJa } from "../../../util";

export const variable: StrategyCondition<[ActorVariableKey, Operator, number]> = {
    name: (variableKey, op, rate) => `${variableKey.toUpperCase()}が${rate}%${opJa[op]}なら`,
    calc: (variableKey, op, rate) => (_battle, battler) =>
        opBool(battler.person.variable[variableKey], op, (actorVariableMax(variableKey, battler.person) * rate) / 100),
};
