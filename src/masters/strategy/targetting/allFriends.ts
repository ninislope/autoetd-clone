import { StrategyTargetting } from "../../../models";

export const allFriends: StrategyTargetting = {
    name: () => `全ての味方に`,
    calc: () => (battle, battler) => {
        const { type } = battler;
        const targets = battle.lastField()[type].living();
        return targets.map((person, index) => ({
            type,
            index,
            person,
        }));
    },
};
