import { BattlerParameter } from "./BattlerParameter";
import { Person } from "../Person";

export interface Battler extends BattlerParameter {
    readonly person: Person;
}
