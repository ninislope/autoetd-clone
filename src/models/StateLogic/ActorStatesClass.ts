import { immerable } from "immer";
import { ActorStates } from "./ActorStates";
import { StateId } from "./StateId";

export class ActorStatesClass {
    [immerable] = true;

    states: ActorStates;

    constructor(states: ActorStates) {
        this.states = states;
    }

    get(id: StateId) {
        return this.states[id];
    }
}
