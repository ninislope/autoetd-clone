import { strategyTargettingSource } from "../helper";
import { chooseRandomIndexes } from "../../../util";
import { none } from "./filter";

export const self = strategyTargettingSource(
    { select: "selectable", for: "friends" },
    none.definition,
)(({ maxCount }) => ({
    name: maxCount === 1 ? "自分に" : `自分とランダムな味方${maxCount - 1}人に`,
    calc: ({ battle, battler }) => {
        const { type } = battler;
        const targets = battle
            .lastField()
            .battlers(type)
            .living()
            .filter(actor => actor.person.id !== battler.person.id);

        const indexes = chooseRandomIndexes(targets.length, maxCount - 1);
        return [battler, ...indexes.map(index => targets[index])];
    },
}));
