import { Character } from "./Character";
import { CharacterType } from "./CharacterType";
import { ActorVariable } from "./ActorVariable";
import { ActorSexualStatus } from "./ActorSexualStatus";
import { ActorStates } from "./StateLogic";

export interface Person {
    readonly id: number;
    readonly characters: { [type in CharacterType]?: Character<type> } & {
        normal: Character<"normal">;
    };
    readonly currentCharactorType: CharacterType;
    readonly variable: ActorVariable;
    readonly sexualStatus: ActorSexualStatus;
    readonly states: ActorStates;
}
