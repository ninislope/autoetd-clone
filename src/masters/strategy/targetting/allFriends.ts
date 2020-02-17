import { strategyTargettingSource } from "../helper";
import { none } from "./filter";

export const allFriends = strategyTargettingSource(
    { select: "all", for: "friends" },
    none.definition,
)(() => ({
    name: "全ての味方に",
    calc: ({ battle, battler }) =>
        battle
            .lastField()
            .battlers(battler.type)
            .living(),
}));
