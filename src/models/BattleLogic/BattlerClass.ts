import { immerable } from "immer";
import { BattlerParameterClass } from "./BattlerParameterClass";
import { Battler } from "./Battler";
import { PersonClass } from "../PersonClass";

export class BattlerClass extends BattlerParameterClass implements Battler {
    [immerable] = true;

    readonly person: PersonClass;

    constructor(battler: Battler) {
        super(battler);
        this.person = battler.person instanceof PersonClass ? battler.person : new PersonClass(battler.person);
    }
}
