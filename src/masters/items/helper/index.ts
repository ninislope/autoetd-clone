import { Item } from "../../../models/StateLogic/Item";

export function item<T extends Item>(state: T) {
    return state;
}
