import { Person } from "../Person";

export interface BattleField {
    readonly actors: Person[];
    readonly enemies: Person[];
}
