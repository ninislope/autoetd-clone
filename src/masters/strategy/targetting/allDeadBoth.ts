import { strategyTargettingSource } from "../helper";
import { none } from "./filter";

export const allDeadBoth = strategyTargettingSource(
    { select: "all-dead", for: "both" },
    none.definition,
)(() => ({
    name: "全ての戦闘不能者に",
    calc: ({ battle }) => {
        const field = battle.lastField();
        return [...field.friendBattlers().dead(), ...field.enemyBattlers().dead()];
    },
}));
