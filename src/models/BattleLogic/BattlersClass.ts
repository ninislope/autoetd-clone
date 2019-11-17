import { immerable } from "immer";
import { BattlerClass } from "./BattlerClass";

export class BattlersClass extends Array<BattlerClass> {
    [immerable] = true;

    living() {
        return new BattlersClass(...this.filter(battler => battler.person.living));
    }

    fastest() {
        return this.slice().sort((a, b) => b.person.battleStatus.agi - a.person.battleStatus.agi)[0];
    }
}
