import { immerable } from "immer";
import { CharacterType } from "./CharacterType";
import { Person } from "./Person";
import { CharacterClass } from "./CharacterClass";
import { ActorVariable } from "./ActorVariable";
import { ActorSexualStatus } from "./ActorSexualStatus";
import { ActorStates } from "./ActorStates";

export type CharacterClassMap = { [type in CharacterType]?: CharacterClass<type> } & {
    normal: CharacterClass<"normal">;
};

export class PersonClass implements Person {
    [immerable] = true;

    readonly id: number;

    readonly characters: CharacterClassMap;

    readonly currentCharactorType: CharacterType;

    readonly variable: ActorVariable;

    readonly sexualStatus: ActorSexualStatus;

    readonly states: ActorStates;

    constructor(person: Person) {
        this.id = person.id;
        this.characters = {} as CharacterClassMap;
        const types = Object.keys(person.characters) as CharacterType[];
        for (let i = 0; i < types.length; ++i) {
            const type = types[i];
            (this.characters[type] as CharacterClass<typeof type>) =
                person.characters[type] instanceof CharacterClass
                    ? (person.characters[type] as CharacterClass<typeof type>)
                    : new CharacterClass(person.characters[type]!);
        }
        this.currentCharactorType = person.currentCharactorType;
        this.variable = person.variable;
        this.sexualStatus = person.sexualStatus;
        this.states = person.states;
    }

    get name() {
        return this.currentCharacter.name;
    }

    get exp() {
        return this.currentCharacter.exp;
    }

    get battleStatus() {
        return this.currentCharacter.battleStatus;
    }

    get strategies() {
        return this.currentCharacter.strategies;
    }

    get living() {
        return this.variable.hp > 0;
    }

    private get currentCharacter() {
        return this.characters[this.currentCharactorType]!;
    }
}
