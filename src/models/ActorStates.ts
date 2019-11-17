// import { StateName } from "../masters/state/StateName";

type StateName = string;

export type ActorStates = {
    readonly [SN in StateName]?: number;
};
