import { strategyOptionDefinitionT } from "../../../models/BattleLogic/strategyOptionDefinitionT";
import { chooseRandomIndexes } from "../../../util";
import { battleStatus } from "./filter";
import { strategyTargettingSource } from "../helper";

export const selectableEnemies = strategyTargettingSource(
    { select: "selectable", for: "enemies" },
    battleStatus.definition,
)(({ maxCount }, options) => ({
    name: `${strategyOptionDefinitionT(battleStatus.definition(), options)} 敵${maxCount}体に`,
    calc: ({ battle, battler }) => {
        const type = battler.opponentType();
        const targets = battleStatus.filter(options)(
            battle
                .lastField()
                .battlers(type)
                .living(),
        );
        const indexes = chooseRandomIndexes(targets.length, maxCount);
        return indexes.map(index => targets[index]);
    },
}));
