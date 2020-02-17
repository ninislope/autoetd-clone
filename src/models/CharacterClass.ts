import { immerable } from "immer";
import { ActorBattleStatus } from "./ActorBattleStatus";
import { CharacterType } from "./CharacterType";
import { StrategiesClass } from "./BattleLogic/StrategiesClass";
import { Character } from "./Character";
import { asClass } from "../util";

export class CharacterClass<CT = CharacterType> implements Character<CT> {
    [immerable] = true;

    readonly type: CT;

    readonly name: string;

    readonly exp: number;

    readonly battleStatus: ActorBattleStatus;

    readonly strategies: StrategiesClass;

    constructor(character: Character<CT>) {
        this.type = character.type;
        this.name = character.name;
        this.exp = character.exp;
        this.battleStatus = character.battleStatus;
        this.strategies = asClass(character.strategies, StrategiesClass);
    }
}
