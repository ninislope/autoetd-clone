import { strategyTargettingSource } from "../helper";
import { chooseRandomIndexes } from "../../../util";
import { none } from "./filter";

export const randomSomeEnemies = strategyTargettingSource(
    { select: "random", for: "enemies" },
    none.definition,
)(({ maxCount }) => ({
    name: `ランダムな敵${maxCount}体に`,
    calc: ({ battle, battler }) => {
        const type = battler.opponentType();
        const targets = battle
            .lastField()
            .battlers(type)
            .living();
        const indexes = chooseRandomIndexes(targets.length, maxCount);
        return indexes.map(index => targets[index]);
    },
}));
