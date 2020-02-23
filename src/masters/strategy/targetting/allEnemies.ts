import { strategyTargettingSource } from "./helper";
import { none } from "./filter";

export const allEnemies = strategyTargettingSource(
    { select: "all", for: "enemies" },
    none.definition,
)(() => ({
    name: "全ての敵に",
    calc: ({ battle, actor }) =>
        battle
            .lastField()
            .battlers(actor.opponentType())
            .living(),
}));
