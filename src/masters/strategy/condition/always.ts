import { strategyConditionSource } from "../helper";
import { empty } from "../optionsDefinition";

export const always = strategyConditionSource(empty)(() => ({
    calc: () => true,
}));
