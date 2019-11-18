import { Person } from "../Person";
import { BattleFieldClass } from "../BattleLogic";
import { ActionEffectResult } from "./ActionEffectResult";
import { PersonClass } from "../PersonClass";

export interface StateEffects {
    readonly active?: (field: BattleFieldClass) => ActionEffectResult;
    readonly passive?: (person: PersonClass) => Person;
    readonly battleStart?: (field: BattleFieldClass) => ActionEffectResult;
    // attackする情報全てをまとめたinterface必要
    readonly postAttack?: (field: BattleFieldClass, strength: number) => ActionEffectResult;
    // readonly preAttack?: (person: Person);
    // readonly attacked?: (person: Person);
}
