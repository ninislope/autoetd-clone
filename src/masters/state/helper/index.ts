import { StateBase } from "../../../models/StateLogic/StateBase";
import { StateType } from "../../../models/StateLogic/StateType";

export function normalState<T extends StateBase>(state: T) {
    return { type: StateType.Normal as StateType.Normal, ...state };
}

export function sexualState<T extends StateBase>(state: T) {
    return { type: StateType.Sexual as StateType.Sexual, ...state };
}

export function constitutionState<T extends StateBase>(state: T) {
    return { type: StateType.Constitution as StateType.Constitution, ...state };
}

export function hiddenState<T extends StateBase>(state: T) {
    return { type: StateType.Hidden as StateType.Hidden, ...state };
}
