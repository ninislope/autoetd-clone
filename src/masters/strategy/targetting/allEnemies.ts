import { StrategyTargetting } from "../../../models";

export const allEnemies: StrategyTargetting = {
    name: () => `全ての敵に`,
    calc: () => (battle, battler) => {
        const type = battler.opponentType();
        const targets = battle.lastField()[type].living();
        return targets.map((person, index) => ({
            type,
            index,
            person,
        }));
    },
};
