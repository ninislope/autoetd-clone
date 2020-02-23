import { strategyTargettingSource } from "./helper";
import { chooseRandomIndexes } from "../../../util";
import { none } from "./filter";

export const self = strategyTargettingSource(
    { select: "selectable", for: "friends" },
    none.definition,
)(({ maxCount }) => ({
    name: maxCount === 1 ? "自分に" : `自分とランダムな味方${maxCount - 1}人に`,
    calc: ({ battle, actor }) => {
        const { type } = actor;
        const targets = battle
            .lastField()
            .battlers(type)
            .living()
            .filter(targetActor => targetActor.person.id !== actor.person.id);

        const indexes = chooseRandomIndexes(targets.length, maxCount - 1);
        return [actor, ...indexes.map(index => targets[index])];
    },
}));
