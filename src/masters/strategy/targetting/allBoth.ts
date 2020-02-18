import { strategyTargettingSource } from "./helper";
import { none } from "./filter";

export const allBoth = strategyTargettingSource(
    { select: "all", for: "both" },
    none.definition,
)(() => ({
    name: "全ての戦闘可能者に",
    calc: ({ battle }) => {
        const field = battle.lastField();
        return [...field.friendBattlers().living(), ...field.enemyBattlers().living()];
    },
}));
