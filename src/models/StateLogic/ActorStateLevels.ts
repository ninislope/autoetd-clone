import { StateId } from "./StateId";

export type ActorStateLevels = {
    readonly [Id in StateId]?: number; // levelは1始まり
};
