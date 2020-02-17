import { AllStrategyTargettingType, LimitedStrategyTargettingType } from "./StrategyTargettingType";

export type StrategyTargettingTypeWithCount = LimitedStrategyTargettingTypeWithCount | AllStrategyTargettingType;

export interface LimitedStrategyTargettingTypeWithCount extends LimitedStrategyTargettingType {
    maxCount: number;
}
