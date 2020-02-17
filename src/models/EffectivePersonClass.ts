import { immerable } from "immer";
import { PersonBaseClass } from "./PersonBaseClass";

export class EffectivePersonClass extends PersonBaseClass {
    [immerable] = true;

    // eslint-disable-next-line class-methods-use-this
    get isEffective(): true {
        return true;
    }
}
