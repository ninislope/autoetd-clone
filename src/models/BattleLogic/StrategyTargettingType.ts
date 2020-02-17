export type StrategyTargettingType = LimitedStrategyTargettingType | AllStrategyTargettingType;

export interface StrategyTargettingTypeBase<Select extends string> {
    select: Select;
    for: "friends" | "enemies" | "both";
}

export interface LimitedStrategyTargettingType
    extends StrategyTargettingTypeBase<"selectable" | "selectable-dead" | "random" | "random-dead"> {}

export interface AllStrategyTargettingType extends StrategyTargettingTypeBase<"all" | "all-dead"> {}
