import { StrategyTargetting } from "../../../models";
import { chooseRandomIndexes } from "../../../util";

export const randomSomeEnemies: StrategyTargetting<[number]> = {
    name: (count = 1) => `ランダムな敵${count}体に`,
    calc: (count = 1) => (battle, battler) => {
        const type = battler.opponentType();
        const targets = battle.lastField()[type].living();
        const indexes = chooseRandomIndexes(targets.length, count);
        return indexes.map(index => ({
            type,
            index,
            person: targets[index],
        }));
    },
};
