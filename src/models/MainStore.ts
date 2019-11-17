import { SceneId } from "./SceneId";
import { Person } from "./Person";
// eslint-disable-next-line import/named
import { BattleClass } from "./BattleLogic";

export interface MainStore {
    readonly currentScene: SceneId;

    readonly persons: Person[];
    readonly party: number[];

    readonly clearedDungeonIds: number[];

    // dungeon
    readonly dungeonId: number;
    readonly dungeonFloor: number;
    readonly dungeonLogSpeed: number;
    readonly abortDungeon?: boolean;
    readonly dungeonTurn: number;
    readonly dungeonLogIndex: number;
    readonly dungeonLogs: string[];
    readonly battle?: BattleClass;
}
