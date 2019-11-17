import { ActorVariableKey } from "./ActorVariable";
import { Person } from "./Person";
import { CharacterType } from "./CharacterType";

export function actorVariableMax(variableKey: ActorVariableKey, person: Person, characterType?: CharacterType) {
    if (variableKey === "hp")
        return person.characters[characterType || person.currentCharactorType]!.battleStatus.maxHp;
    if (variableKey === "mp")
        return person.characters[characterType || person.currentCharactorType]!.battleStatus.maxMp;
    if (variableKey === "ap") return person.sexualStatus.common.maxAp;
    if (variableKey === "ep") return person.sexualStatus.common.maxEp;
    throw new Error("unreachable");
}
