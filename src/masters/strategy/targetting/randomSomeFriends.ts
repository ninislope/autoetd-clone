import { StrategyTargetting } from "../../../models";
import { chooseRandomIndexes } from "../../../util";

export const randomSomeFriends: StrategyTargetting<[number]> = {
    name: (count = 1) => `ランダムな味方${count}人に`,
    calc: (count = 1) => (battle, battler) => {
        const { type } = battler;
        const targets = battle.lastField()[type].living();
        const indexes = chooseRandomIndexes(targets.length, count);
        return indexes.map(index => ({
            type,
            index,
            person: targets[index],
        }));
    },
};
