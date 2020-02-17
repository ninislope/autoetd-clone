import { immerable } from "immer";
import { ActorClass } from "./ActorClass";
import { extendsArray } from "../../util/extendsArray";

@extendsArray()
export class ActorsClass extends Array<ActorClass> {
    [immerable] = true;

    static readonly elementType = ActorClass;

    living() {
        return new ActorsClass(...this.filter(actor => actor.effectivePerson.living));
    }

    dead() {
        return new ActorsClass(...this.filter(actor => !actor.effectivePerson.living));
    }

    fastest() {
        return this.slice().sort((a, b) => b.effectivePerson.battleStatus.agi - a.effectivePerson.battleStatus.agi)[0];
    }
}
