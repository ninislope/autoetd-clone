import { StrategyCondition } from "../../../models";

export const always: StrategyCondition = {
    name: () => "常時",
    calc: () => () => true,
};
