import { strategyTargettingSource } from "./helper";
import { chooseRandomIndexes } from "../../../util";
import { none } from "./filter";

export const randomSomeFriends = strategyTargettingSource(
    { select: "random", for: "friends" },
    none.definition,
)(({ maxCount }) => ({
    name: `ランダムな味方${maxCount}人に`,
    calc: ({ battle, actor }) => {
        const { type } = actor;
        const targets = battle
            .lastField()
            .battlers(type)
            .living();
        const indexes = chooseRandomIndexes(targets.length, maxCount);
        return indexes.map(index => targets[index]);
    },
}));
