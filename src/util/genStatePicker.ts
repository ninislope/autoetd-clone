import { pick } from "./pick";

export function genStatePicker<State>() {
    return function statePicker<RootKey extends keyof State, Key extends keyof State[RootKey]>(
        rootKey: RootKey,
        keys: Key[],
    ) {
        return function pickState(state: State) {
            const content = state[rootKey];
            return pick(content, keys);
        };
    };
}
