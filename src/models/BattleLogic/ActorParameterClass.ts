import { immerable } from "immer";
import { ActorParameter } from "./ActorParameter";
import { BattleField } from "./BattleField";
import { ActorClass } from "./ActorClass";

export class ActorParameterClass implements ActorParameter {
    [immerable] = true;

    readonly type: "friends" | "enemies";

    readonly index: number;

    constructor(actor: ActorParameter) {
        this.type = actor.type;
        this.index = actor.index;
    }

    findActor(field: BattleField) {
        return new ActorClass({
            ...this,
            person: field[this.type][this.index],
        });
    }

    opponentType() {
        return this.type === "friends" ? "enemies" : "friends";
    }
}
