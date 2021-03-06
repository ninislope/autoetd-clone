import { strategyTargettingSource } from "./helper";
import { none } from "./filter";

export const allDeadFriends = strategyTargettingSource(
    { select: "all-dead", for: "friends" },
    none.definition,
)(() => ({
    name: "全ての味方戦闘不能者に",
    calc: ({ battle, actor }) =>
        battle
            .lastField()
            .battlers(actor.type)
            .dead(),
}));
