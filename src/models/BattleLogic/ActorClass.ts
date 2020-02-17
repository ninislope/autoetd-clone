import { immerable } from "immer";
import { Actor } from "./Actor";
import { PersonClass } from "../PersonClass";
import { asClass } from "../../util";

export class ActorClass implements Actor {
    [immerable] = true;

    readonly type: "friends" | "enemies";

    readonly index: number;

    readonly person: PersonClass;

    constructor(actor: Actor) {
        this.type = actor.type;
        this.index = actor.index;
        this.person = asClass(actor.person, PersonClass);
    }

    get effectivePerson() {
        // eslint-disable-next-line no-return-assign
        return this.person.asEffective;
    }

    opponentType() {
        return this.type === "friends" ? "enemies" : "friends";
    }
}
