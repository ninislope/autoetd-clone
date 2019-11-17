export interface DungeonStore {
    readonly speed: number;
    readonly abort?: boolean;
    readonly turn: number;
    readonly enemies: number[];
}
