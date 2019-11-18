import { StateId } from "./StateId";

export type ActorStates = {
    readonly [Id in StateId]?: number;
};
